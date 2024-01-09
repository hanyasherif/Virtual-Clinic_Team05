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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#25A18E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
            //  for(let i = 0; i<patients.length; i++){
            //     if(!(Patients.includes(patients[i]))){
            //       Patients.push(patients[i]);
            //     }
            //  }
             SetPatients(patients);
             
            }).catch (error=>{
             alert('An error occurred:', error.message);

           })}

      useEffect(() => {
        getPatient();
      }, []); 

    return(
       <div className="UsersList">
         <Title style={{ color: '#25A18E' , fontSize: 23}}>My Patient's List</Title>
    <TableContainer component={Paper} className='MiddleAPP'>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">username</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
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
              <TableCell align="center">{Patient.username}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
                

    )
}
export default UsersList;
