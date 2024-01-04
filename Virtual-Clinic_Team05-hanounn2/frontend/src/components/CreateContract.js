import { useState } from 'react';
import axios from 'axios';

const CreateContract = () => {
    const [doctorUserName, setDoctorUserName] = useState('');
    const [termsAnd, setTermsAnd] = useState('');
    const [markup, setMarkup] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Check if the doctor's username exists in the database
            let user;
            try {
                const response = await axios.get(`http://localhost:8000/getUserByUsername/${doctorUserName}`);
                user = response.data;
            } catch (error) {
                console.error('Error checking username:', error);
                alert('Doctor username not found in the database.');
                return;
            }
    
            if (!user) {
                alert('Doctor username not found in the database.');
                return;
            }
    
            const doctorId = user._id; // or user._id;
            // Use Axios to send a POST request with the form data
            const response = await axios.post('http://localhost:8000/createContract', {
                doctorId,
                termsAnd,
                markup
            });
    
            // Handle the response as needed
            console.log(response.data);
    
            // Optionally, you can reset the form fields and error state after a successful submission
            setDoctorUserName('');
            setTermsAnd('');
            setMarkup('');
            setError('');
        } catch (error) {
            // Handle errors
            console.error('Error creating contract:', error);
            setError('An error occurred while creating the contract.');
        }
    };
    

    const checkUsernameExists = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8000/getUserByUsername/${username}`);
            return response.data;
        } catch (error) {
            console.error('Error checking username:', error);
            return false;
        }
    };

    return (
        <div>
            <header>
                <h1>Create Employment Contract</h1>
            </header>

            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="doctorUsername">Enter Doctor Username:</label>
                    <input
                        type="text"
                        value={doctorUserName}
                        onChange={(e) => setDoctorUserName(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="termsAndConditions">Terms And Conditions:</label>
                    <input
                        type="text"
                        value={termsAnd}
                        onChange={(e) => setTermsAnd(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="markup">Markup:</label>
                    <input
                        type="text"
                        value={markup}
                        onChange={(e) => setMarkup(e.target.value)}
                        required
                    />
                    <br />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit">Create Contract</button>
                </form>
            </section>
        </div>
    );
};

export default CreateContract;
