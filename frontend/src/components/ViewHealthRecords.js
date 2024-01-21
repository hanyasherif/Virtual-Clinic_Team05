import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

const ViewHealthRecordsForDoctor = ({ doctorId }) => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  function preventDefault(event) {
    event.preventDefault();
  }

  useEffect(() => {
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
    return <Title style={{ color: '#25A18E' , fontSize: 23}}>Loading health records...</Title>;
  }

  return (

<React.Fragment>
  <Title style={{ color: '#25A18E', fontSize: 23 }}>Health Records</Title>
  {healthRecords.map((record) => (
    <div key={record.patientId}>
      {/* <Typography component="h3" variant="h5" style={{ color: '#25A18E', fontSize: 18 }}>
        {record.name}
      </Typography> */}
      <ul>
        {record.healthRecords.map((hr, index) => (
          <Typography key={index} component="li" variant="subtitle1">
            {hr}
          </Typography>
        ))}
      </ul>
    </div>
  ))}
</React.Fragment>


  );
};

export default ViewHealthRecordsForDoctor;
