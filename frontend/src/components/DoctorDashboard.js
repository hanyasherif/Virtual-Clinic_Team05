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
import Setting from './Setting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
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

export default function DoctorDashboard() {

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
useEffect(() => {    
  // toggleDrawer();
  }, []);
  const handleLogout = async (e) => {
    try {
      await fetch(`http://localhost:8000/logout`,{credentials: 'include'});
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error('Error:', error);
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
            transform: 'scale(1.02)',
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
              width: 235,
            }}
          >
            <WalletDoc />
          </Paper>
        </Grid>
        <Grid item
        sx={{
          '&:hover > div': {
            transform: 'scale(1.02)',
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
              width: 235,
              marginTop: -1,
            }}
          >
            <ViewHealthRecords />
          </Paper>
        </Grid>
        <Grid item
        sx={{
          '&:hover > div': {
            transform: 'scale(1.02)',
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
              width: 235,
              marginTop: -1,
            }}
          >
            <AddAppointment />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
    
    {/* Grid for UsersList and Meeting */}
    <Grid item xs={12} md={8} lg={9}>
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
            <UsersList />
          </Paper>
        </Grid>
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
              marginTop: -1,
              marginLeft: -4.5,
            }}
          >
            <Meeting />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
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
              width: 1130,
              // marginLeft: -4.5,
              marginTop: -1,
              height: 190,
            }}
          >
            <Setting />
          </Paper>
        </Grid>
  </Grid>
  <Copyright sx={{ pt: 4 }} />
</Container>

        </Box>
      </Box>
    </ThemeProvider>
  );
}