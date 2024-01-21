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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItemsDoc';
import Button from "@mui/material/Button";
import UsersList from './UsersList';
import Meeting from './Appointments';
import ViewHealthRecords from './ViewHealthRecords';
import WalletDoc from './WalletDoc';
import AddAppointment from './AddAppointments';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
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
const buttonStyle = {
  backgroundColor: '#0074d9',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  display: 'block', // Make the button a block-level element
  margin: '0 auto', // Center the button horizontally
};

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  alignItems: 'center',
  justifyItems: 'center',
  maxWidth: '400px',
  margin: '0 auto',
  background: '#fff',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  
};
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
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const specificButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.5em',
  color: '#333', /* Adjust the color as needed */
  padding: '0.2em',
};
export default function UserProfile() {

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
const [Patient, setPatient] = useState(); 
const PatientId = searchParams.get('Patient');
  const Id = searchParams.get('Id');
 


      useEffect(() => {
       
        const getPatient = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/getUserById/${PatientId}`);
            setPatient(response.data);
          } catch (error) {
            console.error('Error fetching patients:', error.message);
            
          }
        };
        console.log("My Patientt" , Patient);
        getPatient();
      }, []); 

const chat= async() =>{
      localStorage.setItem('partner', searchParams.get('Patient'));
      window.location.href='http://localhost:3000/ChatPage'
}

const Videochat= async() =>{
  localStorage.setItem('partner', searchParams.get('Patient'));
  window.location.href='http://localhost:3000/VideoChatPage'
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
    {Patient && (
    
        <div className="profile-info">
          
          
        <ProfileContainer elevation={3} sx={{ width: '200%' , height: '100%' }}>
        <Typography variant="h4" gutterBottom sx={{marginTop: 1}}>
          Patient {Patient.username}
          </Typography>
          <Divider />
          <ProfileDetail sx={{marginTop: 2}}>
          <strong>Email: </strong> {Patient.email}
          </ProfileDetail>
          <ProfileDetail>
          <strong>Date Of Birth:</strong> {Patient.dateOfBirth}
        </ProfileDetail>
        <ProfileDetail>
          <strong>Gender:</strong> {Patient.gender}
        </ProfileDetail>
        <ProfileDetail>
          <strong>Emergency Contact Fullname:</strong> {Patient.emergencyContactFullname}
        </ProfileDetail>
        <ProfileDetail>
          <strong>Emergency Contact MobileNumber:</strong> {Patient.emergencyContactMobileNumber}
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
        </div>
        
          
     
)}
  </Grid>
  <Copyright sx={{ pt: 4 }} />
</Container>

        </Box>
      </Box>
    </ThemeProvider>
  );
}







