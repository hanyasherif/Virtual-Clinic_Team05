import React from 'react'
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const { useState } = require("react");


const PatientInfo = () => { 
    const [patients,setPatients] = useState([]);
        
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    console.log(userId);
 

    const getPatients =  async () => {
         await axios.get('http://localhost:8000/admin/patients?id='+ userId).then(
        (res) => { 
            const patients = res.data
            console.log(patients)
            setPatients(patients)
            
        }
         );
       
    }
    return(

        // visualize patients in a table map over patients
        <div className="PatientsList">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getPatients}
            margin="normal"
            padding="normal"
                 sx={{
            color: 'white',
            backgroundColor: '#25A18E',
            '&:hover': {
              backgroundColor: '#20756c',
            },
          }}
            >Load Patient</Button>
            {/* margin */}
            </Box>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">UserName</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">DateOfBirth</StyledTableCell>
            <StyledTableCell align="center">MobileNumber</StyledTableCell>
            <StyledTableCell align="center">EmergencyContactFullname</StyledTableCell>
            <StyledTableCell align="center">EmergencyContactMobileNumber</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            

              >
                {/* <PateintProfile/> */}
              <TableCell align="center">{patient.username}</TableCell>
              <TableCell align="center">{patient.name}</TableCell>
              <TableCell align="center">{patient.email}</TableCell>
              <TableCell align="center">{patient.gender}</TableCell>
              <TableCell align="center">{patient.dateOfBirth}</TableCell>
              <TableCell align="center">{patient.mobileNumber}</TableCell>
              <TableCell align="center">{patient.emergencyContactFullname}</TableCell>
              <TableCell align="center">{patient.emergencyContactMobileNumber}</TableCell>
            

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         
        </div>
                

    )
}
export default PatientInfo;

