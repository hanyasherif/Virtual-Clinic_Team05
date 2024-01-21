import React from "react";
import Title from '../components/Title';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


const { useState } = require("react")

const RequestForm = () => {
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [dateOfBirth,setDateOfBirth] = useState('')
    const [hourlyRate,setHourlyRate] = useState('')
    const [affiliation,setAffiliation] = useState('')
    const [educationalBackground,setEducationalBackground] = useState('')
    const [error,setError] = useState(null)
    
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };


    const handleName = e => {
        setName (e.target.value)
    }
    const handleUsername = e => {
        setUsername (e.target.value)
    }
    const handlePassword = e => {
        setPassword (e.target.value)
    }
    const handleEmail = e => {
        setEmail (e.target.value)
    }
    const handleDateOfBirth = e => {
        setDateOfBirth (e.target.value)
    }
    const handleHourlyRate = e => {
        setHourlyRate (e.target.value)
    }
    const handleAffiliation = e => {
        setAffiliation (e.target.value)
    }
    const handleEducationalBackground = e => {
        setEducationalBackground(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault ()
        const data = {
            name:name,
            username:username,
            password:password,
            email:email,
            dateOfBirth:dateOfBirth,
            hourlyRate:hourlyRate,
            affiliation:affiliation,
            educationalBackground:educationalBackground
        }
        const response = await fetch('/addRequest',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setUsername('')
            setName('')
            setPassword('')
            setHourlyRate('')
            setEmail('')
            setEducationalBackground('')
            setDateOfBirth('')
            setAffiliation('')
            setError(null)
            console.log('new request added',json)
        }
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Title style={{ color: '#25A18E', fontSize: 23, textAlign: 'center' }}>Submit Pharmacist Request</Title>

        <form className="create" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
            <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                fullWidth
                value={name}
                onChange={handleName}
            />
            <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                value={username}
                onChange={handleUsername}
            />
            <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                value={password}
                onChange={handlePassword}
            />
            <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                type="email"
                value={email}
                onChange={handleEmail}
            />
            <TextField
                label="Date Of Birth"
                variant="outlined"
                margin="normal"
                fullWidth
                type="date"
                value={dateOfBirth}
                onChange={handleDateOfBirth}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{ width: '100%' }}
            />
            <TextField
                label="Hourly Rate"
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                value={hourlyRate}
                onChange={handleHourlyRate}
            />
            <TextField
                label="Affiliation"
                variant="outlined"
                margin="normal"
                fullWidth
                value={affiliation}
                onChange={handleAffiliation}
            />
            <TextField
                label="Educational Background"
                variant="outlined"
                margin="normal"
                fullWidth
                value={educationalBackground}
                onChange={handleEducationalBackground}
            />
             <div>
                 <input type="file" onChange={handleFileChange} style={{marginLeft:200, marginTop: 20}}/>
                  </div>
    
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 20, width: '100%' }}
            >
                Submit
            </Button>
        </form>
    </div>
    )
}

export default RequestForm