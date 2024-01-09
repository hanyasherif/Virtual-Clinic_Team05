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
import Title from './Title';

const UsersList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Id = searchParams.get('Id');
      const [Patients,SetPatients] = useState([]);
      const getPatient =  async () => {
        // try {
           await axios.get(`http://localhost:8000/getC?Id=${Id}`,{withCredentials:true}).then((res)=>{
             const patients = res.data;
             console.log(patients)
             SetPatients(patients);
             
            }).catch (error=>{
             alert('An error occurred:', error.message);

           })}

      useEffect(() => {
        getPatient();
      }, []); 

    return(


<React.Fragment>
    <Title style={{ color: '#25A18E' , fontSize: 23}}>My Patient's List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
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
              <TableCell style={{ textAlign: 'center'}}>{Patient.username}</TableCell>
              <TableCell style={{ textAlign: 'center'}}>{Patient.email}</TableCell>
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
