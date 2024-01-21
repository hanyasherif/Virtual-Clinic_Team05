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

const PresPatient = () => {
  const patientId ='65439068fbb6391653261744'; // Replace '343' with the actual doctorId
  const [prescription, setPrescription] = useState([]);

  
  
  
  const getDoctorPrescriptions = async () => {
  await axios.get(`http://localhost:8000/getPatientPresription/${patientId}`,{withCredentials:true}).then((res) => { 
    const presData = res.data
    console.log("prescription " ,presData );
    setPrescription(presData)
  //  fetchPatientNames(res.data.patient);
  //  console.log("patien iddd" ,res.data.patient );
  }).catch(err=>{
    console.log(err.message)
   });
  };
  useEffect(() => {
    getDoctorPrescriptions();
  }, [patientId]);

  return (
    <div className="FilterAppointmentsByDoctor">
      <Box sx={{ marginBottom: 2 }}>
       
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Doctor Name</StyledTableCell>
              <StyledTableCell align="center">Medicines</StyledTableCell>
              <StyledTableCell align="center">Instructions</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescription.map((Prescription) => (
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    width: "100%"
                  }
                }}
                onClick={() => window.location.href = `/SelectedPrescriptionP?prescriptionId=${Prescription._id}`}
                key={Prescription._id}
              >
                <TableCell align="center">{Prescription.date}</TableCell>
                <TableCell align="center">{Prescription.doctorName}</TableCell>
                <TableCell align="center">{Prescription.medicines}</TableCell>
                <TableCell align="center">{Prescription.instruction}</TableCell>
                <TableCell align="center">{Prescription.filled? "Filled" : "Not Filled"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PresPatient;
