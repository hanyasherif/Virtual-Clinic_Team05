import React, { useState } from 'react';

const AddHealthRecord = () => {
  const [patientId, setPatientId] = useState('');
  const [healthRecord, setHealthRecord] = useState('');
  const [message, setMessage] = useState('');

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleHealthRecordChange = (e) => {
    setHealthRecord(e.target.value);
  };

  const handleAddHealthRecord = async () => {
    try {
      const response = await fetch('http://localhost:8000/AddNewHR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PatientId: patientId,
          HealthRecord: healthRecord,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
        }
      } else {
        // Handle non-2xx status codes
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add New Health Record</h2>
      <label>
        Patient ID:
        <input type="text" value={patientId} onChange={handlePatientIdChange} />
      </label>
      <br />
      <label>
        Health Record:
        <input type="text" value={healthRecord} onChange={handleHealthRecordChange} />
      </label>
      <br />
      <button onClick={handleAddHealthRecord}>Add Health Record</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddHealthRecord;
