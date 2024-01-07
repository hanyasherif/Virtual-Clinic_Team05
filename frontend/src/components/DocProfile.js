import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



const DocProfile = () => {

    const params = new URLSearchParams(window.location.search);
    const doctorId = params.get('doctorId');
    const [appointment,setAppointment] = useState([]);
    const [doctor, setDoctor] = useState({});

    useEffect(() => {
      const fetchDoctorData = async () => {
          try {
              const res = await axios.get(`http://localhost:8000/getDoctorInfo?doctorId=${doctorId}`);
              setDoctor(res.data);
          } catch (err) {
              console.log(err.message);
          }
      };

      const fetchAppointments = async () => {
          try {
              const res = await axios.get(`http://localhost:8000/viewAppointmentsOfDoctor/${doctorId}`);
              setAppointment(res.data);
          } catch (err) {
              console.log(err.message);
          }
      };

      fetchDoctorData();
      fetchAppointments();

      
  }, [doctorId]);

  const chat= async() =>{
    localStorage.setItem('partner', params.get('doctorId'));
    window.location.href='http://localhost:3000/ChatPage'
  }
  return (
    <div className="doctor-profile">
      <div>
      <h2>{doctor.name}</h2>
      {/* <img src={doctor.profilePicture} alt="Doctor" /> */}
      <p>Email: {doctor.email}</p>
      <p>Speciality: {doctor.docSpeciality}</p>
      <p>Education: {doctor.educationalBackground}</p>
      <p>Date of Birth: {doctor.dateOfBirth}</p>
      <p>Hourly Rate: ${doctor.hourlyRate}</p>
      <p>Affiliation: {doctor.affiliation}</p>
      </div>
      <div>
      <button  onClick={chat}>
           Chat
      </button>
      </div>
      <br/>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Doctor</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointment.map((Appointment) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() => window.location.href = `/SApp?appointmentId=${Appointment._id}`}
                key={appointment._id}>      
              <TableCell align="center">{Appointment.date}</TableCell>
              <TableCell align="center">{doctor.name}</TableCell>
              <TableCell align="center">{Appointment.status}</TableCell>
              <TableCell align="center">{Appointment.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default DocProfile;
