
import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectedDoctorApp = () => {
    const params = new URLSearchParams(window.location.search);
    const appointmentId = params.get('appointmentId');
    const [patientId, setPatientId] = useState({});
    const [patientName, setPatientName] = useState({});
    const [doctorId,setDoctorId] = useState({});
    const [doctorName, setDoctorName] = useState({});

  const [appointment, setAppointment] = useState({});

  const [prescription, setPrescription] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [medicine, setMedicine] = useState('');
  const [medicineList, setMedicineList] = useState([]);
  const [dosage, setDosage] = useState('');
  const [dosageList, setDosageList] = useState([]);
  const [date, setDate] = useState([]);
 // const[patientId, setPatientId] = useState([]);
  


  //const id = '65735cebad66db980718a14d'; // session
  
  useEffect(() => {
    
    const fetchAppointmentData = async () => {
          await axios.get(`http://localhost:8000/getAppointmentInfo?appointmentId=${appointmentId}`,{withCredentials:true}).then((res) => { 
            const appData = res.data
            setAppointment(appData)
            setDate(appData.date);
          setPatientId(appData.patient);
          setDoctorId(appData.doctor);
            fetchDoctorNames(appData.doctor);
            fetchPatientNames(appData.patient);
            // console.log(doctor)
          }).catch(err=>{
            console.log(err.message)
           });
    };
  
    
    const getName = async (userId) => {
        try {
          const response = await axios.get(`http://localhost:8000/getUserById/${userId}`);
          if (response.data && response.data.name) {
            return response.data;
          } else {
            return 'Unknown Doctor';
          }
        } catch (error) {
          console.error('Error fetching doctor name:', error);
          return 'Unknown Doctor';
        }
      };
     
      
   
    //display doctor NAME
    const fetchDoctorNames = async (doctorId) => {
        
                const dN = await getName(doctorId);
                setDoctorName(dN);
              
        
      };

     // display patient NAME
    
      
  
      const fetchPatientNames = async (patientId) => {
        const pN = await getName(patientId);
          setPatientName(pN);
        
      };
   
   
      if (appointmentId) {
        fetchAppointmentData();
        
       
        
        
      }
      
    }, [appointmentId]);
    const fetchAppointmentData = async () => {
        await axios.get(`http://localhost:8000/getAppointmentInfo?appointmentId=${appointmentId}`,{withCredentials:true}).then((res) => { 
          const appData = res.data
          setAppointment(appData)
          
          // console.log(doctor)
        }).catch(err=>{
          console.log(err.message)
         });
  };
    const markAsCompleted = async () => {
        try {
            // Make a PUT request to update the appointment status to "Completed"
            await axios.post(`http://localhost:8000/AppointmentCompleted/${appointmentId}`);

            // Refresh the appointment data after marking as completed
            fetchAppointmentData();
        } catch (error) {
            console.error('Error marking appointment as completed:', error);
        }
    };
    
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


  
  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const handleMedicineChange = (e) => {
    setMedicine(e.target.value);
  };
  
  const handleDosageChange = (e) => { 
    setDosage(e.target.value);
  };
  const handleAddMedicine = () => {
    if (medicine.trim() !== '') {
      if (dosage.trim() === '') {
        alert('Please fill in the dosage field.');
      } else {
        setMedicineList([...medicineList, medicine]);
        setDosageList([...dosageList, dosage]); // Add dosage to the list
        setMedicine('');
        setDosage('');
      }
    }
    else
        alert('There is no Medicine added');
  };
  const handlePrescription = () => {
    if (prescription)
      setPrescription(false);
    else
        setPrescription(true);
  };

  const submitPrescription = async () => { ///////////////////////////////////hereeee
    try {
        console.log(" app" , doctorName.name);
        

      await axios.post(`http://localhost:8000/addPrescription`, {
        appointmentId,
        date,
        instruction,
        doctorId,
        patientId,
        medicines: medicineList,
        dosage: dosageList,
        patientName: patientName.name,
        doctorName: doctorName.name
      }, { withCredentials: true });
      // Optionally, you can clear the prescription state after submission
      setInstruction('');
      setMedicineList([]);
      setPrescription(false);
    } catch (error) {
      console.error('Error submitting prescription:', error);
    }
  };


  return (
    <div className="appointment-profile">
        <h1>Appointment</h1>
      <p>Date: {appointment.date}</p>
      <p>Doctor Name: {doctorName.name}</p> 
      <p>Patient Name: {patientName.name}</p> 
      <p>Status: {appointment.status}</p>
      <br />

     {/* Add Prescription Section */}
     <button onClick={handlePrescription}>Add Prescription</button>
      {prescription && (
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={instruction}
            onChange={handleInstructionChange}
            required
          />
          <label htmlFor="medicine">Medicine:</label>
          <input
            type="text"
            id="medicine"
            name="medicine"
            value={medicine}
            onChange={handleMedicineChange}
            required
          />
          <br/>
           <label htmlFor="dosage">Dosage:</label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={dosage}
            onChange={handleDosageChange}
            required
          />
          <br />
          <button onClick={handleAddMedicine}>Add Medicine</button>
          {/* Display the list of added medicines */}
          {medicineList.length > 0 && (
            <div>
              <p>Medicines:</p>
              <ul>
                {medicineList.map((med, index) => (
                   <li key={index}>{med} - {dosageList[index]}</li>
                ))}
              </ul>
              
            </div>
          )}
          <br/>
           <button onClick={submitPrescription}>Submit Prescription</button>
           
          
        </div>
      )}
     <br/>
     <button onClick={markAsCompleted}> Appointment Completed</button>
  </div>
  );
  }


  
  export default SelectedDoctorApp;