
import React, { useEffect, useState } from "react";
import axios from "axios";

const SApp = () => {
    const params = new URLSearchParams(window.location.search);
    const appointmentId = params.get('appointmentId');
    const [doctorName, setDoctorName] = useState({});
    const [patientName, setPatientName] = useState({});

  const [appointment, setAppointment] = useState({});
 // const[patientId, setPatientId] = useState([]);
 const [amount, setAmount] = useState('');
  
  let patientId= "";
  const [cardNumber,setcardNumber] = useState('');
  const [expiryDate,setexpiryDate] = useState('');
  const [CVV,setCVV] = useState('');
  const [error, setError] = useState('');
  const [showCreditCardTextBox, setShowCreditCardTextBox] = useState(false);
  const [showWalletTextBox, setShowWalletTextBox] = useState(false);
  const [walletInfo, setWalletInfo] = useState('');

  const [showFamilyMemberTable, setShowFamilyMemberTable] = useState(false);
  const [familyMemberData, setFamilyMemberData] = useState([]); // Populate with data from the datab
  const[familyMember, setFamilyMember] = useState([]); 
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);
  
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  //const id = '65735cebad66db980718a14d'; // session
  
  useEffect(() => {
    
    const fetchAppointmentData = async () => {
          await axios.get(`http://localhost:8000/getAppointmentInfo?appointmentId=${appointmentId}`,{withCredentials:true}).then((res) => { 
            const appData = res.data
            setAppointment(appData)
            // console.log(doctor)
          }).catch(err=>{
            console.log(err.message)
           });
    };
  
    
    const getName = async (userId) => {
        try {
          const response = await axios.get(`http://localhost:8000/getUserById/${userId}`);
          if (response.data && response.data.name) {
            return response.data.name;
          } else {
            return 'Unknown Doctor';
          }
        } catch (error) {
          console.error('Error fetching doctor name:', error);
          return 'Unknown Doctor';
        }
      };
     
      
   
    //display doctor NAME
    const fetchDoctorNames = async () => {
        try {
          const doctorNames = {};
          const appointments = await axios.get('http://localhost:8000/viewAppointments',{withCredentials:true});
          if (appointments.data) {
            for (const appointment of appointments.data) {
              const doctorId = appointment.doctor;
              if (!doctorNames[doctorId]) {
                const doctorName = await getName(doctorId);
                doctorNames[doctorId] = doctorName;
              }
            }
          }
          setDoctorName(doctorNames);
        } catch (error) {
          console.error('Error fetching doctor names:', error);
        }
      };

     // display patient NAME
    
      
  
      const fetchPatientNames = async (id) => {
        try {
          const response = await axios.get(`http://localhost:8000/getUserByTokenId`,{withCredentials:true});
          const user = response.data;
          setPatientName(user.name);
        } catch (error) {
          setError('No Name Found');
        }
      };
      
      const fetchWalletInfo = async (id) => {
        try {
          const response = await axios.get(`http://localhost:8000/getUserByTokenId`,{withCredentials:true});
          const user = response.data;
          setWalletInfo(user.walletInfo);
          console.log("Wallet Infoaa:", walletInfo);
        } catch (error) {
          setError('No Wallet assigned');
        }
      };
      const fetchAmount = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/getUserByTokenId`,{withCredentials:true});
          const user = response.data;
          if(user.package){
            if(user.package ==="Silver")
              setAmount(appointment.price- (appointment.price * 0.4));
            
            else if(user.package ==="Gold")
            setAmount(appointment.price- (appointment.price * 0.6));

            else
            setAmount(appointment.price- (appointment.price * 0.8));


            
          }
          else
            setAmount(appointment.price);
          console.log("Wallet Info:", walletInfo);
        } catch (error) {
          setError('No Wallet assigned');
        }
      };
      if (appointmentId) {
        fetchAppointmentData();
        fetchDoctorNames();
        fetchAmount();
        fetchPatientNames();
        fetchWalletInfo();
        
        
      }
      
    }, [appointmentId]);
    useEffect(() => {
        const fetchAmount = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/getUserByTokenId`,{withCredentials:true});
            const user = response.data;
    
            if (user.package) {
              if (user.package === "Silver") setAmount(appointment.price - appointment.price * 0.4);
              else if (user.package === "Gold") setAmount(appointment.price - appointment.price * 0.6);
              else setAmount(appointment.price - appointment.price * 0.8);
            } else {
              setAmount(appointment.price);
            }
    
            console.log("Amount:", amount);
          } catch (error) {
            setError('Error fetching amount:', error);
          }
        };
    
        if (appointmentId) {
          fetchAmount();
        }
      }, [appointment, appointmentId]);

    const fetchID = async (username) =>{
        try {
          const response = await axios.get(`http://localhost:8000/getUserByUsername/${username}`);
          console.log("retrievedd", response.data._id)
          if (response.data && response.data._id) {
            return response.data._id;
            
          } else {
            return 'No user found';
          }
        } catch (error) {
          console.error('Error fetching user', error);
          return 'Unknown No user found';
        }
     
  };


    //////Paying
    const handleCardNumber = (e) => {
        setcardNumber(e.target.value);
      };
      const handleExpiryDate = (e) => {
        setexpiryDate(e.target.value);
      };
      const handleCVV = (e) => {
        setCVV(e.target.value);
      };
      const handleCreditCardButtonClick = () => {
        setShowCreditCardTextBox(true);
        setShowWalletTextBox(false); // Hide Wallet text box if it's currently shown
      };
    
      const handleWalletButtonClick = () => {
        
        setShowWalletTextBox(true);
        setShowCreditCardTextBox(false); // Hide Credit Card text box if it's currently shown
        
      };
    ////choose who is the patient
    const handleFamilyMemberButtonClick = async () => {
            /*
            get the blogs from the backend  
            */     
            
             setShowFamilyMemberTable(true);
            await axios.get(`http://localhost:8000/viewRegFamilyMembers`,{withCredentials:true}).then(
                (res) => { 
                    const familyMemberData = res.data
                    console.log(familyMemberData)
                    setFamilyMemberData(familyMemberData)
                    
                }
                 );
        
      };
      const handleFamilyMemberClick = (familyMember) => {
         
        setSelectedFamilyMember(familyMember._id);
        setFamilyMember(familyMember);
        // Handle the click event and retrieve the family member's id
        console.log('Clicked family member with id:', familyMember._id);
        // Add your logic here to handle the click event
       

      };
      const handleReserveForMyselfClick = () => {
        // Save the appointment patient's ID
        patientId = '6543f2e0d09148f82f46195d';
        console.log('Reserved for myself. Patient ID:', patientId);

        setShowFamilyMemberTable(false);
    
        // Add your logic here to handle the reservation for yourself
      };
      const handleViewPriceClick = () => {
        setIsPriceVisible(!isPriceVisible);
      };
    /////submitting
      const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        
        if (showCreditCardTextBox){
        if(!cardNumber || !expiryDate || !CVV){
          alert('Please fill in all the credit card fields.');
          return;
        }
        else{//pay with credit card $ stripe

        }
    }//pay with wallet
    else
        console.log("testo"+walletInfo);
        console.log("BEBO"+appointment.price);
        if(walletInfo < amount){
        alert('You do not have enough money in the wallet to pay');
        return;
        }
        else{
            if(showFamilyMemberTable){ //reserve for a family member
              if(familyMember.username){ //family member is a user(patient)
                console.log("usernameee", familyMember.username);
                patientId = await fetchID(familyMember.username);
                console.log("patient ID is now" ,patientId);
               
              
              }
              else{ //family member is not a user/////////////////////////////////////////////////////////////////

              }
            } 
            else{ // reserve for myself
                patientId = '6543f2e0d09148f82f46195d';
            }
           modifyPatientWallet(amount);
           modifyDoctorWallet(amount,appointment.doctor);

        }
        modifyAppointmentStatus(appointmentId,patientId);
    }
    const modifyAppointmentStatus = async (appointmentId, patientId) => {
        try {
          // Call the modifyAppointment endpoint with the appointmentId and patientId
          const response = await axios.post('http://localhost:8000/modifyAppointment', {appointmentId,patientId, } ,{withCredentials:true});
      
          // Handle the response as needed
          console.log(response.data.message);
        } catch (error) {
          console.error('Error updating appointment status:', error);
        }
      };
      const modifyPatientWallet = async (price,  id) =>{
        try {
            const response = await axios.post(`http://localhost:8000/modifyWallet`, {price  },{withCredentials:true});
        
            console.log(response.data.message);
            setWalletInfo(walletInfo-price);
        } catch (error) {
          console.error('Error updating PAtient wallet:', error);
        }
     
    };
    const modifyDoctorWallet = async (price,  id) =>{
        try {
          console.log("dOCTORid"+id)
            const response = await axios.post(`http://localhost:8000/modifyWalletDoctor`, {price,id });
        
            console.log(response.data.message);
        } catch (error) {
          console.error('Error updating Doctor wallet:', error);
        }
     
    };
    
  return (
    <div className="appointment-profile">
        <h1>Reserve Appointment</h1>
      <p>Date: {appointment.date}</p>
      <p>Doctor Name: {doctorName[appointment.doctor]}</p> 
      <p>Status: {appointment.status}</p>
      <button onClick={handleViewPriceClick}>View Price</button>
      <br />
      {isPriceVisible && (
        <>
          <label>Price:</label>
          <br />
          <input type="text" value={amount} readOnly />
        </>
      )}


     <br/>
     <button id="familyMember" onClick={handleFamilyMemberButtonClick}>
       Reserve for a Family Member
      </button>
      <button id="reserveForMyself" onClick={handleReserveForMyselfClick}>
        Reserve for Myself
      </button>
      <br/>
    <label>Pay With:</label>
    <br />
    <button id="creditCard" onClick={handleCreditCardButtonClick}>
      Credit Card
    </button>
    <button id="wallet" onClick={handleWalletButtonClick}>
      Wallet
    </button>
    
    {showFamilyMemberTable && (
        <div>
          <h2>Family Member Information</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                {/* Add more table column headers as needed */}
              </tr>
            </thead>
            <tbody>
              {familyMemberData.map((member, index) => (
                <tr key={index}>
                  <td 
                    onClick={() => handleFamilyMemberClick(member)} 
                    style={{ cursor: 'pointer', backgroundColor: selectedFamilyMember === member._id ? 'lightblue' : 'white' }}
                  >
                    {member.famMemName}
                  </td>
                  {/* Add more table cells based on your data structure */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    {showCreditCardTextBox && (
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Card number
          <input type="text" value={cardNumber} onChange={handleCardNumber} />
        </label>
        <br />
        <label>
          Expiry date
          <input type="text" value={expiryDate} onChange={handleExpiryDate} />
        </label>
        <br />
        <label>
          Security code(CVV)
          <input type="text" value={CVV} onChange={handleCVV} />
        </label>
        <br />

        <button type="submit">Pay</button>
      </form>
    )}

    {showWalletTextBox && (
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Wallet Info
          <input type="text" value={walletInfo} readOnly />
        </label>
        <br />

        <button type="submit">Pay</button>
      </form>
    )}
  </div>
  );
  }


  
  export default SApp;