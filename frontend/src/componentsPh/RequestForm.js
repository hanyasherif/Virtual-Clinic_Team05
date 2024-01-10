import React from "react";
import Title from '../components/Title';


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
        <div>
            <Title style={{ color: '#25A18E' , fontSize: 23, textAlign: 'center' }}>Submit Request</Title>

            {/* <h1>Submit Request</h1> */}
                <form className="create" onSubmit={handleSubmit}>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text" 
                            placeholder="Enter you name"
                            value={name}
                            onChange={handleName}
                        />
                    </div>
                    <div>
                        <label>Username: </label>
                        <input
                            type="text" 
                            placeholder="Enter you username"
                            value={username}
                            onChange={handleUsername}
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            type="password" 
                            placeholder="Enter you password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input 
                            type="email" 
                            placeholder="Enter you Email"
                            value={email}
                            onChange={handleEmail}
                            />
                    </div>
                    <div>
                        <label>Date Of Birth: </label>
                        <input 
                            type="date" 
                            placeholder="Enter you Email"
                            value={dateOfBirth}
                            onChange={handleDateOfBirth}
                            />
                    </div>
                    <div>
                        <label>Hourly Rate: </label>
                        <input 
                            type="number" 
                            placeholder="Enter you Hourly Rate"
                            value={hourlyRate}
                            onChange={handleHourlyRate}
                            />
                    </div>
                    <div>
                        <label>Affiliation: </label>
                        <input 
                            type="text" 
                            placeholder="Enter you affiliation"
                            value={affiliation}
                            onChange={handleAffiliation}
                            />
                    </div>
                    <div>
                        <label>Educational Background: </label>
                        <input 
                            type="text"
                            placeholder="Enter you educational background:"
                            value={educationalBackground}
                            onChange={handleEducationalBackground}
                            />
                    </div>
                    <input type="submit" onClick={handleSubmit} className="primaryBtn" style={{marginLeft: 160}}/>
                </form>
        </div>
    )
}

export default RequestForm