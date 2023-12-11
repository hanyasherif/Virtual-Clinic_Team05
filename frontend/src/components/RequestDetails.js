const RequestDetails = ({request}) => {
    return(
        <div className="workout-details">
            <h4>{request.name}</h4>
            <p><strong>Username: </strong>{request.username}</p>
            <p><strong>ID: </strong>{request.doctor}</p>
            <p><strong>Email: </strong>{request.email}</p>
            <p><strong>Date Of Birth: </strong>{request.dateOfBirth}</p>
            <p><strong>Hourly Rate: </strong>{request.hourlyRate}</p>
            <p><strong>Affiliation: </strong>{request.affiliation}</p>
            <p><strong>Educational Background: </strong>{request.educationalBackground}</p>
            <p>{request.createdAt}</p>
        </div>
    )
}

export default RequestDetails