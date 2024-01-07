import * as React from 'react';
import { useState, useEffect } from "react";
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
import { mainListItems, secondaryListItems } from './listItems';
import Chart from '../pages/sp3/Chart';
import Deposits from '../pages/sp3/Deposits';
import Orders from '../pages/sp3/Orders';
import Button from "@mui/material/Button";
import ViewDocPat from './ViewDocPat';
import Wallet from './Wallet';
import ViewFamilyMember from './ViewFamilyMember';
import PatPrescView from './PatPrescView';
import ViewHealthRecords from './ViewHealthRecords';
import ViewPackages from './ViewPackages';
import ViewMyPackage from './ViewMyPackage'
import axios from 'axios';
// import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

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
  backgroundColor: '#004E64', // New background color
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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function FilterAppointmentsPatient() {

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

  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [doctorNames, setDoctorNames] = useState({});
  const [appointment,setAppointment] = useState([]);
  
  const handleStatusChange = (e) => {
      setStatus(e.target.value);
    };
  //  console.log(userId);
  const getDoctorName = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:8000/getDoctorName/${doctorId}`, {
        withCredentials:'true'
      });
      if (response.data && response.data.name) {
        return response.data.name;
      } else {
        return 'Unknown Doctor';
      }
    } catch (error) {
      console.error('Error fetching doctor name:', error);
      return 'Unknown Doctor';
    }
  };
  const fetchDoctorNames = async () => {
    try {
      const doctorNames = {};
      const appointments = await axios.get('http://localhost:8000/viewAppointments',{withCredentials: 'true'});
      if (appointments.data) {
        for (const appointment of appointments.data) {
          const doctorId = appointment.doctor;
          if (!doctorNames[doctorId]) {
            const doctorName = await getDoctorName(doctorId);
            doctorNames[doctorId] = doctorName;
          }
        }
      }
      setDoctorNames(doctorNames);
    } catch (error) {
      console.error('Error fetching doctor names:', error);
    }
  };

  useEffect(() => {
    // fetchDoctorNames();
    // getAppointment();
  }, []); 

    const getAppointment=  async () => {

      await axios.get('http://localhost:8000/viewAppointments', {withCredentials: 'true'}).then(
         (res) => { 
            const appointments = res.data.Appointments;
            const docNames = res.data.doctorNames;
            console.log("HHEERREE"+appointments[0].doctor);
            setAppointment(appointments);
            setDoctorNames(docNames);
          }
      );
    }
    const getAppointmentDate=  async (date) => {
      /*
      get the blogs from the backend  
      */     
      if (!date) {
        alert('Please enter a valid Date');
        return;
      }

      await axios.get(`http://localhost:8000/filterAppointmentsDate/${date}`, {credentials: 'include'}).then(
          (res) => { 
              const appointments = res.data
              
              console.log(appointments)
              setAppointment(appointments)
              
          }
           );
  }

  const getAppointmentStatus=  async (status) => {
    /*
    get the blogs from the backend  
    */     
    if (!status) {
      alert('Please enter a valid status');
      return;
    }

    await axios.get(`http://localhost:8000/filterAppointmentsStatus/${status}`, {credentials: 'include'}).then(
        (res) => { 
            const appointments = res.data
            
            console.log(appointments)
            setAppointment(appointments)
            
        }
         );
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
              Filter Appointments Patient Page
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
            <div className="FilterAppointment">
             <Box sx={{marginBottom: 2}}>
             
            <Button variant="contained"
            onClick={getAppointment}
            margin="normal"
            padding="normal"
            
            >Load Appointments 
            </Button>

             <input
             type="text"
             onChange={(e) => setDate(e.target.value)}
              value={date}/>
            <Button variant="contained"
            onClick={() => getAppointmentDate(date)}
            margin="normal"
            padding="normal"
            
            >Filter by Date</Button>
            <Button variant="contained"
            onClick={() => getAppointmentStatus(status)}
            margin="normal"
            padding="normal"
            >Filter by Status</Button>
            <label>
          <input
            type="radio"
            value="upcoming"
            checked={status === 'upcoming'}
            onChange={handleStatusChange}
          />
          Upcoming
        </label>
      <label>
          <input
            type="radio"
            value="completed"
            checked={status === 'completed'}
            onChange={handleStatusChange}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            value="cancelled"
            checked={status === 'cancelled'}
            onChange={handleStatusChange}
          />
          Cancelled
        </label>
        <label>
          <input
            type="radio"
            value="rescheduled"
            checked={status === 'rescheduled'}
            onChange={handleStatusChange}
          />
          Rescheduled
        </label>
            {/* margin */}
            </Box>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Doctor</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
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
            onClick={() => window.location.href = `/selectedAppointment?appointmentId=${Appointment._id}`}
            key={Appointment._id}

              >
                
              <TableCell align="center">{Appointment.date}</TableCell>
              <TableCell align="center">{doctorNames[Appointment.doctor]}</TableCell>
              <TableCell align="center">{Appointment.status}</TableCell>
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






  
//     return(      
        
   

//     )
// }
// export default FilterAppointmentsPatient;