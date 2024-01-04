import React, { useState, useEffect } from 'react';

const ViewHealthRecordsForDoctor = ({ doctorId }) => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = '6543e673eff0e09fab8d7124';
    const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/ViewUpdatedHRforD`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },credentials:'include'
          });
      
          if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
          }
      
          const responseData = await response.json();
          console.log(responseData);
      
          if (responseData.healthRecordsByPatient && responseData.healthRecordsByPatient.length > 0) {
            setHealthRecords(responseData.healthRecordsByPatient);
          } else {
            console.log('No health records found for patients.');
          }
      
          setLoading(false);
        } catch (error) {
          console.error('Error fetching health records:', error.message);
        }
      };
      

    fetchData();
  }, [doctorId]);

  if (loading) {
    return <p>Loading health records...</p>;
  }

  return (
    <div>
      <h2>Health Records for Patients</h2>
      {healthRecords.map((record) => (
        <div key={record.patientId}>
          <h3>{record.name}</h3>
          <ul>
            {record.healthRecords.map((hr, index) => (
              <li key={index}>{hr}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewHealthRecordsForDoctor;
