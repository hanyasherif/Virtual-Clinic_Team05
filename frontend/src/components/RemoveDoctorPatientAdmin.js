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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#111111",
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

export default function RemoveDoctorPatientAdmin() {

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

  const [users,setUsers] = useState([]);
    
  const getUsers =  async () => {
       await axios.get('http://localhost:8000/getAllUsers',{withCredentials:true}).then((res) => { 
          const usersList = res.data
          console.log(users)
          setUsers(usersList)
      }
       ).catch(err=>{
        console.log(err.message)
       });
  }

  const removeUser = async (userId) => {
      try {
        // Make a DELETE request to your backend API to remove the user
        const response = await fetch(`/removeUser?userID=${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },credentials:'include'
        });
    
        if (response.ok) {
          // If the request is successful, update the user list by filtering out the removed user
          setUsers(users.filter(user => user._id !== userId));
          alert("User removed successfully");
        } else {
          console.error('Failed to remove user');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert("User removed successfully");
      }
    };

  useEffect(() => {    
    getUsers();
  }, []);
 
  return (
    
                // <Container maxWidth="lg">
                //   <Box sx={{ my: 4 }}>
                //     <Grid container spacing={3}>
                      
                //       <Grid item xs={12}>
                //         <Paper sx={{ p: 2 }}>
                          <div className="UsersList">

            <Title style={{ color: 'black' , fontSize: 25}}>Users List</Title>
            <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Username</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Type</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((user) => (
                                    <TableRow
                                      hover
                                      sx={{
                                        "&:hover": {
                                          cursor: "pointer",
                                          backgroundColor: "#f5f5f5",
                                          width: "100%",
                                        },
                                      }}
                                      key={user._id}
                                    >
                                      <TableCell align="center">{user.username}</TableCell>
                                      <TableCell align="center">{user.type}</TableCell>
                                      <TableCell align="center">
                                        <Button
                                          variant="contained"
                                          // color="secondary"
                                          sx={{
                                            color: 'white',
                                            backgroundColor: '#A81D24',
                                            '&:hover': {
                                                backgroundColor: '#911A20', // Change color on hover if desired
                                            },
                                            }}
                                          onClick={() => removeUser(user._id)}
                                        >
                                          Remove
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
        </TableBody>
      </Table>
      {/* <Link style={{ color: '#25A18E' }} href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more family members
      </Link> */}
    </React.Fragment>

                            {/* <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell align="center">Username</StyledTableCell>
                                    <StyledTableCell align="center">Type</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell> 
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {users.map((user) => (
                                    <TableRow
                                      hover
                                      sx={{
                                        "&:hover": {
                                          cursor: "pointer",
                                          backgroundColor: "#f5f5f5",
                                          width: "100%",
                                        },
                                      }}
                                      key={user._id}
                                    >
                                      <TableCell align="center">{user.username}</TableCell>
                                      <TableCell align="center">{user.type}</TableCell>
                                      <TableCell align="center">
                                        <Button
                                          variant="contained"
                                          color="secondary"
                                          onClick={() => removeUser(user._id)}
                                        >
                                          Remove
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          
                //         </Paper>
                //       </Grid>
                //     </Grid>
                //   </Box>
                // </Container>
             */}
             </div> 
  );
}







// const RemoveDoctorPatientAdmin = () => { 


//     return(
//         // visualize authors in a table map over authors

//   );
// }

// // export default UsersList;
// export default RemoveDoctorPatientAdmin;