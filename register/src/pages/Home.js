import { useEffect, useState } from "react"
import Navbar from '../components/navbar';

// components
//import Details from "../../../admin/src/components/details"
import Form from "../components/form"

const Home = () => {
  const [patients, setpatients] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch('/createPatient')
      const json = await response.json()

      if (response.ok) {
        setpatients(json)
      }
    }

    fetchDetails()
  }, [])

  return (
    <div className="home">
      <Navbar/>
      <div className="patients">
        {patients && patients.map(patients => (
          <Form patients={patients} key={patients._id} />
                    ))}
                </div>
            <Form />
    </div>
  )
}

export default Home