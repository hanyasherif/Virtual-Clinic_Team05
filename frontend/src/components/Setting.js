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
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Title from './Title';
import TextField from "@mui/material/TextField";


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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Setting() {

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async (e) => {
    try {
      await fetch(`http://localhost:8000/logout`,{credentials: 'include'});
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const updateData = async () => {
    const Id = searchParams.get('Id')
    console.log("doctest email front: "+field1);
    console.log("doctest hr front: "+field2);
    console.log("doctest a front: "+field3);
    try {
     await axios.post(`http://localhost:8000/Edit?email=${field1}&hourlyRate=${field2}&affiliation=${field3}`,{tmp:""},{withCredentials:true});
     setSuccessMessage('Data updated successfully!');
    } catch (error) {
      alert('An error occurred:', error.message);
      setSuccessMessage('Try Again Later!');
    }
  };


  return (
    // <ThemeProvider theme={defaultTheme}>
    //   <Box sx={{ display: 'flex' }}>
    //     <CssBaseline />
    //     <AppBar position="absolute" open={open}>
    //       <Toolbar
    //         sx={{
    //           pr: '24px', // keep right padding when drawer closed
    //         }}
    //       >
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           aria-label="open drawer"
    //           onClick={toggleDrawer}
    //           sx={{
    //             marginRight: '36px',
    //             ...(open && { display: 'none' }),
    //           }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography
    //           component="h1"
    //           variant="h6"
    //           color="inherit"
    //           noWrap
    //           sx={{ flexGrow: 1 }}
    //         >
    //           El7a2ny Clinic Edit Doctor Profile Page
    //         </Typography>
    //         <Button color="inherit" onClick={handleLogout}>Logout</Button>
    //         <IconButton color="inherit">
    //           <Badge badgeContent={0} color="secondary">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton>
    //       </Toolbar>
    //     </AppBar>
    //     <Drawer variant="permanent" open={open}>
    //       <Toolbar
    //         sx={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'flex-end',
    //           px: [1],
    //         }}
    //       >
    //         <IconButton onClick={toggleDrawer}>
    //           <ChevronLeftIcon />
    //         </IconButton>
    //       </Toolbar>
    //       <Divider />
    //       <List component="nav">
    //         {mainListItems}
    //         <Divider sx={{ my: 1 }} />
    //         {secondaryListItems}
    //       </List>
    //     </Drawer>
    //     <Box
    //       component="main"
    //       sx={{
    //         backgroundColor: (theme) =>
    //           theme.palette.mode === 'light'
    //             ? theme.palette.grey[100]
    //             : theme.palette.grey[900],
    //         flexGrow: 1,
    //         height: '100vh',
    //         overflow: 'auto',
    //       }}
    //     >
    //       <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  <Grid container direction="column" alignItems="center">
    <Grid item xs={12} md={8} lg={9}
    sx={{
        '&:hover > div': {
          transform: 'scale(1.01)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}>
      {/* <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out',
          alignItems: 'center',
          borderRadius: 3,
          width: 890,
          marginLeft: -4.5,
          marginTop: 3,
        }}
      > */}
      <Title style={{ color: '#25A18E' , fontSize: 23, textAlign: 'center'}}>Edit Your Details</Title>
      
      <div className="container">
      {/* <h1>Hello Dr</h1> */}
      <TextField
          label="Change Email"
          variant="outlined"
          margin="normal"
          value={field1}
          sx={{
            marginBottom: '20px', // Adjust the margin as needed
            marginLeft: 1,
            minWidth: 180,
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
          onChange={(e) => setField1(e.target.value)}
        />
        <TextField
          label="Change HourlyRate"
          variant="outlined"
          margin="normal"
          value={field2}
          sx={{
            marginBottom: '20px', // Adjust the margin as needed
            marginLeft: 1,
            minWidth: 180,
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
          onChange={(e) => setField2(e.target.value)}
        />
      <TextField
          label="Change Affiliation"
          variant="outlined"
          margin="normal"
          value={field3}
          sx={{
            marginBottom: '20px', // Adjust the margin as needed
            marginLeft: 1,
            minWidth: 180,
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
          onChange={(e) => setField3(e.target.value)}
          />
      <Button variant="contained" 
      sx={{
        color: 'white',
        minWidth: 180,
        marginLeft: 1,
        marginTop: 2,
        height: 55,
        backgroundColor: '#25A18E',
        '&:hover': {
            backgroundColor: '#20756c', // Change color on hover if desired
        },
        }} 
      onClick={updateData}>Submit</Button>
      {successMessage && (
        <p style={{ color: 'green' }}>{successMessage}</p>
      )}
    </div>
      {/* </Paper> */}
    </Grid>
  </Grid>
  {/* <Copyright sx={{ pt: 4 }} /> */}
</Container>


    //     </Box>
    //   </Box>
    // </ThemeProvider>
  );
}


// import React, { useState } from 'react';
// import axios from 'axios';


// function Setting() {
  
//   return (
    
//   );
// }

// export default Setting;