import * as React from 'react';
import { useHistory } from 'react-router-dom';
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
import { mainListItems, secondaryListItems } from './listItems';
import axios from 'axios';
import Table from '@mui/material/Table';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { Box, Button, TextField, FormControl} from '@mui/material';
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
    backgroundColor: "#25A18E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
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

export default function FilterAppointmentsPatient() {

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
 

  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [doctorNames, setDoctorNames] = useState({});
  const [appointment,setAppointment] = useState([]);
  
  const handleStatusChange = (e) => {
      setStatus(e.target.value);
      getAppointmentStatus(e.target.value);
    };

  useEffect(() => {
    getAppointment();
  }, []); 

    const getAppointment = async () => {
      await axios.get('http://localhost:8000/viewAppointments', { withCredentials: 'true' }).then(
        (res) => {
          const appointments = res.data.Appointments;
          const docNames = res.data.doctorNames;
          const doctorMap = {};
          for (let i = 0; i < docNames.length; i++) {
            const doctorId = appointments[i].doctor;
            const doctorName = docNames[i];
            doctorMap[doctorId] = doctorName;
          }
          setAppointment(appointments);
          setDoctorNames(doctorMap);
        }
      );
    };
    
    const dateChange = async (d) => {
      setDate(d);
      getAppointmentDate(d);
    }
    

  const getAppointmentDate=  async (date) => {
    if (!date) {
      alert('Please enter a valid Date');
      return;
    }
    await axios.get(`http://localhost:8000/filterAppointmentsDate/${date}`, {withCredentials: 'true'}).then(
      (res) => { 
        const appointments = res.data.Appointments;
        const docNames = res.data.doctorNames;
        const doctorMap = {};
        for (let i = 0; i < docNames.length; i++) {
          const doctorId = appointments[i].doctor;
          const doctorName = docNames[i];
          doctorMap[doctorId] = doctorName;
        }
        setAppointment(appointments);
        setDoctorNames(doctorMap);       
        }
      );
    }

  const getAppointmentStatus=  async (status) => {   
    if (!status) {
      alert('Please enter a valid status');
      return;
    }
    await axios.get(`http://localhost:8000/filterAppointmentsStatus/${status}`, {withCredentials: 'true'}).then(
        (res) => { 
          const appointments = res.data.Appointments;
          const docNames = res.data.doctorNames;
          const doctorMap = {};
          for (let i = 0; i < docNames.length; i++) {
            const doctorId = appointments[i].doctor;
            const doctorName = docNames[i];
            doctorMap[doctorId] = doctorName;
          }
          setAppointment(appointments);
          setDoctorNames(doctorMap);
        }
         );
    }
    async function handleCancel (id) {
      try {
        const response = await axios.post(`http://localhost:8000/CancelAppointment?appointmentId=${id}`
        ,{tm:"mohab"},{withCredentials:true});
        console.log('Cancellation successful:', response.data);
        alert("Cancellation Successed");
        return true; 
      } catch (error) {
        console.error('Cancellation failed:', error);
        return false; 
      }
    };
    async function handleRes(id){
      window.location.href = `/ReschedulePatient?id=${id}`;
    };
    async function handleRequestFollowUp(id){
      window.location.href = `/RequestFollowUp?id=${id}`;
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
              <Grid item xs={12}>         
                <Box sx={{ marginBottom: 2 }}>
                  <Typography
                  // component="h3"
                  // variant="h6"
                  // color="inherit"
                  // noWrap
                  // sx={{ flexGrow: 1 }}
                  >
                    Filter By:
                  </Typography>
                <FormControl sx={{  minWidth: 200 , marginRight: 2, marginLeft: 0, marginTop: 2}}>
      <InputLabel id="status-label" >
        {/* <FilterListIcon sx={{marginRight:1.5}}/> */}
         Status
      </InputLabel>
      <Select
        label = "Status"
        // labelId="status-label"
        id="status-select"
        value={status}
        sx={{
          // marginBottom: '10px',
          '& .MuiOutlinedInput-root': {
          },
          '& .MuiSelect-icon': {
            color: '#25A18E', // Change dropdown arrow color
          },
          '&:hover': {
            backgroundColor: '#E5E5E5', // Change color on hover if desired
        },
        }} 
        onChange={handleStatusChange}
      >
        <MenuItem value="Upcoming">Upcoming</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
        <MenuItem value="Rescheduled">Rescheduled</MenuItem>
      </Select>
    </FormControl>

        <TextField
          type="date"
          variant="outlined"
          margin="normal"
          value={date}
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
          onChange={(e) => dateChange(e.target.value)}
          />                
              </Box>
            </Grid>

  <Grid >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Doctor</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Cancel Appointment</StyledTableCell>
            <StyledTableCell align="center">Reschedule Appointment</StyledTableCell>
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
           
            key={Appointment._id}
              >             
              <TableCell align="center">{Appointment.date}</TableCell>
              <TableCell align="center">{doctorNames[Appointment.doctor]}</TableCell>
              <TableCell align="center">{Appointment.status}</TableCell>
              <TableCell align="center">
              {Appointment.status === 'Upcoming' || Appointment.status === 'Rescheduled' ? (
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
                onClick={() => handleCancel(Appointment._id)}>Cancel</Button>
              ) : null}
            </TableCell>
            <TableCell align="center">
              {Appointment.status === 'Upcoming' || Appointment.status === 'Rescheduled' ? (
                <Button 
                variant="contained"
                sx={{
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                    backgroundColor: '#20756c',
                  },
                }}       
                onClick={() => handleRes(Appointment._id)}>Reschedule</Button>
              ) : null}
              {Appointment.status === 'Completed' ? (
                <Button 
                variant="contained"
                sx={{
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                    backgroundColor: '#20756c',
                  },
                }}    
                onClick={() => handleRequestFollowUp(Appointment._id)}>Request Follow Up</Button>
              ) : null}
            </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
            </Grid>
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