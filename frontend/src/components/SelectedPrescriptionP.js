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
import { mainListItems, secondaryListItems } from '../components/listItemsCl';
import Table from '@mui/material/Table';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Input } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'left',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
}));

const ProfileDetail = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ActionButtonsContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(2),
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
  // backgroundColor: '#004E64', // New background color
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

const defaultTheme = createTheme();



 
export default function SelectedPrescriptionP () {
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
 

  const params = new URLSearchParams(window.location.search);
  const prescriptionId = params.get('prescriptionId');
  const [prescription,setPrescription] = useState('');

  //paying
  const [cardNumber,setcardNumber] = useState('');
  const [expiryDate,setexpiryDate] = useState('');
  const [CVV,setCVV] = useState('');

  const [showCreditCardTextBox, setShowCreditCardTextBox] = useState(false);
  const [showWalletTextBox, setShowWalletTextBox] = useState(false);
  const [walletInfo, setWalletInfo] = useState('');

  const [amount, setAmount] = useState('');

  const [isPriceVisible, setIsPriceVisible] = useState(false);

  
const [error, setError] = useState('');



//const id = '65735cebad66db980718a14d'; // session

useEffect(() => {
  
  const fetchPrescriptionData = async () => {
        await axios.get(`http://localhost:8000/getPrescription?Id=${prescriptionId}`,{withCredentials:true}).then((res) => { 
          const presData = res.data
          setPrescription(presData);
          // console.log(doctor)
        }).catch(err=>{
          console.log(err.message)
         });
  };
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

 
  fetchPrescriptionData();
  fetchWalletInfo(prescription.patient)
 
    
  }, [prescriptionId]);

//////Paying
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
  console.log("Wallet Infoaadd:", walletInfo);
  setShowWalletTextBox(true);
  setShowCreditCardTextBox(false); // Hide Credit Card text box if it's currently shown
  
};
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
      if(walletInfo < amount){
      alert('You do not have enough money in the wallet to pay');
      return;
      }
      else{
         modifyPatientWallet(amount);

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


  const handleDownloadPDF = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/generatePdf/${prescriptionId}`, {
          responseType: 'blob',  // Set the response type to 'blob' to handle binary data
          withCredentials: true,
        });
  
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: 'application/pdf' });
  
        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'prescription.pdf';
        document.body.appendChild(link);
        link.click();
  
        // Remove the temporary link element
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading prescription PDF:', error.message);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="appointment-profile">
        <h1>My Prescription</h1>
      <p>Date: {prescription.date}</p>
      <p>Doctor Name: {prescription.doctorName}</p> 
      <p>Patient Name: {prescription.patientName}</p> 
      <p>Medicines: {prescription.medicines}</p> 
      <p>Dosage: {prescription.dosage}</p> 
      <p>Status: {prescription.filled? "Filled" : "Not Filled"}</p>
      <br />
      <h3>Pay For Prescription</h3>
      <Button id="creditCard" onClick={handleCreditCardButtonClick}
       sx={{
        color: 'white',
        backgroundColor: '#25A18E',
        '&:hover': {
            backgroundColor: '#20756c', // Change color on hover if desired
        },
        }} 
      >
      Credit Card
    </Button>
    <form >
    <Button 
  onClick={handleWalletButtonClick}
  sx={{
    color: 'white',
    backgroundColor: '#25A18E',
    '&:hover': {
      backgroundColor: '#20756c', // Change color on hover if desired
    },
  }} 
>
  Wallet
</Button>

    </form>



    {showCreditCardTextBox && (
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Card number
          <input type="text" value={cardNumber} onChange={handleCardNumber} />
        </label>
        <br />
        <label>
          Expiry date
          <input type="text" value={expiryDate} onChange={handleExpiryDate} />
        </label>
        <br />
        <label>
          Security code(CVV)
          <input type="text" value={CVV} onChange={handleCVV} />
        </label>
        <br />

        <Button 
         sx={{      
          color: 'white',
                  backgroundColor: '#25A18E',
                  '&:hover': {
                      backgroundColor: '#20756c', // Change color on hover if desired
                  },
                  }} 
                  type="submit">
        Pay</Button>
      </form>
    )}

    {showWalletTextBox && (
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Wallet Info
          <input type="text" value={walletInfo} readOnly />
        </label>
        <br />

        <Button 
        type="submit"
        sx={{
          color: 'white',
          backgroundColor: '#25A18E',
          '&:hover': {
              backgroundColor: '#20756c', // Change color on hover if desired
          },
          }} >Pay
        
        </Button>
      </form>
    )}
    <br/>
    <Button onClick={handleDownloadPDF}
     sx={{
      color: 'white',
      backgroundColor: '#25A18E',
      '&:hover': {
          backgroundColor: '#20756c', // Change color on hover if desired
      },
      }} 
    >Download as Pdf
    
    </Button>
                <br/>
                
     
     
    
  </div>

    </Box>
    </Box>
     

    </ThemeProvider>
  );


}













// import React, { useEffect, useState } from "react";
// import axios from "axios";

//   return (
//     <div className="appointment-profile">
//         <h1>My Prescription</h1>
//       <p>Date: {prescription.date}</p>
//       <p>Doctor Name: {prescription.doctorName}</p> 
//       <p>Patient Name: {prescription.patientName}</p> 
//       <p>Medicines: {prescription.medicines}</p> 
//       <p>Dosage: {prescription.dosage}</p> 
//       <p>Status: {prescription.filled? "Filled" : "Not Filled"}</p>
//       <br />
//       <h3>Pay For Prescription</h3>
//       <button id="creditCard" onClick={handleCreditCardButtonClick}>
//       Credit Card
//     </button>
//     <button id="wallet" onClick={handleWalletButtonClick}>
//       Wallet
//     </button>

//     {showCreditCardTextBox && (
//       <form onSubmit={handlePaymentSubmit}>
//         <label>
//           Card number
//           <input type="text" value={cardNumber} onChange={handleCardNumber} />
//         </label>
//         <br />
//         <label>
//           Expiry date
//           <input type="text" value={expiryDate} onChange={handleExpiryDate} />
//         </label>
//         <br />
//         <label>
//           Security code(CVV)
//           <input type="text" value={CVV} onChange={handleCVV} />
//         </label>
//         <br />

//         <button type="submit">Pay</button>
//       </form>
//     )}

//     {showWalletTextBox && (
//       <form onSubmit={handlePaymentSubmit}>
//         <label>
//           Wallet Info
//           <input type="text" value={walletInfo} readOnly />
//         </label>
//         <br />

//         <button type="submit">Pay</button>
//       </form>
//     )}
//     <br/>
//     <button onClick={handleDownloadPDF}>Download as Pdf</button>
//                 <br/>
                
     
     
    
//   </div>
//   );
//   }


  
//   export default SelectedPrescriptionP;