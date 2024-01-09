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
import { mainListItems, secondaryListItems } from './listItemsDoc';
import Table from '@mui/material/Table';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Input } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TextField from "@mui/material/TextField";
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#25A18E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
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

export default function PatientInfo() {

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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Id = searchParams.get('Id')
      const [Patients,SetPatients] = useState([]);
      const [Name, setField3] = useState('');
      const getPatient =  async () => {
        // try {
           await axios.get(`http://localhost:8000/getC?Id=${Id}`,{withCredentials:true}).then((res)=>{
             const patients = res.data;
             console.log(patients)
             SetPatients(patients);
             
            }).catch (error=>{
             alert('An error occurred:', error.message);
  
           })}
  
           const searchPatient =  async () => {
            // try {
              console.log('Id:', Id);
      console.log('Name:', Name);
      
               await axios.get(`http://localhost:8000/SearchP?Id=${Id}&name=${Name}`,{withCredentials:true}).then((res)=>{
                 const patients = res.data;
                 SetPatients(patients);
                 
                }).catch (error=>{
                 alert('An error occurred:', error.message);
      
               })
              }
  
      useEffect(() => {
        getPatient();
      }, []); 
  

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
              El7a2ny Clinic Search Patients Doctor Page
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
          <Grid container spacing={3} justifyContent="center"> {/* Center align the content */}
          <div className="UsersList">
          <Box sx={{marginBottom: 2}}>
           <div className="left">
            <form>
             <input
                type="text"
                placeholder="Search "
                required
                 value={Name}
                onChange={(e) => setField3(e.target.value )}
             />
          </form>
           </div>
          </Box>
             
          <div className="UsersList">
         {/* <Title style={{ color: '#25A18E' , fontSize: 23}}>My Patient's List</Title> */}
    <TableContainer component={Paper} className='MiddleAPP'>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">username</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Patients.map((Patient) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() =>window.location.href=`http://localhost:3000/PatientProfile?Patient=${Patient._id}&&Id=${Id}`}
              key={Patient._id}
              >
              <TableCell align="center">{Patient.username}</TableCell>
              <TableCell align="center">{Patient.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </div>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// import axios from 'axios';
// import Button from '@mui/material/Button';
// import Table from '@mui/material/Table';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';  
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useLocation } from 'react-router-dom';
// // import React, { useState } from 'react';
// import Title from './Title';
// import{ useState,  useEffect} from 'react';


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#25A18E",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));



// const PatientInfo = () => {

//   return(
     
              

//   )
// }


// export default PatientInfo;