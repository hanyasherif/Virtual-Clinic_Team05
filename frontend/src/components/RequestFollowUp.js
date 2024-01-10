/////////// reserve for myselffff session
import React, { useEffect, useState } from "react";
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItemsCl';
import Button from "@mui/material/Button";
import ViewDocPat from './ViewDocPat';
import Wallet from './Wallet';
import ViewFamilyMember from './ViewFamilyMember';
import PatPrescView from './PatPrescView';
import ViewHealthRecords from './ViewHealthRecords';
import ViewPackages from './ViewPackages';
import ViewMyPackage from './ViewMyPackage'
import axios from "axios";

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
const specificButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.5em',
  color: '#333', /* Adjust the color as needed */
  padding: '0.2em',
};
const defaultTheme = createTheme();
export default function RequestFollowUp  () {
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
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const containerStyle = {
    textAlign: 'center',
  };

  const headerStyle = {
    backgroundColor: 'cyan',
    padding: '10px',
    width: '100%', // Take full width
    margin: '0',
    boxSizing: 'border-box', // Include padding in the width
  };

  const labelStyle = {
    marginTop: '20px',
    display: 'block',
    fontSize: '1.5em', // Increase font size (adjust as needed)

  };

  const inputStyle = {
    marginTop: '10px',
    padding: '5px',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px',
    marginBottom: '20px', 
    backgroundColor: 'lightblue',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px', 
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromQuery = urlParams.get('id');
    setAppointmentId(idFromQuery);
  }, []);

  const handleSubmit = async () => {
    try {
        console.log("what"+selectedDate)
      const response = await axios.post(
        `http://localhost:8000/requestFollowUp?appointmentId=${appointmentId}&newDate=${selectedDate}`,
        { tm: 'mohab' },
        { withCredentials: true }
      );
      console.log('Rescheduled successful:', response.data);
      alert('Request Sent Successfully');
      window.location.href = 'http://localhost:3000/FilterAppointmentsPatient';
    } catch (error) {
      console.error('Reschedule failed:', error);
      alert('Request Failed');
    }
  };

  const handleDateChange = (event) => {
    console.log("what2"+event.target.value)
    setSelectedDate(event.target.value);
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
    <div style={containerStyle}>
    <label htmlFor="dateInput" style={labelStyle}>Enter Date:</label>
    <input
      type="date"
      id="dateInput"
      value={selectedDate}
      onChange={handleDateChange}
      style={inputStyle}
    />
    <br /> {/* Line break for space */}
    <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
  </div>
  </Box>
  </Box>
  </ThemeProvider>
);
};

