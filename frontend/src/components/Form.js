import { useState } from 'react'
import './LoginForm.css'; // Import your CSS file for styling
import Header from "./Header";

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
      //alert(json.error.message);
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
      window.location.href = '/';
    }
  }

  return (
    <div>
    <form className="create" onSubmit={handleSubmit}> 
  <h1>Patient Information</h1>
  <div className="form-group">
    <label>Username:</label>
    <input 
      type="text" 
      onChange={(e) => setUsername(e.target.value)} 
      value={username}
      className="form-control"
    />
  </div>
  <div className="form-group">
    <label>Name:</label>
    <input 
      type="text" 
      onChange={(e) => setName(e.target.value)} 
      value={name}
      className="form-control"
    />
  </div>
  <div className="form-group">
    <label>Email:</label>
    <input 
      type="text" 
      onChange={(e) => setEmail(e.target.value)} 
      value={email} 
      className="form-control"
    />
  </div>
  <div className="form-group">
    <label>Password:</label>
    <input 
      type="password" 
      onChange={(e) => setPassword(e.target.value)} 
      value={password} 
      className="form-control"
    />
  </div>
  <div className="form-group">
    <label>Date of Birth:</label>
    <input 
      type="date" 
      onChange={(e) => setBirth(e.target.value)} 
      value={dateOfBirth} 
      className="form-control"
    />
  </div>
  <div className="form-group">
    <label>Gender:</label>
    <input 
      type="text" 
      onChange={(e) => setGender(e.target.value)} 
      value={gender} 
      className="form-control"
    />
  </div>
  <div className="form-group">
    <label>Mobile Number:</label>
    <input 
      type="number" 
      onChange={(e) => setMobile(e.target.value)} 
      value={mobileNumber} 
      className="form-control"
    />
  </div>
  <div className="form-group">
    <label>Emergency Contact Full Name:</label>
    <input 
      type="text" 
      onChange={(e) => setEmergencyname(e.target.value)} 
      value={emergencyContactFullname} 
      className="form-control"
    />
  </div>
  <div className="form-group">
    <label>Emergency Contact Mobile Number:</label>
    <input 
      type="number" 
      onChange={(e) => setEmergencymobile(e.target.value)} 
      value={emergencyContactMobileNumber} 
      className="form-control"
    />
  </div>

  <button className="btn">Add Patient</button>
  {error && <div className="error">{error}</div>}
</form>
</div>
  );
};

export default Form