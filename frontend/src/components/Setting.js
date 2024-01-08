import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function Setting() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const updateData = async () => {
    const Id = searchParams.get('Id')
    try {
     await axios.post(`http://localhost:8000/Edit?Id=${Id}&email=${field1}&hourlyRate=${field2}&affiliation=${field3}`);
     
     setSuccessMessage('Data updated successfully!');
    } catch (error) {
      alert('An error occurred:', error.message);
      setSuccessMessage('Try Again Later!');
    }
  };
  return (
    <div className="container">
      <h1>Hello Dr</h1>
      <input
        type="text"
        value1={field1}
        placeholder="Change email"
        onChange={(e) => setField1(e.target.value)}
      />
      <input
        type="text"
        value2={field2}
        placeholder="Change hourlyRate"
        onChange={(e) => setField2(e.target.value)}
      />
      <input
        type="text"
        value3={field3}
        placeholder="Change affiliation"
        onChange={(e) => setField3(e.target.value)}
      />
      <button onClick={updateData}>Change</button>
      {successMessage && (
        <p style={{ color: 'green' }}>{successMessage}</p>
      )}
    </div>
  );
}

export default Setting;