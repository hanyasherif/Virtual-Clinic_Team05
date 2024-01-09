import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const containerStyle = {
    textAlign: 'center',
  };

  const headerStyle = {
    backgroundColor: 'cyan',
    padding: '10px',
    width: '100%', // Take full width
    margin: '0',
    boxSizing: 'border-box', // Include padding in the width
  };

  const labelStyle = {
    marginTop: '20px',
    display: 'block',
    fontSize: '1.5em', // Increase font size (adjust as needed)

  };

  const inputStyle = {
    marginTop: '10px',
    padding: '5px',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px',
    marginBottom: '20px', 
    backgroundColor: 'lightblue',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px', 
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromQuery = urlParams.get('id');
    setAppointmentId(idFromQuery);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/ReschedulePatient?appointmentId=${appointmentId}&newDate=${selectedDate}`,
        { tm: 'mohab' },
        { withCredentials: true }
      );
      console.log('Rescheduled successful:', response.data);
      alert('Rescheduled Successfully');
    } catch (error) {
      console.error('Reschedule failed:', error);
      alert('Rescheduling Failed');
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div style={containerStyle}>
    <h1 style={headerStyle}>El7a2ny Clinic</h1>
    <label htmlFor="dateInput" style={labelStyle}>Enter Date:</label>
    <input
      type="date"
      id="dateInput"
      value={selectedDate}
      onChange={handleDateChange}
      style={inputStyle}
    />
    <br /> {/* Line break for space */}
    <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
  </div>
);
};

export default MyCalendar;
