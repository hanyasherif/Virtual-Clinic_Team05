import { useEffect, useState } from "react"

// components
//import Details from "../../../admin/src/components/details"
import Form from "../components/form"

const Home = () => {
  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        setWorkouts(json)
      }
    }

    fetchDetails()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <Form workout={workout} key={workout._id} />
                    ))}
                </div>
            <Form />
    </div>
  )
}

export default Home