import React, { useState } from 'react';
import { Button } from '@mui/material';

const ReschedulePageForPatient = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleReschedule = () => {
    console.log("Reschedule logic with selected date:", selectedDate);
  };

  return (
    <div>
      <h1>Reschedule Appointment</h1>
      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <Button onClick={handleReschedule} style={{ color: 'blue' }}>Reschedule</Button>
    </div>
  );
};

export default ReschedulePageForPatient;
