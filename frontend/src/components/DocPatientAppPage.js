import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
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
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItemsDoc';
import Button from "@mui/material/Button";
import DocAppointmentList from './DocAppointmentList';
import Meeting from './Appointments';
import ViewHealthRecords from './ViewHealthRecords';
import WalletDoc from './WalletDoc';
import AddAppointment from './AddAppointments';
import Setting from './Setting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useLocation } from 'react-router-dom';

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
const specificButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.5em',
  color: '#333', /* Adjust the color as needed */
  padding: '0.2em',
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
//   backgroundColor: '#004E64', // New background color
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

export default function DoctorPatientAppPage() {
 
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
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const Id = searchParams.get('Id');
const [Meetings,SetAppointments] = useState([]);
const [healthRecord,setHealthRecord] = useState("");
    const getAppointments =  async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getDoctorAppointmentWithPatient?patientId=${Id}`,{withCredentials:true});
        const meeting = response.data;
        console.log("Meeting"+meeting[0].patient.username);
        SetAppointments(meeting);
      } catch (error) {
        alert('An error occurred:', error.message);
      }
  }
  useEffect(() => {
    getAppointments();
  }, []); 

  const handleLogout = async (e) => {
    try {
      await fetch(`http://localhost:8000/logout`,{credentials: 'include'});
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleAddHealthRecord = async () => {
    try {
      const response = await fetch('http://localhost:8000/AddNewHR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PatientId: Id,
          HealthRecord: healthRecord,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          alert("Health Record Added");
        }
      } else {
        // Handle non-2xx status codes
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  async function handleCancel (id) {
    try {
      const response = await axios.post(`http://localhost:8000/CancelAppointment?appointmentId=${id}`
      ,{tm:"mohab"},{withCredentials:true});
      console.log('Cancellation successful:', response.data);
      alert("Cancellation Successed");
      getAppointments();
      return true; 
    } catch (error) {
      console.error('Cancellation failed:', error);
      return false; 
    }
  };
  async function handleRes(id){
    window.location.href = `/RescheduleDoctor?id=${id}`;
  };
  async function handleRequestFollowUp(id){
    window.location.href = `/Schedule?Id=${id}&patientId=${Id}`;
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
              El7a2ny Clinic Doctor Page
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
    {/* Grid for WalletDoc and ViewHealthRecords */}
    <Grid item xs={12} md={4} lg={3}>
      <Grid container direction="column" spacing={3}>
      
      <Grid item
        sx={{
          '&:hover > div': {
            transform: 'scale(1.01)',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
        > 
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out',
              borderRadius: 3,
              width: 890,
              marginLeft: -4.5,
            }}
          >
           <React.Fragment>
    <Title style={{ color: '#25A18E' , fontSize: 23}}>My Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Date</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Patient Username</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Status</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Price</TableCell>
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
              <TableCell style={{ textAlign: 'center'}}>{meet.date}</TableCell>
              <TableCell style={{ textAlign: 'center'}}>
                {meet.patient && meet.patient.username ? meet.patient.username : 'No username'}
              </TableCell>
              <TableCell style={{ textAlign: 'center'}}>{meet.status}</TableCell>
              <TableCell style={{ textAlign: 'center'}}>{meet.price}</TableCell>         
              <TableCell align="center">
              {meet.status === 'Upcoming' || meet.status === 'Rescheduled' ? (
                <Button
                variant="contained"
                sx={{
                  color: 'white',
                  // marginLeft: 2,
                  backgroundColor: '#A81D24',
                  '&:hover': {
                    backgroundColor: '#911A20',
                  },
                }}
                onClick={() => handleCancel(meet._id)}>Cancel</Button>
              ) : null}
            </TableCell>
            <TableCell align="center">
              {meet.status === 'Upcoming' || meet.status === 'Rescheduled' ? (
                <Button 
                variant="contained"
                sx={{
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                    backgroundColor: '#20756c',
                  },
                }}       
                onClick={() => handleRes(meet._id)}>Reschedule</Button>
              ) : null}
              {meet.status === 'Completed' ? (
                <Button 
                variant="contained"
                sx={{
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                    backgroundColor: '#20756c',
                  },
                }}    
                onClick={() => handleRequestFollowUp(meet._id)}> View and Schedule FollowUp Requests</Button>
              ) : null}
            </TableCell>   
              </TableRow>
          ))}
        </TableBody>
      </Table>

   
    </React.Fragment>
                
          </Paper>
        </Grid>
        
      </Grid>
      
    </Grid>
    <TextField
                        label="Health record to add"
                        variant="outlined"
                        value={healthRecord}
                        onChange={(e) => setHealthRecord(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddHealthRecord}
                        sx={{
                            color: 'white',
                            backgroundColor: '#25A18E',
                            '&:hover': {
                              backgroundColor: '#20756c',
                            },
                          }}       
                      >
                       Add Health Record
                      </Button>
    {/* Grid for UsersList and Meeting */}
    
  </Grid>
  <Copyright sx={{ pt: 4 }} />
</Container>

        </Box>
      </Box>
    </ThemeProvider>
  );
}


