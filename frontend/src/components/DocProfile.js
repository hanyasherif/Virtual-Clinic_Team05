import * as React from 'react';
 import axios from "axios";
import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItemsCl';
import Table from '@mui/material/Table';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Input } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        El7a2ny
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>

    
  );
}
const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'left',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
}));

const ProfileDetail = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ActionButtonsContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(2),
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#004E64', // New background color
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#25A18E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const defaultTheme = createTheme();

export default function DocProfile  ()  {


  const handleLogout = async (e) => {
    try {
      await fetch(`http://localhost:8000/logout`,{credentials: 'include'});
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

    const params = new URLSearchParams(window.location.search);
    const doctorId = params.get('doctorId');
    const [appointment,setAppointment] = useState([]);
    const [doctor, setDoctor] = useState({});
    const Videochat= async() =>{
      localStorage.setItem('partner', params.get('doctorId'));
      window.location.href='http://localhost:3000/VideoChatPage'
    }
    useEffect(() => {
      
      const fetchDoctorData = async () => {
          try {
              const res = await axios.get(`http://localhost:8000/getDoctorInfo?doctorId=${doctorId}`,{withCredentials:true});
              setDoctor(res.data);
          } catch (err) {
              console.log(err.message);
          }
      };

      const fetchAppointments = async () => {
          try {
              const res = await axios.get(`http://localhost:8000/viewAppointmentsOfDoctor/${doctorId}`,{withCredentials:true});
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
    <ThemeProvider theme={defaultTheme}>
       <CssBaseline />
    <div className="doctor-profile">
      <ProfileContainer elevation={3}>
        <Typography variant="h4" gutterBottom>
          Doctor {doctor.name}
        </Typography>
        <Divider />
        <ProfileDetail>
          <strong>Email:</strong> {doctor.email}
        </ProfileDetail>
        <ProfileDetail>
          <strong>Speciality:</strong> {doctor.docSpeciality}
        </ProfileDetail>
        <ProfileDetail>
          <strong>Education:</strong> {doctor.educationalBackground}
        </ProfileDetail>
        <ProfileDetail>
          <strong>Date of Birth:</strong> {doctor.dateOfBirth}
        </ProfileDetail>
        <ProfileDetail>
          <strong>Hourly Rate:</strong> ${doctor.hourlyRate}
        </ProfileDetail>
        <ProfileDetail>
          <strong>Affiliation:</strong> {doctor.affiliation}
        </ProfileDetail>
      </ProfileContainer>

      <ActionButtonsContainer>
        <Button variant="contained" color="primary" onClick={Videochat}>
          VideoChat
        </Button>
        <Button variant="contained" color="primary" onClick={chat}>
          Chat
        </Button>
      </ActionButtonsContainer>

      <br />


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



    </ThemeProvider>
  );


          }



