import React from "react"
import axios from 'axios';


const RequestDetails = ({request}) => {


    const handleAccept = async (requestId) => {
        try {
            const response = await axios.put(`http://localhost:4000/handleAccept/${requestId}`, {
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type if necessary
                },
                // You can include a request body if needed
                // data: { /* data to send */ },
            });

            if (response.status !== 200) {
                throw new Error('Failed to accept the request');
            }
            window.location.href = "http://localhost:3000/requests";
            // Handle successful request acceptance
        } catch (err) {
            console.error('Error accepting the request:', err);
            // Handle errors
        }
    };
    

    const handleReject = async (requestId) => {
        try {
            const response = await axios.put(`http://localhost:4000/handleReject/${requestId}`, {
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type if necessary
                },
                // You can include a request body if needed
                // data: { /* data to send */ },
            });

            if (response.status !== 200) {
                throw new Error('Failed to accept the request');
            }
            window.location.href = "http://localhost:3000/requests";
            // Handle successful request acceptance
        } catch (err) {
            console.error('Error accepting the request:', err);
            // Handle errors
        }
    };



    
    return(
        <div className="workout-details">
            <h4>{request.name}</h4>
            <p><strong>Username: </strong>{request.username}</p>
            <p><strong>Email: </strong>{request.email}</p>
            <p><strong>Date Of Birth: </strong>{request.dateOfBirth}</p>
            <p><strong>Hourly Rate: </strong>{request.hourlyRate}</p>
            <p><strong>Affilation: </strong>{request.affiliation}</p>
            <p><strong>Educational Background: </strong>{request.educationalBackground}</p>
            <p>{request.createdAt}</p>
            {/* Accept and Reject Buttons */}
            {request.status === 'pending' && (
                <div>
                    <button onClick={() => handleAccept(request._id)}>Accept</button>
                    <button onClick={() => handleReject(request._id)}>Reject</button>
                </div>
            )}
        </div>
    )




}



export default RequestDetails