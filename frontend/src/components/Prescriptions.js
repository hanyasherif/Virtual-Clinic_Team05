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
import { mainListItems, secondaryListItems } from './listItemsCl';
import Table from '@mui/material/Table';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Input, TextField } from '@mui/material';
import axios from 'axios';
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material';
// import { Box, Button, TextField, FormControl} from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#25A18E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

export default function Prescriptions () {

  const [prescriptions,setPrescriptions] = useState([]);
  const [docNames, setDocNames] = useState([]);
  const [filter,setFilter] = useState({name:'', date:'' , doctorId:''});
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');

  const getPrescriptions =  async (filterName, docName) => {
    if(filterName!="normal"){
      filter.name=filterName
    }
    console.log("heree"+filter.doctorId)
    await axios.get('http://localhost:3000/filterPrescription?username='+username+'&name='+filterName +"&date="+filter.date + "&doctorId="+filter.doctorId).then(
      (res) => { 
        const prescriptions = res.data
        console.log(prescriptions)
        setPrescriptions(prescriptions)
        for (let i = 0; i < prescriptions.length; i++) {
          if(!(docNames.includes(prescriptions[i].doctorName)))
          docNames.push(prescriptions[i].doctorName);
        }            
      }).catch (error=>{
        alert('An error occurred:', error.message);
         
      })
  }



  useEffect(() => {
    getPrescriptions("normal");
  }, []);
  

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
              Search & Filter Prescriptions Patient Page
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
            <Box sx={{marginBottom: 2}}>
             <Button variant="contained"
            onClick={() => getPrescriptions("date")}
            margin="normal"
            padding="normal"
            sx={{
              color: 'white',
              marginLeft: 18,
              marginTop: 2,
              minWidth: 100,
              height: 55,
              backgroundColor: '#25A18E',
              '&:hover': {
                  backgroundColor: '#20756c', // Change color on hover if desired
              },
              }}
            >
              Search By:
            </Button>
        <TextField
          type="date"
          variant="outlined"
          required
          margin="normal"
          value={filter.date}
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
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          />

          <Button variant="contained"
            onClick={() => getPrescriptions("doctor")}
            margin="normal"
            padding="normal"
            sx={{
              color: 'white',
              marginLeft: 2,
              marginTop: 2,
              minWidth: 100,
              height: 55,
              backgroundColor: '#25A18E',
              '&:hover': {
                  backgroundColor: '#20756c', // Change color on hover if desired
              },
              }}
            >
              Filter By:
            </Button> 


    <FormControl sx={{  minWidth: 200 }}>
      <InputLabel id="status-label" sx={{marginTop: 2, marginLeft: 1,}} >
        Doctor Name
      </InputLabel>
      <Select
      label="Filter By Doctor's Name"
      variant="outlined"
      margin="normal"
      label-Id = "status-label"
      value={filter.doctorId}
      sx={{
        // marginBottom: '10px',
        // minWidth: 180,
        marginLeft: 1,
        marginTop: 2,
        '& .MuiOutlinedInput-root': {
        },
        '& .MuiSelect-icon': {
          color: '#25A18E', // Change dropdown arrow color
        },
        '&:hover': {
          backgroundColor: '#E5E5E5', // Change color on hover if desired
      },
      }} 
      onChange={(e) => setFilter({ ...filter, doctorId: e.target.value })}
      >
        {/* <MenuItem value="">All Specialities</MenuItem> */}
          {docNames.map((docName) => (
            <MenuItem key={docName} value={docName}>
              {docName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>

    <FormControl sx={{  minWidth: 200 }}>
      <InputLabel id="status-label2" sx={{marginTop: 2, marginLeft: 1,}} >
        Prescription Status
      </InputLabel>
      <Select
      label="Prescription Status"
      variant="outlined"
      margin="normal"
      label-Id = "status-label2"
      value={filter.name}
      sx={{
        // marginBottom: '10px',
        // minWidth: 180,
        marginLeft: 1,
        marginTop: 2,
        '& .MuiOutlinedInput-root': {
        },
        '& .MuiSelect-icon': {
          color: '#25A18E', // Change dropdown arrow color
        },
        '&:hover': {
          backgroundColor: '#E5E5E5', // Change color on hover if desired
      },
      }} 
      onChange={(e) => getPrescriptions(e.target.value)}
      >
        <MenuItem value="filled">Filled</MenuItem>
        <MenuItem value="not filled">Not Filled</MenuItem>
      </Select>
    </FormControl>

            {/* <Button variant="contained"
            onClick={() => getPrescriptions("normal")}
            margin="normal"
            padding="normal"
            sx={{
              color: 'white',
              backgroundColor: '#25A18E',
              '&:hover': {
                  backgroundColor: '#20756c', // Change color on hover if desired
              },
              }} 
            >
              No filter
            </Button> */}
            </Box>
            <Box>

            
            </Box>
        <Typography sx={{marginBottom: 2, marginLeft: 2}}>
          Choose A Prescription To See its Details:
        </Typography>   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Doctor Name</StyledTableCell>
            {/* <StyledTableCell align="center">Patient</StyledTableCell> */}
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Medicine</StyledTableCell>
            <StyledTableCell align="center">Dosage</StyledTableCell>
     
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptions.map((prescription) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() =>window.location.href=`http://localhost:3000/SelectedPrescriptionP?prescriptionId=${prescription._id}`}
            key={prescription._id}
                 
              >
                {/* <PateintProfile/> */}
              <TableCell align="center">{prescription.date}</TableCell>
              <TableCell align="center">{prescription.doctorName}</TableCell>
              {/* <TableCell align="center">{prescription.patientName}</TableCell> */}
              <TableCell align="center">{prescription.filled? "Filled" : "Not Filled"}</TableCell>
              <TableCell align="center">{prescription.medicines}</TableCell>
              <TableCell align="center">{prescription.dosage.join(', ')}</TableCell>
 

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>            
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>    
    </ThemeProvider>
  );
}






// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));
// const { useState , useEffect } = require("react");


// const Prescriptions = () => { 

    // const getDoctorName = async (doctorId) => {
    //     try {
    //       const response = await axios.get(`http://localhost:8000/getDoctorName/${doctorId}`);
    //       if (response.data && response.data.name) {
    //         return response.data.name;
    //       } else {
    //         return 'Unknown Doctor';
    //       }
    //     } catch (error) {
    //       console.error('Error fetching doctor name:', error);
    //       return 'Unknown Doctor';
    //     }
    //   };
    // //   const fetchDoctorNames = async () => {
    // //     try {
    // //       const doctorNames = {};
    // //       const appointments = await axios.get('http://localhost:8000/viewAppointments');
    // //       if (appointments.data) {
    // //         for (const appointment of appointments.data) {
    // //           const doctorId = appointment.doctor;
    // //           if (!doctorNames[doctorId]) {
    // //             const doctorName = await getDoctorName(doctorId);
    // //             doctorNames[doctorId] = doctorName;
    // //           }
    // //         }
    // //       }
    // //       setDoctorNames(doctorNames);
    // //     } catch (error) {
    // //       console.error('Error fetching doctor names:', error);
    // //     }
    // //   };
    
    // //   useEffect(() => {
    // //     fetchDoctorNames();
    // //   }, []); 
    
//     return(

//         // visualize prescriptions in a table map over prescriptions
        
                

//     )
// }
// export default Prescriptions;

