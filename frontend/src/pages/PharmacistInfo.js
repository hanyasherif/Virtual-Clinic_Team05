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


const PharmacistInfo = () => { 
    const [pharmacists,setPharmacists] = useState([]);
        
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    console.log(userId);
 

    const getPharmacists =  async () => {
         await axios.get('http://localhost:8000/admin/pharmicsts?id='+ userId).then(
        (res) => { 
            const pharmacists = res.data
            console.log(pharmacists)
            setPharmacists(pharmacists)
            
        }
         );
       
    }
    return(

        // visualize pharmacists in a table map over pharmacists
        <div className="PharmacistsList">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getPharmacists}
            margin="normal"
            padding="normal"
            color="primary"
            sx={{
              color: 'white',
              backgroundColor: '#25A18E',
              '&:hover': {
                backgroundColor: '#20756c',
              },
            }}
            >Load Pharmacist</Button>
            {/* margin */}
            </Box>
            {/* onClick={getPharmacists} */}

        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">UserName</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">DateOfBirth</StyledTableCell>
            <StyledTableCell align="center">HourlyRate</StyledTableCell>
            <StyledTableCell align="center">Affiliation</StyledTableCell>
            <StyledTableCell align="center">EduactionalBackground</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {pharmacists.map((pharmacist) => (
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
              <TableCell align="center">{pharmacist.username}</TableCell>
              <TableCell align="center">{pharmacist.name}</TableCell>
              <TableCell align="center">{pharmacist.email}</TableCell>
              <TableCell align="center">{pharmacist.dateOfBirth}</TableCell>
              <TableCell align="center">{pharmacist.hourlyRate}</TableCell>
              <TableCell align="center">{pharmacist.affliation}</TableCell>
              <TableCell align="center">{pharmacist.educationalBackground}</TableCell>
    
            

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         
        </div>
                

    )
}
export default PharmacistInfo;

