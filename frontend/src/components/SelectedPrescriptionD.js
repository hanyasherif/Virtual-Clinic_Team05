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
 import { useEffect, useState } from "react";
 import axios from "axios";
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
 import {
 

  Select,
  MenuItem,
  InputLabel,
  TextField,
 
} from '@mui/material';
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

export default function SelectedPrescriptionD() {

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

  const params = new URLSearchParams(window.location.search);
  const prescriptionId = params.get('prescriptionId');
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedicineIndex, setSelectedMedicineIndex] = useState(0);
  const [modifiedDosage, setModifiedDosage] = useState('');
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    toggleDrawer();


    fetchPrescriptionData();

  }, [prescriptionId]);
  const fetchPrescriptionData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/getPrescription?Id=${prescriptionId}`, { withCredentials: true });
      const presData = response.data;
      console.log("pres"+presData);
      setPrescription(presData);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleMedicineChange = (index) => {
    setSelectedMedicineIndex(index);
  };

  const handleDosageChange = (e) => {
    setModifiedDosage(e.target.value);
  };
  const handleMedicineChange2 = (e) => {
    setMedicine(e.target.value);
  };
  
  const handleDosageChange2 = (e) => { 
    setDosage(e.target.value);
  };
  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const handleUpdate = async () => {
    try {
        console.log("thiss"  , selectedMedicineIndex);

      await axios.post(`http://localhost:8000/modifyDosage/${prescriptionId}`, {
      index: selectedMedicineIndex,
      modifiedDosage,
      }, { withCredentials: true });
     alert('Dosage Updated successfully');

      // Refresh prescription data after the update
    //  fetchPrescriptionData();
    } catch (error) {
      console.log('Error updating prescription:', error.message);
    }
  };
  

  
  const handleDeleteMedicine = async () => {
    try {
        console.log("thiss"  , selectedMedicineIndex);

      await axios.post(`http://localhost:8000/deleteMedicine/${prescriptionId}`, {
      index: selectedMedicineIndex,
      }, { withCredentials: true });
      alert('Medicine Deleted successfully');

      // Refresh prescription data after the update
      fetchPrescriptionData();
    } catch (error) {
      console.log('Error updating prescription:', error.message);
    }
  };
  const handleUpdateInstruction = async () => {
    try {
      await axios.post(`http://localhost:8000/modifyInstruction/${prescriptionId}`, {
        instruction,
      }, { withCredentials: true });

      // Refresh prescription data after the update
      fetchPrescriptionData();
      alert('Instruction Updated successfully');
    } catch (error) {
      console.log('Error updating prescription instruction:', error.message);
    }
  };
  const handleAddMedicine = async ()  => { 
    try {
        console.log("thiss"  , selectedMedicineIndex);

      await axios.post(`http://localhost:8000/addMedicine/${prescriptionId}`, {
      medicine,
      dosage,
      }, { withCredentials: true });
      alert('Medicine Added successfully');

      // Refresh prescription data after the update
      fetchPrescriptionData();
    } catch (error) {
      console.log('Error updating prescription:', error.message);
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
   {!loading &&(<Box>
  
    <CssBaseline />

<AppBar position="static" color="primary">
  <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Prescription
    </Typography>
  </Toolbar>
</AppBar>


      {prescription ? (
        <Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Date: {prescription.date}</Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Doctor Name: {prescription.doctorName}</Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Patient Name: {prescription.patientName}</Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Status: {prescription.filled ? "Filled" : "Not Filled"}</Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Instruction: {prescription.instruction}</Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Medicines:
            <Select
              value={selectedMedicineIndex}
              onChange={(e) => handleMedicineChange(e.target.value)}
            >
              {prescription.medicines.map((medicine, index) => (
                <MenuItem key={index} value={index}>
                  {medicine}
                </MenuItem>
              ))}
            </Select>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Modify Dosage:
            <TextField
              type="text"
              value={modifiedDosage}
              onChange={handleDosageChange}
            />
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button variant="contained" onClick={handleUpdate}
              sx={{
                color: 'white',
                marginBottom: 2,
                backgroundColor: '#25A18E',
                '&:hover': {
                    backgroundColor: '#20756c', // Change color on hover if desired
                },
                }} >Modify Dosage</Button>
          </Typography>
          <br />
          <Button variant="contained" onClick={handleDeleteMedicine}
            sx={{
              color: 'white',
              marginBottom: 2,
              backgroundColor: '#25A18E',
              '&:hover': {
                  backgroundColor: '#20756c', // Change color on hover if desired
              },
              }} >Delete Selected Medicine</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Update Instruction</Typography>
          <InputLabel htmlFor="instruction">Add Instruction:</InputLabel>
          <TextField
            type="text"
            id="instruction"
            name="instruction"
            value={instruction}
            onChange={handleInstructionChange}
            required
          />
          <br />
          <Button variant="contained" onClick={handleUpdateInstruction}
            sx={{
              color: 'white',
              marginBottom: 2,
              backgroundColor: '#25A18E',
              '&:hover': {
                  backgroundColor: '#20756c', // Change color on hover if desired
              },
              }} >Update Instruction</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Add More Medicines</Typography>
          <InputLabel htmlFor="medicine">Medicine:</InputLabel>
          <TextField
            type="text"
            id="medicine"
            name="medicine"
            value={medicine}
            onChange={handleMedicineChange2}
            required
          />
          <br />
          <InputLabel htmlFor="dosage">Dosage:</InputLabel>
          <TextField
            type="text"
            id="dosage"
            name="dosage"
            value={dosage}
            onChange={handleDosageChange2}
            required
          />
          <br />
          <Button variant="contained" onClick={handleAddMedicine}
            sx={{
              color: 'white',
              marginBottom: 2,
              backgroundColor: '#25A18E',
              '&:hover': {
                  backgroundColor: '#20756c', // Change color on hover if desired
              },
              }} >Add Medicine</Button>
        </Box>
      ) : (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >No prescription found.</Typography>
      )}
    </Box>)}
     
      
   
    
  
    
  </Grid>
  <Copyright sx={{ pt: 4 }} />
</Container>

        </Box>
      </Box>
    </ThemeProvider>
  );
}




// const SelectedPrescriptionD = () => {

//   return (

//   );
// };

// export default SelectedPrescriptionD;
