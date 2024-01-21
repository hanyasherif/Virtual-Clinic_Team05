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
import { useEffect,useState } from 'react';
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

export default function ViewAcceptContract() {

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

    const [contract, setContract] = useState(null);
    const [t, setT] = useState('');

    useEffect(() => {
        fetchContract();
      }, []);

      const fetchContract = async () => {
        try {
            // Fetch the contract details from the backend
            const response = await axios.get(`http://localhost:8000/getContract`,{withCredentials:true}); // Replace with the actual endpoint
            setContract(response.data);
            setT(response.data.termsAndConditions);
        } catch (error) {
            console.error('Error fetching contract details:', error);
        }
        
    };
    
     const handleAcceptContract = async () => {
         try {
             const response = await axios.put(`http://localhost:8000/acceptContract`,
             {},
             {
                 withCredentials: true,
             }); 
             fetchContract(); 
         } catch (error) {
             console.error('Error accepting contract:', error);
         }
     };
 
     const handleRejectContract = async () => {
         try {
             // Call the reject contract endpoint in the backend
             const response = await axios.put(`http://localhost:8000/rejectContract`,
             {},
             {
                 withCredentials: true,
             });
             fetchContract();
         } catch (error) {
             console.error('Error rejecting contract:', error);
             // Handle the error as needed
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
              El7a2ny Clinic View Contract Doctor Page
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
  <Grid container direction="column" alignItems="center">
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
    <Grid item xs={12} md={8} lg={9}
    sx={{
        '&:hover > div': {
          transform: 'scale(1.01)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out',
          alignItems: 'center',
          borderRadius: 3,
          width: 890,
          marginLeft: -4.5,
          marginTop: 3,
        }}
      >
        <Typography variant="h4" component="h2" sx={{ color: '#25A18E', marginBottom: 2 }}>
          Contract Details
        </Typography>
        <div style={{ textAlign: 'center' }}>
          <Typography component="p" variant="subtitle1">
            Terms and Conditions: {t ? t : 'N/A'}
          </Typography>
          <Typography component="p" variant="subtitle1">
            Markup: {contract && contract.markup ? contract.markup : 'N/A'}
          </Typography>
          <Typography component="p" variant="subtitle1">
            Status: {contract && contract.status ? contract.status : 'N/A'}
          </Typography>
        </div>
        {contract && contract.status !== 'Accepted' && contract.status !== 'Rejected' && (
          <div>
            <Button
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#25A18E',
                '&:hover': {
                  backgroundColor: '#20756c',
                },
                marginTop: 2,
              }}
              onClick={handleAcceptContract}
            >
              Accept Contract
            </Button>        
            <Button
              variant="contained"
              sx={{
                color: 'white',
                marginLeft: 2,
                backgroundColor: '#A81D24',
                '&:hover': {
                  backgroundColor: '#911A20',
                },
                marginTop: 2,
              }}
              onClick={handleRejectContract}
            >
              Reject Contract
            </Button>
          </div>
        )}
      </Paper>
    </Grid>
  </Grid>
  <Copyright sx={{ pt: 4 }} />
</Container>


        </Box>
      </Box>
    </ThemeProvider>
  );
}




// const ViewAcceptContract = () => {

    
       
//     return (
        
//     );
// };

// export default ViewAcceptContract;