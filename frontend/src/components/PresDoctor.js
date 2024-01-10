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

export default function PresDoctor() {

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

  const [prescription, setPrescription] = useState([]);
  const [patientName, setPatientName] = useState([]);

  const getDoctorPrescriptions = async () => {
    await axios.get(`http://localhost:8000/getDoctorPresription`,{withCredentials:true}).then((res) => { 
      const presData = res.data
      console.log("prescription " ,presData );
      setPrescription(presData)
    //  fetchPatientNames(res.data.patient);
    //  console.log("patien iddd" ,res.data.patient );
    }).catch(err=>{
      console.log(err.message)
     });
    };
   
    useEffect(() => {
      getDoctorPrescriptions();
    },[]);


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
              El7a2ny Clinic View Priscriptions Page
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
          <div className="DoctorsList">

          <Grid item xs={12} sx={{marginTop: 2, marginBottom: 2}}>
            <Title style={{ color: 'black' , fontSize: 23, textAlign: 'center' }}>Choose A Priscription</Title>
          </Grid>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 1130 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Date</StyledTableCell>
          <StyledTableCell align="center">Patient Name</StyledTableCell>
          <StyledTableCell align="center">Medicines</StyledTableCell>
          <StyledTableCell align="center">Instructions</StyledTableCell>
          <StyledTableCell align="center">Status</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
            {prescription.map((Prescription) => (
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    width: "100%"
                  }
                }}
                onClick={() => window.location.href = `/SelectedPrescriptionD?prescriptionId=${Prescription._id}`}
                key={Prescription._id}
              >
            <TableCell align="center">{Prescription.date ? Prescription.date : 'No Date'}</TableCell>
            <TableCell align="center">{Prescription.patientName ? Prescription.patientName : 'No Patient Name'}</TableCell>
            <TableCell align="center">{Prescription.medicines && Prescription.medicines.length > 0 ? Prescription.medicines : 'No Medicines'}</TableCell>
            <TableCell align="center">{Prescription.instruction ? Prescription.instruction : 'No Instruction'}</TableCell>
            <TableCell align="center">{Prescription.filled ? 'Filled' : 'Not Filled'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


// import { useState, useEffect } from 'react';
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

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));


// const PresDoctor = () => {
  

  
  
  
 
  
//   return (
//     <div className="FilterAppointmentsByDoctor">
//       <Box sx={{ marginBottom: 2 }}>
       
//       </Box>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell align="center">Date</StyledTableCell>
//               <StyledTableCell align="center">Patient Name</StyledTableCell>
//               <StyledTableCell align="center">Medicines</StyledTableCell>
//               <StyledTableCell align="center">Instructions</StyledTableCell>
//               <StyledTableCell align="center">Status</StyledTableCell>
//             </TableRow>
//           </TableHead>
          // <TableBody>
          //   {prescription.map((Prescription) => (
          //     <TableRow
          //       hover
          //       sx={{
          //         "&:hover": {
          //           cursor: "pointer",
          //           backgroundColor: "#f5f5f5",
          //           width: "100%"
          //         }
          //       }}
          //       onClick={() => window.location.href = `/SelectedPrescriptionD?prescriptionId=${Prescription._id}`}
          //       key={Prescription._id}
          //     >
                // <TableCell align="center">{Prescription.date}</TableCell>
                // <TableCell align="center">{Prescription.patientName}</TableCell>
                // <TableCell align="center">{Prescription.medicines}</TableCell>
                // <TableCell align="center">{Prescription.instruction}</TableCell>
                // <TableCell align="center">{Prescription.filled? "Filled" : "Not Filled"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default PresDoctor;
