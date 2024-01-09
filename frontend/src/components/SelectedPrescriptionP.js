
import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectedPrescriptionP = () => {
    const params = new URLSearchParams(window.location.search);
    const prescriptionId = params.get('prescriptionId');
    const [prescription,setPrescription] = useState('');

    //paying
    const [cardNumber,setcardNumber] = useState('');
    const [expiryDate,setexpiryDate] = useState('');
    const [CVV,setCVV] = useState('');

    const [showCreditCardTextBox, setShowCreditCardTextBox] = useState(false);
    const [showWalletTextBox, setShowWalletTextBox] = useState(false);
    const [walletInfo, setWalletInfo] = useState('');

    const [amount, setAmount] = useState('');

    const [isPriceVisible, setIsPriceVisible] = useState(false);

    
  const [error, setError] = useState('');
 


  //const id = '65735cebad66db980718a14d'; // session
  
  useEffect(() => {
    
    const fetchPrescriptionData = async () => {
          await axios.get(`http://localhost:8000/getPrescription?Id=${prescriptionId}`,{withCredentials:true}).then((res) => { 
            const presData = res.data
            setPrescription(presData);
            // console.log(doctor)
          }).catch(err=>{
            console.log(err.message)
           });
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

   
    fetchPrescriptionData();
    fetchWalletInfo(prescription.patient)
   
      
    }, [prescriptionId]);
  
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
        if(walletInfo < amount){
        alert('You do not have enough money in the wallet to pay');
        return;
        }
        else{
           modifyPatientWallet(amount);

        }
    }
    const modifyPatientWallet = async (price,  id) =>{
        try {
            const response = await axios.post(`http://localhost:8000/modifyWallet`, {price  },{withCredentials:true});
        
            console.log(response.data.message);
            setWalletInfo(walletInfo-price);
        } catch (error) {
          console.error('Error updating PAtient wallet:', error);
        }
     
    };


    const handleDownloadPDF = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/generatePdf/${prescriptionId}`, {
            responseType: 'blob',  // Set the response type to 'blob' to handle binary data
            withCredentials: true,
          });
    
          // Create a Blob from the response data
          const blob = new Blob([response.data], { type: 'application/pdf' });
    
          // Create a temporary link element to trigger the download
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'prescription.pdf';
          document.body.appendChild(link);
          link.click();
    
          // Remove the temporary link element
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading prescription PDF:', error.message);
        }
      };
  return (
    <div className="appointment-profile">
        <h1>My Prescription</h1>
      <p>Date: {prescription.date}</p>
      <p>Doctor Name: {prescription.doctorName}</p> 
      <p>Patient Name: {prescription.patientName}</p> 
      <p>Medicines: {prescription.medicines}</p> 
      <p>Dosage: {prescription.dosage}</p> 
      <p>Status: {prescription.filled? "Filled" : "Not Filled"}</p>
      <br />
      <h3>Pay For Prescription</h3>
      <button id="creditCard" onClick={handleCreditCardButtonClick}>
      Credit Card
    </button>
    <button id="wallet" onClick={handleWalletButtonClick}>
      Wallet
    </button>

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
    <br/>
    <button onClick={handleDownloadPDF}>Download as Pdf</button>
                <br/>
                
     
     
    
  </div>
  );
  }


  
  export default SelectedPrescriptionP;