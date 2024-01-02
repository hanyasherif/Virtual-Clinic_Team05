const details = ({ workout }) => { // fix workout

    return ( // MAKE ALL FUNCTIONS FOR USER INFO
      <div className="details"> 
        <h4>{workout.title}</h4> 
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of reps: </strong>{workout.reps}</p>
        <p>{workout.createdAt}</p>
      </div>

/*
      <div className="details"> 
        <h4>Mohab Olayan</h4> 
        <p><strong>Username: </strong></p>
        <p><strong>Birthdate: </strong></p>
      </div>
*/
    )
  }
  
  export default details