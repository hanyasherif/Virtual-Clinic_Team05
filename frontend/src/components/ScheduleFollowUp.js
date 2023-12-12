import React, { useState } from 'react';

const ScheduleFollowUp = () => {
  const [followUpDate, setFollowUpDate] = useState('');
  const [patientId, setPatientId] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledAppointment, setScheduledAppointment] = useState(null);

  const handleFollowUpDateChange = (e) => {
    setFollowUpDate(e.target.value);
  };

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const scheduleFollowUp = async () => {
    try {
      const response = await fetch('http://localhost:8000/ScheduleFollowUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FollowUpDate: followUpDate,
          PatientId: patientId,
        }),credentials:'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
        }
        if (data.appointment) {
          setScheduledAppointment(data.appointment);
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
      <h2>Schedule Follow-Up</h2>
      <label>
        Follow-Up Date:
        <input
          type="date"
          value={followUpDate}
          onChange={handleFollowUpDateChange}
        />
      </label>
      <br />
      <label>
        Patient ID:
        <input
          type="text"
          value={patientId}
          onChange={handlePatientIdChange}
        />
      </label>
      <br />
      <button onClick={scheduleFollowUp}>Schedule Follow-Up</button>
      {message && <p>{message}</p>}
      {scheduledAppointment && (
        <div>
          <h3>Scheduled Follow-Up Appointment</h3>
          <p>Doctor ID: {scheduledAppointment.doctor}</p>
          <p>Patient ID: {scheduledAppointment.patient}</p>
          <p>Status: {scheduledAppointment.status}</p>
          <p>Date: {scheduledAppointment.date}</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleFollowUp;
