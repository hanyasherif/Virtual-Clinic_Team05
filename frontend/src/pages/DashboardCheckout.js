import * as React from 'react';
// import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
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

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import CartPagePH from './CartPage';
import FilterMedicine from '../componenetsPh/FilterMedicine';
import Search from '../componenetsPh/Search';
import cart from '../assets/cart.jpg';
// import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'; // Import TextField here
import FormControlLabel from '@mui/material/FormControlLabel'; // Import FormControlLabel
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox
import Checkout from './Checkout';
import AddressForm from './AddressForm';





// // Placeholder for AddAddressForm
// const AddAddressForm = () => {
//   // Replace with your actual implementation
//   return (
//     <div>
//       <h3>Add Address Form</h3>
//       {/* Your add address form implementation here */}
//     </div>
//   );
// };

const AddAddressForm = ({ newAddress, handleInputChange }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      
    </React.Fragment>
  );
};



const AddressesList = () => {
    // Replace with your actual implementation
    return (
      <div>
        <h3>Add new Address</h3>
        <AddressForm/>
      </div>
    );
  };

  
// Placeholder for ExpandLessIcon and ExpandMoreIcon
const ExpandLessIcon = ({ onClick }) => {
    return (
      <IconButton onClick={onClick} aria-label="expand-less">
        <ExpandLess />
      </IconButton>
    );
  };

  const ExpandMoreIcon = ({ onClick }) => {
    return (
      <IconButton onClick={onClick} aria-label="expand-more">
        <ExpandMore />
      </IconButton>
    );
  };

  // Placeholder for PaymentMethodDropdown
const PaymentMethodDropdown = () => {
    // Replace with your actual implementation
    return (
      <div>
        <h3>Select Payment Method</h3>
        {/* Your dropdown implementation here */}
      </div>
    );
  };
  


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
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

// ... (imports)

// ... (imports)

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [showAddAddressForm, setShowAddAddressForm] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleAddAddressForm = () => {
    setShowAddAddressForm(!showAddAddressForm);
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
              Check Out!
            </Typography>
            <Link to="/CartPage" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                id="cartImage"
                src={cart}
                alt="Cart Image"
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              />
            </Link>
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
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1, display: 'flex' }}>
            <Grid container spacing={3}>
              {/* Grid 1 - Drop-down list for payment method */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Checkout />
                </Paper>
              </Grid>
              {/* Grid 2 - Addresses (Toggle Add Address Form) */}
             
            </Grid>
          </Container>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
