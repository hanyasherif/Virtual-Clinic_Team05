import { useState, useEffect } from 'react';
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

const DoctorApp = () => {
  const [appointments, setAppointments] = useState([]);

  const getDoctorAppointments = async () => {
    await axios.get(`http://localhost:8000/getDoctorAppointments`,{withCredentials:true}).then((res) => { 
    const appData = res.data
    console.log("Appointment " ,appData );
    setAppointments(appData);
  //  fetchPatientNames(res.data.patient);
  //  console.log("patien iddd" ,res.data.patient );
  }).catch(err=>{
    console.log(err.message)
   });
  };

  useEffect(() => {
    getDoctorAppointments();
  }, []);

  return (
    <div className="FilterAppointmentsByDoctor">
      <Box sx={{ marginBottom: 2 }}>
       
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((Appointment) => (
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    width: "100%"
                  }
                }}
                onClick={() => window.location.href = `/SelectedDoctorApp?appointmentId=${Appointment._id}`}
                key={Appointment._id}
              >
                <TableCell align="center">{Appointment.date}</TableCell>
                <TableCell align="center">{Appointment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DoctorApp;
