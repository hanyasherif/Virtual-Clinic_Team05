import * as React from 'react';
 import axios from "axios";
 import "../Chat.css";
import io from "socket.io-client";
import Chat from "../components/Chat";
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

const defaultTheme = createTheme();
 const socket = io.connect("http://localhost:8000");

export default function ChatPage() {
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


const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [partner, setPartner] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = async () => {
      const response =  await axios.get('/getRoom', { params: {partner:partner} });
      const data=response.data;
      setRoom(data._id)
      socket.emit("join_room", data._id);
      console.log(socket)
      setShowChat(true);
    
  };
useEffect(() => {
  const id = localStorage.getItem('partner');
  console.log(id)
  setPartner(id)
}, []);

  return (
    // <ThemeProvider theme={defaultTheme}>
    //    <Box sx={{ display: 'flex' }}>
    //     <CssBaseline />
    //     <AppBar position="absolute" open={open}>
    //       <Toolbar
    //         sx={{
    //           pr: '24px', // keep right padding when drawer closed
    //         }}
    //       >
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           aria-label="open drawer"
    //           onClick={toggleDrawer}
    //           sx={{
    //             marginRight: '36px',
    //             ...(open && { display: 'none' }),
    //           }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography
    //           component="h1"
    //           variant="h6"
    //           color="inherit"
    //           noWrap
    //           sx={{ flexGrow: 1 }}
    //         >
    //           El7a2ny Clinic Patient Page
    //         </Typography>
    //         <Button color="inherit" onClick={handleLogout}>Logout</Button>
    //         <IconButton color="inherit">
    //           <Badge badgeContent={0} color="secondary">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton>
    //       </Toolbar>
    //     </AppBar>
    //     <Drawer variant="permanent" open={open}>
    //       <Toolbar
    //         sx={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'flex-end',
    //           px: [1],
    //         }}
    //       >
    //         <IconButton onClick={toggleDrawer}>
    //           <ChevronLeftIcon />
    //         </IconButton>
    //       </Toolbar>
    //       <Divider />
    //       <List component="nav">
    //         {mainListItems}
    //         <Divider sx={{ my: 1 }} />
    //         {secondaryListItems}
    //       </List>
    //     </Drawer>

        <div className="Chat">
          <button onClick={goBack} className="back-button">
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Start Chat</h3>
           
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} partner={partner} room={room} />
      )}
    </div>

    // </Box>
     

    // </ThemeProvider>
  );


}







// import axios from "axios"


// export default ChatPage;