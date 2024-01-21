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
import React, { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const PharmacistsList = () => {
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const Id = searchParams.get('Id')
    const [Pharmacists,SetPharmacists] = useState([]);
    const [Name, setField3] = useState('');

    const getPharmacists= async () => {
        // Make a request to your backend API to fetch doctors based on search criteria
        axios.get(`http://localhost:8000/viewPharmacists`, {
          withCredentials: true
          } )
          .then((res) => {
            const Pharmacists = res.data;
            SetPharmacists(Pharmacists);
          });
      };

  return(
     <div className="UsersList">
          <Box sx={{marginBottom: 2}}>
           <div className="right" sx={{width:20}}>
            <h2>Welcome</h2>
           </div>
           <div className="middle">
           </div>
           <div className="left">
            <form>
            <Button variant="contained"
            onClick={() => getPharmacists()}
            margin="normal"
            padding="normal"
            >Load Pharmacists</Button>
             <input
                type="text"
                placeholder="Search "
                required
                 value={Name}
                onChange={(e) => setField3(e.target.value )}
             />
          </form>
           </div>
          </Box>
          
      
      
          
  <TableContainer component={Paper} className='MiddleAPP'>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">username</StyledTableCell>
          <StyledTableCell align="center">Email</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Pharmacists.map((Pharmacist) => (
          <TableRow
          hover
          sx={{
              "&:hover":{
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
              width: "100%"
              }
          }}
           onClick={() =>window.location.href=`http://localhost:3000/ChatPatientProfile?Patient=${Pharmacist._id}&&Id=${Id}`}
           key={Pharmacist._id}
          >
            <TableCell align="center">{Pharmacist.username}</TableCell>
            <TableCell align="center">{Pharmacist.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
      </div>
              

  )
}


export default PharmacistsList;





  