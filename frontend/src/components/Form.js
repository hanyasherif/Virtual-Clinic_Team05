import { useState } from 'react'

const Form = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setBirth] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobile] = useState('')
  const [emergencyContactFullname, setEmergencyname] = useState('')
  const [emergencyContactMobileNumber, setEmergencymobile] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const register = {username, name, email, password, dateOfBirth, gender, mobileNumber, emergencyContactFullname, emergencyContactMobileNumber}
    
    const response = await fetch('/createPatient', { // check the route
      method: 'POST',
      body: JSON.stringify(register),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      
    }
    if (response.ok) {
      setError(null)
      setUsername('')
      setName('')
      setPassword('')
      setBirth('')
      setGender('')
      setMobile('')
      setEmergencymobile('')
      setEmergencyname('')
      console.log('New patient added:', json)
      alert(json.message);
      window.location.href = '/login';
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h1>Patient Information</h1>
     <div>
        <label>Username:</label>
        <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
        />
        </div>
      
     <div>
     <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />
     </div>
     
     <div>

     </div>

      <label>Email:</label>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
     <div>
        
        </div>
    <label>Password:</label>
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

     <div>
        
     </div>
    <label>Date of Birth:</label>
      <input 
        type="date" 
        onChange={(e) => setBirth(e.target.value)} 
        value={dateOfBirth} 
      />

      <div>
        
     </div>
    <label>Gender:</label>
      <input 
        type="text" 
        onChange={(e) => setGender(e.target.value)} 
        value={gender} 
      />

    <div>
        
     </div> 
    <label>Mobile Number:</label>
      <input 
        type="number" 
        onChange={(e) => setMobile(e.target.value)} 
        value={mobileNumber} 
      />

    <div>
        
     </div>
    <label>Emergency Contact Full Name:</label>
      <input 
        type="text" 
        onChange={(e) => setEmergencyname(e.target.value)} 
        value={emergencyContactFullname} 
      />

    <div>
        
    </div>
    <label>Emergency Contact Mobile Number:</label>
      <input 
        type="number" 
        onChange={(e) => setEmergencymobile(e.target.value)} 
        value={emergencyContactMobileNumber} 
      />



      <button>Add Patient</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Form