import React from 'react';

const RequestDetails = ({ request }) => {

    const handleAccept = async (requestId) => {
        try {
            const response = await fetch("http://localhost:8000/handleAccept/"+requestId, {
                method: 'PUT', // Change the method to PUT
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type if necessary
                },credentials: 'include'
                // You can include a request body if needed
                // body: JSON.stringify({ /* data to send */ }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to accept the request');
            }
            window.location.href="http://localhost:3000/requests";
            // Handle successful request acceptance
        } catch (err) {
            console.error('Error accepting the request:', err);
            // Handle errors
        }
    };
    

    const handleReject = async (requestId) => {
        try {
            const response = await fetch("http://localhost:8000/handleReject/"+requestId, {
                method: 'PUT', // Change the method to PUT
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type if necessary
                },credentials: 'include'
                // You can include a request body if needed
                // body: JSON.stringify({ /* data to send */ }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to accept the request');
            }
            window.location.href="http://localhost:3000/requests";
            // Handle successful request acceptance
        } catch (err) {
            console.error('Error accepting the request:', err);
            // Handle errors
        }
    };

    return (
        <div className="workout-details">
            <h4>{request.name}</h4>
            <p><strong>Username: </strong>{request.username}</p>
            <p><strong>ID: </strong>{request.doctor}</p>
            <p><strong>Email: </strong>{request.email}</p>
            <p><strong>Date Of Birth: </strong>{request.dateOfBirth}</p>
            <p><strong>Hourly Rate: </strong>{request.hourlyRate}</p>
            <p><strong>Affiliation: </strong>{request.affiliation}</p>
            <p><strong>Educational Background: </strong>{request.educationalBackground}</p>
            <p><strong>Request Status: </strong>{request.status}</p>
            <p>{request.createdAt}</p>
            
            {/* Accept and Reject Buttons */}
            {request.status === 'pending' && (
                <div>
                    <button onClick={() => handleAccept(request._id)}>Accept</button>
                    <button onClick={() => handleReject(request._id)}>Reject</button>
                </div>
            )}
        </div>
    );
};

export default RequestDetails;