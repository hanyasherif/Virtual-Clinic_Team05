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


const Meeting = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Id = searchParams.get('Id');
      const [Meetings,SetAppointments] = useState([]);
      const getAppointments =  async () => {
        try {
          const response = await axios.get(`http://localhost:3000/UpcomingAppoint?Id=${Id}`);
          const meeting = response.data;
          SetAppointments(meeting);
        } catch (error) {
          alert('An error occurred:', error.message);
        }
    }
    return(
       <div className="UsersList">
            <Box sx={{marginBottom: 2}}>
             <div className="right" sx={{width:20}}>
              <h2>Welcome Dr Mo</h2>
             </div>
             <div className="middle">
             </div>
             <div className="left">
             <Button variant="contained"
            onClick={getAppointments}
            margin="normal"
            padding="normal"
            >Load Appointment</Button> 
            {/* margin */}
             </div>
            </Box>
            
        
        
            
    <TableContainer component={Paper} className='MiddleAPP'>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">to Be Determind</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Meetings.map((meet) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            key={meet._id}

              >
              <TableCell align="center">{meet.date}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
                

    )
}
export default Meeting;
