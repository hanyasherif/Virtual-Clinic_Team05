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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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
  background: 'linear-gradient(to right, #004E64, #0088A8)',
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
const specificButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.5em',
  color: '#333', /* Adjust the color as needed */
  padding: '0.2em',
};
const defaultTheme = createTheme();

export default function DocProfile  ()  {

  const [open, setOpen] = React.useState(true);
  const [buttonPosition, setButtonPosition] = React.useState({
    top: '75px',
    left: '120px',
  });
  const toggleDrawer = () => {
    setOpen(!open);
    if (open) {
      setButtonPosition({
        top: '75px',
        left: '70px',
      });
    } else {
      setButtonPosition({
        top: '75px',
        left: '240px', // Adjust this value according to your drawer width
      });
    }
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };


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
       <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              El7a2ny Clinic Patient Page
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
    <div className="doctor-profile">
    <button
          onClick={goBack}
          className="back-button"
          style={{
            ...specificButtonStyle,
            top: buttonPosition.top,
            left: buttonPosition.left,
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      <ProfileContainer elevation={3}>
        <Typography variant="h4" gutterBottom sx={{marginTop: 1}}>
          Doctor {doctor.name}
        </Typography>
        <Divider />
        <ProfileDetail sx={{marginTop: 2}}>
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
        <Button 
        variant="contained"
        sx={{
          color: 'white',
          marginLeft: 3,
          backgroundColor: '#25A18E',
          '&:hover': {
            backgroundColor: '#20756c',
          },
        }}     
        onClick={Videochat}>
          VideoChat
        </Button>
        <Button 
        variant="contained"
        sx={{
          color: 'white',
          backgroundColor: '#25A18E',
          '&:hover': {
            backgroundColor: '#20756c',
          },
        }}    
        onClick={chat}>
          Chat
        </Button>
      </ActionButtonsContainer>
      <br />
      <Typography 
        sx={{marginLeft: 3}}
      >
          Choose An Appointment To Reserve:
        </Typography>
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
    <Copyright sx={{ pt: 4 }} />
    </div>

    </Box>
      </Box>

    </ThemeProvider>
  );


          }



