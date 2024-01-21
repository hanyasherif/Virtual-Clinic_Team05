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
import { mainListItems, secondaryListItems } from './listItemsAdCl';
import { Box, Button, Input } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

let email='';

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ChangePassAdmin() {

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

  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleConfirmedPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const handleSetNewPassword = async() => {
    if (newPassword.trim() !== '' &&  newPassword === confirmedPassword ) {
      try {
        const res = await axios.post(`http://localhost:8000/ChangePassword`, {
        currentPassword:currentPassword,
        password: newPassword},{withCredentials:true});
        alert("Password Changed");
        window.location.href='/';
      } catch (error) {
        console.log("ero"+error.response.data.error);
          alert("TryAgain Later:"+error.response.data.error);
        }
    } else {
      alert('Passwords do not match');
    }
  };

  // useEffect(() => {    
  //   toggleDrawer();
  //  }, []);

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
              Change Password Admin Page
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
            <div>
        <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              
              sx={{ flexGrow: 1, marginTop: 10, marginLeft: 61.5 }}
            >
              Change Password
        </Typography>

        <TextField
          label="Enter Current Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={currentPassword}
          // placeholder="Enter Current Password"

          sx={{
            // marginBottom: '20px', // Adjust the margin as needed
            marginLeft: 61.5,
            minWidth: 205,
            marginTop: 4,
            // height: 20,
            '& .MuiInputLabel-shrink': {
              color: '#25A18E', // Change label color while shrinking (on input)
            },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#25A18E', // Change border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#25A18E', // Change border color on focus
              },
            },
          }}    
          onChange={handleCurrentPasswordChange}
        />

          {/* <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder="Enter Current Password"
          /> */}
          {/* <h2 style={{marginLeft: 5}}>Set New Password</h2> */}

        {/* <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, marginTop: 3, marginLeft: 1 }}
            >
              Set New Password
        </Typography> */}
        <br/>

          <TextField
          label="Enter New Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={newPassword}
          // placeholder="Enter New Password"

          sx={{
            // marginBottom: '20px', // Adjust the margin as needed
            marginLeft: 61.5,
            minWidth: 205,
            // height: 20,
            '& .MuiInputLabel-shrink': {
              color: '#25A18E', // Change label color while shrinking (on input)
            },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#25A18E', // Change border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#25A18E', // Change border color on focus
              },
            },
          }}    
          onChange={handleNewPasswordChange}
        />
        <br/>
        <TextField
          label="Confirm New Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={confirmedPassword}
          // placeholder="Confirm New Password"

          sx={{
            // marginBottom: '20px', // Adjust the margin as needed
            marginLeft: 61.5,
            minWidth: 205,
            // height: 20,
            '& .MuiInputLabel-shrink': {
              color: '#25A18E', // Change label color while shrinking (on input)
            },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#25A18E', // Change border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#25A18E', // Change border color on focus
              },
            },
          }}    
          onChange={handleConfirmedPasswordChange}
        />
        <br/>
          <Button
            sx={{
              marginTop: 2,
              marginLeft: 61.5,
              minWidth: 205,
              color: 'white',
              backgroundColor: '#25A18E',
              '&:hover': {
                  backgroundColor: '#20756c', // Change color on hover if desired
              },
              height: 55
              }} 
          onClick={handleSetNewPassword}>Save</Button>
        </div>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}