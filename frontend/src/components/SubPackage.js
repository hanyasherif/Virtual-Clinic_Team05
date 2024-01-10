/////////// reserve for myselffff session
import React, { useEffect, useState } from "react";
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
import { mainListItems, secondaryListItems } from './listItemsCl';
import Button from "@mui/material/Button";
import ViewDocPat from './ViewDocPat';
import Wallet from './Wallet';
import ViewFamilyMember from './ViewFamilyMember';
import PatPrescView from './PatPrescView';
import ViewHealthRecords from './ViewHealthRecords';
import ViewPackages from './ViewPackages';
import ViewMyPackage from './ViewMyPackage'
import axios from "axios";
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

export default function SubPackage () {
 
    const params = new URLSearchParams(window.location.search);
    const packageName = params.get('name');
  
    const [cardNumber,setcardNumber] = useState('');
    const [expiryDate,setexpiryDate] = useState('');
    const [CVV,setCVV] = useState('');
    const [error, setError] = useState('');
    const [showCreditCardTextBox, setShowCreditCardTextBox] = useState(false);
    const [showWalletTextBox, setShowWalletTextBox] = useState(false);
    const [walletInfo, setWalletInfo] = useState('');
  const [appointment, setAppointment] = useState({});
 // const[patientId, setPatientId] = useState([]);
 const [amount, setAmount] = useState('');
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
 
  //const id = '65735cebad66db980718a14d'; // session
  
  useEffect(() => {
    const fetchWalletInfo = async (id) => {
        try {
          const response = await axios.get(`http://localhost:8000/getUserByTokenId`,{withCredentials:true});
          const user = response.data;
          setWalletInfo(user.walletInfo);
          console.log("Wallet Infoaa:", walletInfo);
        } catch (error) {
          setError('No Wallet assigned');
        }
      };
   
    const fetchPackageData = async () => {
          await axios.get(`http://localhost:8000/viewPackage?name=${packageName}`,{withCredentials:true}).then((res) => { 
            const appData = res.data
            setAppointment(appData)
            // console.log(doctor)
          }).catch(err=>{
            console.log(err.message)
           });
    };
  
    const fetchAmount = async () => {

        await axios.get(`http://localhost:8000/viewPackage?name=${packageName}`,{withCredentials:true}).then((res) => { 
            const appData = res.data
            setAmount(appData.price)
            // console.log(doctor)
          }).catch(err=>{
            alert(err.message)
           });
      };
      fetchPackageData();
      fetchAmount();
      fetchWalletInfo();
     console.log(appointment)
     console.log(amount)
    }, [packageName]);
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        
        if (showCreditCardTextBox){
        if(!cardNumber || !expiryDate || !CVV){
          alert('Please fill in all the credit card fields.');
          return;
        }
        else{//pay with credit card $ stripe

        }
    }//pay with wallet
    else
        console.log("testo"+walletInfo);
        console.log("BEBO"+appointment.price);
        if(walletInfo < amount){
        alert('You do not have enough money in the wallet to pay');
        return;
        }
        else{
          
            axios.post('/subPackage?packageName='+packageName)
                 .then((response) => {
                 alert("Package Added Successfully");
                 modifyPatientWallet(amount);
          
          

        
        
        
        window.location.href = '/patient';

             })
            .catch((error) => {
     
                alert('An error occurred:'+error.response.data.message);
       });
          
           
                
    } 
           
    }
    const modifyPatientWallet = async (price,  id) =>{
        try {
            const response = await axios.post(`http://localhost:8000/modifyWallet`, {price  },{withCredentials:true});
        
            console.log(response.data.message);
            setWalletInfo(walletInfo-price);
        } catch (error) {
          console.error('Error updating PAtient wallet:', error);
        }
     
    };
    const handleCardNumber = (e) => {
        setcardNumber(e.target.value);
      };
      const handleExpiryDate = (e) => {
        setexpiryDate(e.target.value);
      };
      const handleCVV = (e) => {
        setCVV(e.target.value);
      };
      const handleCreditCardButtonClick = () => {
        setShowCreditCardTextBox(true);
        setShowWalletTextBox(false); // Hide Wallet text box if it's currently shown
      };
    
      const handleWalletButtonClick = () => {
        
        setShowWalletTextBox(true);
        setShowCreditCardTextBox(false); // Hide Credit Card text box if it's currently shown
        
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
              El7a2ny Clinic Patient Page
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div className="reserve-page" style={{ maxWidth: '600px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Subscribe Package</h1>
            <p>Package Name: {appointment.name}</p>
            
    
            {/* <Button
              variant="contained"
              sx={{
                marginLeft: 20,
                color: 'white',
                backgroundColor: '#25A18E',
                '&:hover': {
                    backgroundColor: '#20756c', // Change color on hover if desired
                },
                }} 
              onClick={handleViewPriceClick}
              
            >
              View Price
            </Button> */}
            
              <>
                <label>Price:</label>
                
                <input
                  type="text"
                  value={amount}
                  readOnly
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
              </>
              <div style={{ marginTop: '20px' }}>
              <label>Pay With:</label>
              <br />
              <Button
                id="creditCard"
                onClick={handleCreditCardButtonClick}
                sx={{
                  marginTop: -5,
                  marginLeft: 15,
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                      backgroundColor: '#20756c', // Change color on hover if desired
                  },
                  }} 
              >
                Credit Card
              </Button>
              <Button
                id="wallet"
                onClick={handleWalletButtonClick}
                sx={{
                  marginTop: -5,
                  marginLeft: 1,
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                      backgroundColor: '#20756c', // Change color on hover if desired
                  },
                  }} 
              >
                Wallet
              </Button>
              
              {showCreditCardTextBox && (
          <form onSubmit={handlePaymentSubmit} style={{ marginTop: '20px' }}>
            <label>
              Card number
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumber}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </label>
            <br />
            <label>
              Expiry date
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryDate}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </label>
            <br />
            <label>
              Security code(CVV)
              <input
                type="text"
                value={CVV}
                onChange={handleCVV}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </label>
            <br />
            <Button
                type="submit"
                // onClick={handleWalletButtonClick}
                sx={{
                  marginTop: -5,
                  marginLeft: 23,
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                      backgroundColor: '#20756c', // Change color on hover if desired
                  },
                  }} 
              >
                Pay
              </Button>
            {/* <button
              type="submit"
              style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}
            >
              Pay
            </button> */}
          </form>
        )}

        {showWalletTextBox && (
          <form onSubmit={handlePaymentSubmit} style={{ marginTop: '20px' }}>
            <label>
              Wallet Info
              <input
                type="text"
                value={walletInfo}
                readOnly
                style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </label>
            <br />
            <Button
                type="submit"
                // onClick={handleWalletButtonClick}
                sx={{
                  marginTop: -5,
                  marginLeft: 23,
                  color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                      backgroundColor: '#20756c', // Change color on hover if desired
                  },
                  }} 
              >
                Pay
              </Button>
            {/* <button
              type="submit"
              style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}
            >
              Pay
            </button> */}
          </form>
        )}
    
    
           
    </div>
      </div>
      
    </Box>
    <Copyright sx={{ pt: 4 }} />
    </Box>
    
    </Box>
  </ThemeProvider>
);
                         
      }

    