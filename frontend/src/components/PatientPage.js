import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import './LoginForm.css'; // Import your CSS file for styling
import Header from "./Header";
import Dropdown from './Dropdown';

function PatientPage() {
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [Patient, setPatientData] = useState({});
  const getPatientData= async() =>{
    
    const Id = searchParams.get('Id');
    try{const response = await axios.get(`http://localhost:8000/getPatientById?Id=${Id}`.withCredentials=true ); 

    const P = response.data;

    setPatientData(P);
    console.log(Patient); 

  }
    catch (error) {
      alert('An error occurred:', error);
    }
  }



  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const buttonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

    return (
      <div>
      <Header />
      <h2>Hello 3ayan</h2>
      <br/>
      <div className="button-container" style={buttonContainerStyle}>
        <Button onClick={() => window.location.href='http://localhost:3000/addFamilyMember'}>Add Family Member</Button>
        <Button onClick={() => window.location.href='http://localhost:3000/viewFamilyMember'}>View Family Member</Button>
        <Button onClick={() => window.location.href='http://localhost:3000/docList'}>View Doctors</Button>
        <Button onClick={() => window.location.href='http://localhost:3000/patient/prescrptions'}>View Prescriptions</Button>
        <Button onClick={() => window.location.href='http://localhost:3000/FilterAppointmentsPatient'}>Filter Appointments</Button>
        <Button onClick={() => window.location.href='http://localhost:3000/uploadMedicalHistory'}>Upload Medical History</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/wallet`}>View My Wallet</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/ViewHealthRecords`}>ViewHealthRecords</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/ChangeMyPassword`}>ChangeMyPassword</Button>
        <Button onClick={() => window.location.href='http://localhost:3000/PharmacistsList'}>View Pharmacists</Button>
        <Dropdown/>
      </div>
    </div>
  );
};

export default PatientPage;