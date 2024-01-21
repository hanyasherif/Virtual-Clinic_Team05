import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function ChatUserProfile() {
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [Patient, setPatientData] = useState({});
  const getPatientData= async() =>{
    const PatientId = searchParams.get('Patient');
    const Id = searchParams.get('Id');
    try{const response = await axios.get(`http://localhost:8000/GetFullData?Id=${Id}&&Id1=${PatientId}
    `); 

    const P = response.data[0];

    setPatientData(P);
    console.log(Patient); 

  }
    catch (error) {
      alert('An error occurred:', error);
    }
  }
  const chat= async() =>{
        localStorage.setItem('partner', searchParams.get('Patient'));
        window.location.href='http://localhost:3000/ChatPage'
  }



  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const buttonStyle = {
    backgroundColor: '#0074d9',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    display: 'block', // Make the button a block-level element
    margin: '0 auto', // Center the button horizontally
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    alignItems: 'center',
    justifyItems: 'center',
    maxWidth: '400px',
    margin: '0 auto',
    background: '#fff',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    
};
    return (
      <div className="profile-container">
        <div className="profile-info">
          <h2>Hello Dr</h2>
          <p>name: {Patient.username}</p>
          <p>Email: {Patient.email}</p>
          <div style={containerStyle}>
          <button  onClick={ chat}>
           Chat
          </button>
        </div>
        {showMore && (
          <div>
          <p>dateOfBirth: {Patient.dateOfBirth}</p>
          <p>gender: {Patient.gender}</p>
          <p>famMemNatID: {Patient.famMemNatID}</p>
          <p>famMemRelation: {Patient.famMemRelation}</p>
          <p>famMemAge: {Patient.famMemAge}</p>
          <p>emergencyContactMobileNumber: {Patient.emergencyContactMobileNumber}</p>
          <p>emergencyContactFullname: {Patient.emergencyContactFullname}</p>            {/* Add more additional information here */}
          </div>
        )}
      </div>
        </div>

    );
  }

export default ChatUserProfile;