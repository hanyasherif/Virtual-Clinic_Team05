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
import { mainListItems, secondaryListItems } from '../pages/listItemsPharmacist';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/Logo.png';

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
const defaultTheme = createTheme();

export default function DoctorsList() {

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

  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSpeciality, setSearchSpeciality] = useState("");
  const [specs, setSpecs] = useState([]);
  const [filterSpec, setFilterSpec] = useState(""); // New state variable for selected speciality
  const [selectedDateTime, setSelectedDateTime] = useState('');
  

  useEffect(() => {
    getDoctors();
    phgetDoctors();
    getSpec();
  }, []);

  const getSpec = async () => {
    axios.get(`http://localhost:8000/getSpecs`, { withCredentials: true})
      .then((res) => {
        const spec = res.data;
        setSpecs(spec);
      });
  }

  const getDoctors = async () => {
    // Make a request to your backend API to fetch doctors based on search criteria
    axios.get(`http://localhost:8000/viewDoctors`, {
      withCredentials: true
      } )
      .then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
  };

  const phgetDoctors = async () => {
    // Make a request to your backend API to fetch doctors based on search criteria
    axios.get(`http://localhost:8000/pharmacistviewDoctors`, {
      withCredentials: true
      } )
      .then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
  };

  const searchDoctors = async () => {
    // Make a request to your backend API to fetch doctors based on search criteria
    if (searchName !== "" && searchSpeciality === "") {
        axios
          .get(`http://localhost:8000/searchByName`, {
            params: {
              name: searchName,
            },withCredentials: true
          })
          .then((res) => {
            const doctors = res.data;
            setDoctors(doctors);
          });
      }
    else if(searchName ==="" && searchSpeciality !== ""){
        axios.get(`http://localhost:8000/searchBySpec`, {
        params: {
            speciality: searchSpeciality,
        },withCredentials: true
      }).then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
    }
    else
        if(searchName !=="" && searchSpeciality !== ""){
            axios.get(`http://localhost:8000/searchByNameSpec`, {
        params: {
          name: searchName,
          speciality: searchSpeciality,
        },withCredentials: true
      }).then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
        }
    };

  const filterDocs  = async () => {
    if(filterSpec !== "" && selectedDateTime ===""){
        filterSpecs(filterSpec); // Call the new function for searching by name and speciality
    }
    else if(filterSpec === "" && selectedDateTime !== ""){
        filterDate(selectedDateTime);
    }
    else if(filterSpec !== "" && selectedDateTime !== ""){
        axios.get(`http://localhost:8000/filterDateSpecs`, {
        params: {
          date: selectedDateTime+':00.000+00:00',
          spec: filterSpec,
        },withCredentials: true
      }).then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
        console.log(doctors);
      });
    }
  };

  const filterDate = async (date) => {
    console.log("DAATTEEE");
    console.log(date);
    await axios.get(`http://localhost:8000/filterDate/${date+':00.000+00:00'}`,{withCredentials: true})
    .then((res) => {
      const s = res.data;
      setDoctors(s);
    //   console.log(doctors);
    });
  };

  const filterSpecs = async (spec) => {
    await axios.get(`http://localhost:8000/filterSpecs/${spec}`,{withCredentials: true})
      .then((res) => {
        const s = res.data;
        setDoctors(s);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
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
              <img src={Logo} alt="Logo" width="50" height="50" />
              

              </Typography>
            {/* Cart Button */}
            {/* <Link to="/CartPage" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                id="cartImage"
                src={cart}
                alt="Cart Image"
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              />
            </Link> */}
            {/* cart button here!!!! */}

            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
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

    <div className="DoctorsList">
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
      <Box sx={{ marginBottom: 2, marginLeft: 7}}>
    
        <FormControl sx={{  minWidth: 200 }}>
    </FormControl>

        <Typography>
          Choose A Doctor To Chat/Video Chat With:
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Speciality</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                  },
                }}
                onClick={() => window.location.href = `/docProfile?doctorId=${doctor._id}`}
                key={doctor._id}
              >
                <TableCell align="center">{doctor.name}</TableCell>
                <TableCell align="center">{doctor.email}</TableCell>
                <TableCell align="center">{doctor.docSpeciality}</TableCell>
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

// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import Table from "@mui/material/Table";
// import Box from "@mui/material/Box";
// import { styled } from "@mui/material/styles";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";



// const DoctorsList = () => {
  
  
//   return (
    
//   );

// }
// export default DoctorsList;
