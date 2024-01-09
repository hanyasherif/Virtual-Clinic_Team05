import * as React from 'react';
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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItemsDoc';
import { useState } from 'react';
import axios from 'axios';
import Title from './Title';
import { Box, Button, TextField } from '@mui/material';

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

export default function AddAppointment() {

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

  const [date, setDate] = useState('');

    const handleAddAppointment = async () => {
        try {
            // Make sure to replace 'http://localhost:8000/createAppointment' with the actual endpoint
            const response = await axios.post(`http://localhost:8000/createAppointment`, {
                date: date,
            },{withCredentials:true});

            // Handle the response as needed
            console.log(response.data);

            // Optionally, you can reset the date after a successful submission
            setDate('');
        } catch (error) {
            // Handle errors
            console.error('Error adding appointment:', error);
        }
    };

  return (
<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} justifyContent="center"> {/* Center align the content */}
          <div className="DoctorsList">

          <Grid item xs={12} >
          <Title style={{ color: '#25A18E' , fontSize: 23, marginLeft: 6.5}}>Choose Free Slot</Title>
          </Grid>
          <div>
          <TextField
          type="date"
          variant="outlined"
          margin="normal"
          value={date}
          sx={{
            // marginBottom: '10px',
            marginLeft: 1,
            marginTop: 1,
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
            },
            '& .MuiSelect-icon': {
              color: '#25A18E', // Change dropdown arrow color
            },
            '&:hover': {
              backgroundColor: '#E5E5E5', // Change color on hover if desired
          },
          }}   
          onChange={(e) => setDate(e.target.value)}
          />
            <Button variant="contained" 
            sx={{
                color: 'white',
                marginLeft: 1,
                marginTop: 2,
                minWidth: 150,
                height: 55,
                backgroundColor: '#25A18E',
                '&:hover': {
                    backgroundColor: '#20756c', // Change color on hover if desired
                },
                }} 
            onClick={handleAddAppointment}>Add Appointment</Button>
        {/* <button onClick={handleAddAppointment}>Add Appointment</button> */}
        </div>
  </div>
            </Grid>
          </Container>

  );
}

// const AddAppointment = () => {
    

//     return (
        
//     );
// };

// export default AddAppointment;
