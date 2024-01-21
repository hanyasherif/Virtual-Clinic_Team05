import React from 'react'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'



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
  const [emergencyContactRelation, setEmergencyrelation] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const register = {username, name, email, password, dateOfBirth, gender, mobileNumber, emergencyContactFullname, emergencyContactMobileNumber, emergencyContactRelation}
    
    const response = await fetch('/registerPatient', { // check the route
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
      setEmergencyrelation('')
      console.log('New patient added:', json)
    }

  }

 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* Patient Information form */}
      <form  onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          sx={{ marginTop: 20 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          sx={{ marginTop: '1rem' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          sx={{ marginTop: '1rem' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          id="password"
          sx={{ marginTop: '1rem' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Date of Birth"
          variant="outlined"
          margin="normal"
          fullWidth
          type="date"
          id="dateOfBirth"
          sx={{ marginTop: '1rem' }}
          value={dateOfBirth}
          onChange={(e) => setBirth(e.target.value)}
          InputLabelProps={{
            shrink: true,
            style: { width: '100%' } // Adjust the width of the label
          }}
        />
        <TextField
          label="Gender"
          variant="outlined"
          margin="normal"
          fullWidth
          id="gender"
          sx={{ marginTop: '1rem' }}
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Mobile Number"
          variant="outlined"
          margin="normal"
          fullWidth
          type="number"
          id="mobileNumber"
          sx={{ marginTop: '1rem' }}
          value={mobileNumber}
          onChange={(e) => setMobile(e.target.value)}
        />
        <TextField
          label="Emergency Contact Full Name"
          variant="outlined"
          margin="normal"
          fullWidth
          id="emergencyContactFullname"
          sx={{ marginTop: '1rem' }}
          value={emergencyContactFullname}
          onChange={(e) => setEmergencyname(e.target.value)}
        />
        <TextField
          label="Emergency Contact Mobile Number"
          variant="outlined"
          margin="normal"
          fullWidth
          type="number"
          id="emergencyContactMobileNumber"
          sx={{ marginTop: '1rem' }}
          value={emergencyContactMobileNumber}
          onChange={(e) => setEmergencymobile(e.target.value)}
        />
        <TextField
          label="Emergency Contact Relation to Patient"
          variant="outlined"
          margin="normal"
          fullWidth
          id="emergencyContactRelation"
          sx={{ marginTop: '1rem' }}
          value={emergencyContactRelation}
          onChange={(e) => setEmergencyrelation(e.target.value)}
        />

        <br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20, marginBottom: 20, width: '100%' }}
            sx={{
              color: 'white',
              backgroundColor: '#25A18E',
              '&:hover': {
                backgroundColor: '#20756c',
              },
            }}
          >
            Add Patient
          </Button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>

    </div>
  );
}

export default Form