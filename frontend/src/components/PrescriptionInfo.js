import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function PrescriptionInfo() {
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [Prescription, setPrescriptionData] = useState({});
  
  const getPrescriptionData= async() =>{
    //const Id = searchParams.get('Prescription');
    const Id = searchParams.get('Id');
    try{const response = await axios.get(`http://localhost:8000/getPrescription?Id=${Id}
    `); 

    const P = response.data;

    setPrescriptionData(P);
    console.log(Prescription.medicine); 

  }
    catch (error) {
      alert('An error occurred:', error);
    }
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
          <h2></h2>
          <p>patient: {Prescription.patient}</p>
          <p>doctor: {Prescription.doctor}</p>
          <div style={containerStyle}>
          <button  onClick={getPrescriptionData}>
           Prescription Data
          </button>
          <button style={buttonStyle} onClick={toggleShowMore}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>
        {showMore && (
          <div>

          <p>date: {Prescription.date}</p>
          <p>  medicine: {Prescription.medicine.join(', ')} ,{' '} </p>
          <p> dosage: {Prescription.dosage.join(', ')} ,{' '}  </p>           {/* Add more additional information here */}
          </div>
        )}
      </div>
        </div>

    );
  }

export default PrescriptionInfo;