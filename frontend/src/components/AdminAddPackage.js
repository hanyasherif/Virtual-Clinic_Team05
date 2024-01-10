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
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItemsAdCl';
import Button from "@mui/material/Button";
import { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function AdminAddPackage() {

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
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({ name: '', price: ''  , doctorDiscount : '' , pharmacyDiscount: '' , famMemDiscount:'' });
  const [deletePackageName, setDeletePackageName] = useState('');

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  useEffect(() => {
    // Fetch existing packages when the component mounts
    fetchPackages();
    // toggleDrawer();
  }, []);

  const fetchPackages = () => {
    axios.get('/packs') // Replace with your API endpoint
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
            alert('An error occurred:' + error.response.data.message);
      });
  };

  const createPackage = () => {
    axios.post('/admin/addPackage', newPackage) // Replace with your API endpoint
      .then(() => {
        setNewPackage({ name: '', price: '' });
        fetchPackages(); // Refresh the list of packages
      })
      .catch((error) => {
        alert('An error occurred:' + error.response.data.message);
      });
  };
  const params = new URLSearchParams(window.location.search);
  const Id = params.get('id');
  const updatePackage = (id, updatedPackage) => {
    axios.put(`/admin/updatePackage/?:id=${Id}`, updatedPackage) // Replace with your API endpoint
      .then(() => {
        fetchPackages(); // Refresh the list of packages
      })
      .catch((error) => {
        alert('An error occurred:' + error.response.data.message);
      });
  };
  const deletePackage = () => {
    axios.delete(`/admin/deletePackage?name=${deletePackageName}`) // Replace with your API endpoint
      .then(() => {
        fetchPackages(); // Refresh the list of packages
      })
      .catch((error) => {
        alert('An error occurred:' + error.response.data.message);
      });
  };

  
  const openUpdateModal = (packagea) => {
    setSelectedPackage(packagea);
    setShowUpdateModal(true);
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
              El7a2ny Clinic Admin Page
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
          
                <Box sx={{ backgroundColor: 'background.default', minHeight: '100%' }}>

                  <CssBaseline />

                  {/* <AppBar position="static" color="primary">
                    <Toolbar>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Package Management
                      </Typography>
                    </Toolbar>
                  </AppBar> */}

                  <Container  sx={{ mt: 4, marginLeft: 1 }}>

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h4" gutterBottom>
                        Create Package
                      </Typography>

                      <TextField
                        label="Package Name"
                        variant="outlined"
                        value={newPackage.name}
                        onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        label="Package Price"
                        variant="outlined"
                        value={newPackage.price}
                        onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        label="Package Doctor Discount"
                        variant="outlined"
                        value={newPackage.doctorDiscount}
                        onChange={(e) => setNewPackage({ ...newPackage, doctorDiscount: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        label="Package Pharmacy Discount"
                        variant="outlined"
                        value={newPackage.pharmacyDiscount}
                        onChange={(e) => setNewPackage({ ...newPackage, pharmacyDiscount: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        label="Package Family Member Discount"
                        variant="outlined"
                        value={newPackage.famMemDiscount}
                        onChange={(e) => setNewPackage({ ...newPackage, famMemDiscount: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={createPackage}
                        sx={{ mt: 2 }}
                      >
                        Create Package
                      </Button>

                    </Box>

                    <Box>
                      <Typography variant="h4" gutterBottom>
                        Existing Packages
                      </Typography>

                      <List>
                        {packages.map((packagew) => (
                          <ListItem key={packagew.id} secondaryAction={
                            <IconButton edge="end" onClick={() => openUpdateModal(packagew)}>
                              <EditIcon />
                            </IconButton>
                          }>
                            <ListItemText
                              primary={packagew.name}
                              secondary={`Price: $${packagew.price} - Doctor Discount: $${packagew.doctorDiscount} - Pharmacy Discount: $${packagew.pharmacyDiscount} - Family Member Discount: $${packagew.famMemDiscount}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h4" gutterBottom>
                        Delete Package
                      </Typography>

                      <TextField
                        label="Package Name to Delete"
                        variant="outlined"
                        value={deletePackageName}
                        onChange={(e) => setDeletePackageName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={deletePackage}
                        sx={{ mt: 2 }}
                      >
                        Delete Package
                      </Button>
                    </Box>

                  </Container>

                </Box>

             
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}



// function AdminAddPackage() {

//   return (

//   );
// }

// export default AdminAddPackage;
