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
import Title from './Title';
import React, { useState, useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const PatPrescView = () => { 
    const [prescriptions,setPrescriptions] = useState([]);
    const [filter,setFilter] = useState({name:'', date:'' , doctorId:''});
    const [doctorNames, setDoctorNames] = useState({});
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');

    function preventDefault(event) {
        event.preventDefault();
    }

    useEffect(() => {
        getPrescriptions();
    }, []);
    
    const getPrescriptions =  async (filterName) => {
        filter.name=filterName
    await axios.get('http://localhost:3000/filterPrescription?username='+username+'&name='+filterName +"&date="+filter.date + "&doctorId="+filter.doctorId).then(
        (res) => { 
            const prescriptions = res.data
            console.log(prescriptions)
            setPrescriptions(prescriptions)
                        
            }).catch (error=>{
                alert('An error occurred:', error.message);
            }) 
    }

    return( 
<React.Fragment>
  <Title style={{ color: '#25A18E', fontSize: 23 }}>My Prescriptions</Title>
  {/* <TableContainer component={Paper}> */}
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Date</TableCell>
          <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Doctor</TableCell>
          <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Patient</TableCell>
          <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Status</TableCell>
          <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Medicine</TableCell>
          <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Dosage</TableCell>

        </TableRow>
      </TableHead>   
      <TableBody>
        {prescriptions.map((prescription) => (
          <TableRow 
          hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
          key={prescription.id}>
            <TableCell align="center">{prescription.date}</TableCell>
               <TableCell align="center">{prescription.doctorName}</TableCell>
               <TableCell align="center">{prescription.patientName}</TableCell>
               <TableCell align="center">{prescription.filled? "Filled" : "Not Filled"}</TableCell>
               <TableCell align="center">{prescription.medicines}</TableCell>
               <TableCell align="center">{prescription.dosage   }</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  {/* </TableContainer> */}
</React.Fragment>


    )
}
export default PatPrescView;

