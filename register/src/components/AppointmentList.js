import React from 'react';

function AppointmentList({ appointments }) {
  return (
    <div>
      <h2>Appointments List</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            Doctor: {appointment.doctorName}, Date: {appointment.date}, Filled: {appointment.filled ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
