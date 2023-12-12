import { useState } from 'react';
import axios from 'axios';

const AddAppointment = () => {
    const [date, setDate] = useState('');
    const id = '6543e673eff0e09fab8d7124';//session

    const handleAddAppointment = async () => {
        try {
            // Make sure to replace 'http://localhost:8000/createAppointment' with the actual endpoint
            const response = await axios.post(`http://localhost:8000/createAppointment/${id}`, {
                date: date,
            });

            // Handle the response as needed
            console.log(response.data);

            // Optionally, you can reset the date after a successful submission
            setDate('');
        } catch (error) {
            // Handle errors
            console.error('Error adding appointment:', error);
        }
    };

    return (
        <div>
            <label htmlFor="date">Date:</label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Enter date"
            />
            <button onClick={handleAddAppointment}>Add Appointment</button>
        </div>
    );
};

export default AddAppointment;
