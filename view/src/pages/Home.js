import { useEffect, useState } from "react"

// components
import Details from "../components/forms"
//import Form from "../../../frontend/src/components/form"

const body=
{
  username:"waell"
}

const Admin = () => {
  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch('/admin/pharmicsts',{
        method: 'GET',
        headers:{
          'Conten-Type' : 'application/json',
        },
        body: body
      });
      const json = await response.json()

      if (response.ok) {
        setWorkouts(json)
      }
    }

    fetchDetails()
  }, [])

  return (
    <div className="home">
      <div className="pharmicsts">
        {workouts && workouts.map(workout => (
          <Details workout={workout} key={workout._id} />
        ))}
      </div>
      <Details />
    </div>
  )
}

export default Admin