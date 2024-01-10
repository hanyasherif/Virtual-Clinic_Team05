import Title from './Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Link } from '@mui/material';
const { useState } = require("react")


const RequestForm = () => {

    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [doctor,setDoctor] = useState('')
    const [email,setEmail] = useState('')
    const [dateOfBirth,setDateOfBirth] = useState('')
    const [hourlyRate,setHourlyRate] = useState('')
    const [affiliation,setAffiliation] = useState('')
    const [educationalBackground,setEducationalBackground] = useState('')
    const [error,setError] = useState(null)
    

    /////////////////////////////////////from medical history
 
    const [selectedFile, setSelectedFile] = useState(null);
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      };
    
      const uploadDocument = async (file, usernameR) => {
        try {
          const formData = new FormData();
          console.log("username  " ,usernameR);
          formData.append('document', selectedFile);
          formData.append('requestId', usernameR);
      
          await fetch(`http://localhost:8000/upload-doc`, {
            method: "POST",
            body: formData,credentials: 'include'
          });
    
      
          
        } catch (error) {
          console.error({ message: error.message });
          
        }
      };

    ////////////////////////
    const handleName = e => {
        setName (e.target.value)
    }
    const handleUsername = e => {
        setUsername (e.target.value)
    }
    const handlePassword = e => {
        setPassword (e.target.value)
    }
    const handleDoctor = e => {
        setDoctor (e.target.value)
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
            doctor:doctor,
            email:email,
            dateOfBirth:dateOfBirth,
            hourlyRate:hourlyRate,
            affiliation:affiliation,
            educationalBackground:educationalBackground
        }
        const response = await fetch(`http://localhost:8000/addRequest`,{
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
            //call method upload
            console.log("sentt username" ,response.json() );
           // uploadDocument(selectedFile, response.json().username);
            setUsername('')
            setName('')
            setPassword('')
            setDoctor('')
            setHourlyRate('')
            setEmail('')
            setEducationalBackground('')
            setDateOfBirth('')
            setAffiliation('')
            setError(null)
            alert(' New Request Added');
        }
    }

    const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

    return (
        <div>
            <button onClick={goBack} className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <br /><br />
            <Title style={{ color: '#25A18E', fontSize: 23, textAlign: 'center' }}>Submit Doctor Request</Title>
            <form className="create" onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={name}
                        onChange={handleName}
                    />
                </div>
                <div>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={username}
                        onChange={handleUsername}
                    />
                </div>
                <div>
                    <TextField
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <div>
                    <TextField
                        label="ID"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={doctor}
                        onChange={handleDoctor}
                    />
                </div>
                <div>
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div>
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
                            style: { width: '100%' } // Adjust the width of the label
                          }}
                    />
                </div>
                <div>
                    <TextField
                        label="Hourly Rate"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        value={hourlyRate}
                        onChange={handleHourlyRate}
                    />
                </div>
                <div>
                    <TextField
                        label="Affiliation"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={affiliation}
                        onChange={handleAffiliation}
                    />
                </div>
                <div>
                    <TextField
                        label="Educational Background"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={educationalBackground}
                        onChange={handleEducationalBackground}
                    />
                </div>
                 <div>
                 <input type="file" onChange={handleFileChange} style={{marginLeft:200, marginTop: 20}}/>
                  </div>
                

               

                


                <Button type="submit" onClick={handleSubmit} 
                variant="contained"
                color="primary"
                style={{ marginTop: 20, width: '100%' }}
                sx={{
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                    backgroundColor: '#20756c',
                  },
                }}
              >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default RequestForm