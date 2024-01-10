import * as React from 'react';
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
import { mainListItems, secondaryListItems } from './listItemsDoc';
import { Box, Button, Input } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import { useLocation } from 'react-router-dom';
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Title from './Title';

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

const drawerWidth = 240;
const specificButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.5em',
  color: '#333', /* Adjust the color as needed */
  padding: '0.2em',
};


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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ScheduleFollowUp() {


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
    left: '120px',
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Id = searchParams.get('Id');
  console.log("Appp id"+Id);
  const patientId = searchParams.get('patientId');
  const [Patients,SetPatients] = useState([]);
  
 

      useEffect(() => {
        getAppointments();
        
      }, []); 
    
  const [followUpDate, setFollowUpDate] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledAppointment, setScheduledAppointment] = useState(null);

  const scheduleFollowUp = async () => {
    try {
      const response = await fetch('http://localhost:8000/ScheduleFollowUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FollowUpDate: followUpDate,
          PatientId: patientId,
          AppointmentId:Id
        }),credentials:'include'
      });

      if (response.ok) {
        const data = await response.json();
        alert("Follow up scheduled successfully");
       
      } else {
        // Handle non-2xx status codes
        console.error('Error:', response.status);
      }
    } catch (error) {
      alert(""+error.response.data.message);
    }
  };

  const [Meetings,SetAppointments] = useState([]);
  
  const [B,SetB] = useState(false);

  const getAppointments =  async () => {
    try {
      const response = await axios.get(`http://localhost:8000/viewFollowUpRequests?Id=${Id}`,{withCredentials:true});
      if(response.data.message) {
        SetB(true);
      }
      else
      {
        SetB(false);
        const meeting = response.data;
        SetAppointments(meeting);
      }
     
      console.log("dataa"+response.data);
    } catch (error) {
      alert('An error occurred:', error.message);
    }
}
  // const [message, setMessage] = useState('');

 
  async function handleAcceptRequest (id) {
    try {
      const response = await axios.post(`http://localhost:8000/acceptFollowUpRequest?appointmentId=${id}`
      ,{tm:"mohab"},{withCredentials:true});
      console.log('Cancellation successful:', response.data);
      console.log('Cancellation successful:', response.data);
      alert(""+response.data.message);
      getAppointments();
      return true; 
    } catch (error) {
      alert(""+error.response.data.message);
      return false; 
    }
  };
  async function handleRejectRequest (id) {
    try {
      const response = await axios.post(`http://localhost:8000/rejectFollowUpRequest?appointmentId=${id}`
      ,{tm:"mohab"},{withCredentials:true});
      console.log('Cancellation successful:', response.data);
      alert(""+response.data.message);
      getAppointments();
      return true; 
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert(""+error.response.data.message);
      return false; 
    }
  };

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
              El7a2ny Clinic Schedule FollowUp/Cancel and Reschedule Appointment/Add HealthRecord
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
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
            {/* <Title style={{ color: '#25A18E' , fontSize: 23}}>My Wallet amount</Title> */}
            
    <TextField
          type="date"
          variant="outlined"
          margin="normal"
          value={followUpDate}
          sx={{
            // marginBottom: '10px',
            marginLeft: 1,
            marginTop: 2,
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
            },
            '& .MuiSelect-icon': {
              color: '#25A18E', // Change dropdown arrow color
            },
            '&:hover': {
              backgroundColor: '#E5E5E5', // Change color on hover if desired
          },
          }}   
          onChange={(e) => setFollowUpDate(e.target.value)}
          />   
          <Button 
           variant="contained"
           margin="normal"
           padding="normal"
           sx={{
             marginTop: 2,
             marginLeft: 1,
             minWidth: 150,
             color: 'white',
             backgroundColor: '#25A18E',
             '&:hover': {
                 backgroundColor: '#20756c', // Change color on hover if desired
             },
             height: 55
             }} 
          onClick={scheduleFollowUp}>Schedule A Follow-Up</Button>
          <br />
          <Grid container spacing={3}>
          
      </Grid>
      <Grid container spacing={3} sx={{marginTop: 4, marginLeft: 20}}>
        {!B ?
        (
          <React.Fragment>
          <Title style={{ color: '#25A18E' , fontSize: 23}}>Request for Follow-Up</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Date</TableCell>
      
                </TableRow>
              </TableHead>
              <TableBody>
               
                  <TableRow
                  hover
                  sx={{
                      "&:hover":{
                      cursor: "pointer",
                      backgroundColor: "#0000FF",
                      width: "100%"
                      }
                  }}
                 
                  key={Meetings._id}
      
                  >
                    <TableCell style={{ textAlign: 'center'}}>{Meetings.followUpDate}</TableCell>
                    <TableCell align="center">
                      <Button 
                      variant="contained"
                      sx={{
                        color: 'white',
                        backgroundColor: '#25A18E',
                        '&:hover': {
                          backgroundColor: '#20756c',
                        },
                      }}    
                      onClick={() => handleAcceptRequest(Meetings._id)}>Accept Request</Button>
                    
                  </TableCell>   
                  <TableCell align="center">
                      <Button 
                      variant="contained"
                      sx={{
                        color: 'white',
                        backgroundColor: '#FF0000',
                        '&:hover': {
                          backgroundColor: '#8b0000',
                        },
                      }}    
                      onClick={() => handleRejectRequest(Meetings._id)}>Reject Request</Button>
                    
                  </TableCell>  
                    <TableCell align="center">
                    
                  </TableCell>   
                    </TableRow>
             
              </TableBody>
            </Table>
      
         
          </React.Fragment>
        ):<p1>No follow-up scheduled</p1>}
        
    
      </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


// import React, { useState } from 'react';

// const ScheduleFollowUp = () => {
  

//   return (
//     <div>
//       <h2>Schedule Follow-Up</h2>
//       <label>
//         Follow-Up Date:
//         <input
//           type="date"
//           value={followUpDate}
//           onChange={handleFollowUpDateChange}
//         />
//       </label>
//       <br />
//       <label>
//         Patient ID:
//         <input
//           type="text"
//           value={patientId}
//           onChange={handlePatientIdChange}
//         />
//       </label>
//       <br />
      
//     </div>
//   );
// };

// export default ScheduleFollowUp;
