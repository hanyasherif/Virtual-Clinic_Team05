import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import React, { useState,  useEffect} from 'react';
import TextField from "@mui/material/TextField";
import Title from './Title';

const UsersList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Id = searchParams.get('Id');
  const [searchName, setSearchName] = useState("");
  const [Patients,SetPatients] = useState([]);
  
  const getPatient =  async () => {
    await axios.get(`http://localhost:8000/getC?Id=${Id}`,{withCredentials:true}).then((res)=>{
      const patients = res.data;
      SetPatients(patients);
    }).catch (error=>{
      alert('An error occurred:', error.message);
  })}

      useEffect(() => {
        getPatient();
      }, []); 
      const searchPatients = async () => {
        if (searchName !== "") {
          axios
            .post('http://localhost:8000/searchByNamePatients', { // Use POST method and send data in the request body
              name: searchName,
              patList: Patients,
            }, {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.data);
              const patients = res.data;
              SetPatients(patients);
            })
            .catch((err) => {
              // Handle error
              console.error(err);
            });
        }
      };
      
      
    return(


<React.Fragment>
    <Title style={{ color: '#25A18E' , fontSize: 23}}>Chat with A Patient</Title>
    <Box sx={{ marginBottom: 2, marginLeft: 26, marginTop: -7}}>
        <TextField
          label="Search by Name"
          variant="outlined"
          margin="normal"
          value={searchName}
          sx={{
            minWidth: 150,
            marginLeft: 4,
            '& .MuiInputLabel-shrink': {
              color: '#25A18E', // Change label color while shrinking (on input)
            },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#25A18E', // Change border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#25A18E', // Change border color on focus
              },
            }
          }}    
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={searchPatients}
          margin="normal"
          padding="normal"
          sx={{
            marginTop: 2,
            marginLeft: 1,
            minWidth: 150,
            color: 'white',
            backgroundColor: '#25A18E',
            '&:hover': {
                backgroundColor: '#20756c', // Change color on hover if desired
            },
            height: 55
            }} 
        >
          Search Patients
        </Button>
        </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Name</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Username</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Patients.map((Patient) => (
            <TableRow 
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() =>window.location.href=`http://localhost:3000/PatientProfile?Patient=${Patient._id}&&Id=${Id}`}
              key={Patient._id}
            >
            <TableCell style={{ textAlign: 'center'}}>
            {Patient.name ? Patient.name : 'N/A'}
            </TableCell>
            <TableCell style={{ textAlign: 'center'}}>
              {Patient.username ? Patient.username : 'N/A'}
            </TableCell>
            <TableCell style={{ textAlign: 'center'}}>
              {Patient.email ? Patient.email : 'N/A'}
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link style={{ color: '#25A18E' }} href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more doctors
      </Link> */}
    </React.Fragment>
    )
}
export default UsersList;
