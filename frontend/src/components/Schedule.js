import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleFollowUp = ({ location }) => {
  // const searchParams = new URLSearchParams(location.search);
  // const doctorId = searchParams.get('Doctor');
  // const appointmentId = searchParams.get('Appointment');

  const [followUpDate, setFollowUpDate] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledAppointment, setScheduledAppointment] = useState(null);

  const scheduleFollowUp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/scheduleFollowUp', {
        doctorId: '6543e691eff0e09fab8d7125',
        followUpDate: followUpDate,
        appointmentId: appointmentId,
      });

      setScheduledAppointment(response.data.appointment);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error scheduling follow-up appointment');
    }
  };

  useEffect(() => {
    // Add any additional logic you need when the component mounts
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div>
      <h2>Schedule Follow-Up</h2>
      <label>
        Follow-Up Date:
        <input
          type="datetime-local"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
        />
      </label>
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
