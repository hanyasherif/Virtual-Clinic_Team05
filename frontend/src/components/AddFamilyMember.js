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
import { mainListItems, secondaryListItems } from './listItemsCl';
import Button from "@mui/material/Button";
import { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import Title from './Title';
import { TextField, FormControlLabel, Radio } from '@mui/material';
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

export default function AddFamilyMember () {

  const [famMemName, setfamMemName] = useState('');
  const [famMemNatID, setfamMemNatID] = useState('');
  const [famMemAge, setfamMemAge] = useState('');
  const [famMemGender, setfamMemGender] = useState('');
  const [famMemRelation, setfamMemRelation] = useState('');
  const [error, setError] = useState('');

  const [newFamMem, setNewFamMem] = useState(false);
  const [linkFamMem, setLinkFamMem] = useState(false);

  //linking
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  //wife/husband
 const [famMemName2, setfamMemName2] =  useState('');
 const [famMemNatID2, setfamMemNatID2] =  useState('');
 const [famMemAge2,setfamMemAge2] =  useState('');
 const [famMemGender2,setfamMemGender2] = useState('');
 const [famMemRelation2, setfamMemRelation2] = useState('');

  // const id = '65735cebad66db980718a14d';

  const handleGenderChange = (e) => {
    setfamMemGender(e.target.value);
  };
  const handleRelationChange = (e) => {
    setfamMemRelation(e.target.value);
  };
  const handleRelationChange2 = (e) => {
    setfamMemRelation2(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const FamilyMember = {famMemName, famMemNatID, famMemAge, famMemGender, famMemRelation };
    if (!famMemName || !famMemNatID || !famMemAge || !famMemGender || !famMemRelation) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/addFamilyMember`, {
        method: 'POST',
        body: JSON.stringify(FamilyMember),
        headers: {
         'Content-Type': 'application/json',
        },credentials:'include'
      });
      const json = await response.json();

      if(!response.ok){
        alert(json.message);
          return;
      }
      else{
        setfamMemName("");
        setfamMemNatID("");
        setfamMemAge("");
        setfamMemGender("");
        setfamMemRelation("");
        setError("");
        console.log(json.message);
        alert(json.message);
      }}
    catch (error) {
      console.error('Error:', error);
    }
  };
    
    const getUserName = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getUserByTokenId`,{withCredentials:true});
        if (response.data && response.data.username) {
          return response.data.username;
        } else {
          return 'Unknown User';
        }
      } catch (error) {
        console.error('Error fetching doctor name:', error);
        return 'Unknown USer';
      }
    };

    const handleSubmit2 = async (e) => {
      e.preventDefault();
      const params = new URLSearchParams(window.location.search);
      if(email !== ''){
       assignFamilyMemberValuesEmail(email);
       
      }
      else if(phoneNumber !== '')
      assignFamilyMemberValuesPhoneNumber(phoneNumber);
    else
    alert('Please insert email or phone');
      const FamilyMember = {famMemName: famMemName2 , famMemNatID: famMemNatID2, famMemAge:famMemAge2, famMemGender:famMemGender2 , famMemRelation: famMemRelation2, username};
      if (!famMemNatID2 ||!famMemGender2 || !famMemRelation2) {
        alert('Please fill in all fields.');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:8000/addFamilyMember`, {
          method: 'POST',
          body: JSON.stringify(FamilyMember),
          headers: {
           'Content-Type': 'application/json',
          },credentials:'include'
        });
        const json = await response.json();
  
        if(!response.ok){
          alert(json.message);
            return;
        }
        else{
          setEmail("");
          setPhoneNumber("");
          setfamMemNatID2("");
          setfamMemRelation2("");
          setError("");
          console.log(json.message);
          alert(json.message);
        }}
      catch (error) {
        console.error('Error:', error);
      }
  };
    
    const assignFamilyMemberValuesEmail = async (email) => {
      try {
        const response = await fetch(`/getUserByEmail/${email}`);
        
        if (!response.ok) {
          
          console.error('Failed to fetch user information');
          return;
        }
    
        const user = await response.json();
    
        // Extract user information and assign it to state variables
         
        setUsername(user.username);
        setfamMemName2(user.name); // Assuming 'name' is a property of the user object
        setfamMemGender2(user.gender); // Assuming 'gender' is a property of the user object
    
        // Calculate age based on date of birth
        if (user.dateOfBirth) {
          const birthDate = new Date(user.dateOfBirth);
          const currentDate = new Date();
          const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
          setfamMemAge2(age );
           
        } else {
          setfamMemAge('');
          
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    const assignFamilyMemberValuesPhoneNumber = async (phoneNumber) => {
      try {
        const response = await fetch(`/getUserByPhoneNumber/${phoneNumber}`);
        
        if (!response.ok) {
          
          console.error('Failed to fetch user information');
          return;
        }
    
        const user = await response.json();
    
        // Extract user information and assign it to state variables
        setUsername(user.username);
        setfamMemName2(user.name); // Assuming 'name' is a property of the user object
        setfamMemGender2(user.gender); // Assuming 'gender' is a property of the user object
    
        // Calculate age based on date of birth
        if (user.dateOfBirth) {
          const birthDate = new Date(user.dateOfBirth);
          const currentDate = new Date();
          const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
          setfamMemAge(age );
        } else {
          setfamMemAge('');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    const addFamilyMember = async () => {
      if(username){
      const FamilyMember = {username, famMemName,famMemNatID,famMemAge, famMemGender, famMemRelation};
      console.log("1st Family Member",FamilyMember);
  
      try {
        const response = await fetch(`http://localhost:8000/addFamilyMember`, {
          method: 'POST',
          body: JSON.stringify(FamilyMember),
          headers: {
            'Content-Type': 'application/json',
          },credentials:'include'
        });
        const json = await response.json();
        alert("FamilyMember created Successfully");
        setfamMemName("");
              setfamMemNatID("");
              setfamMemAge("");
              setfamMemGender("");
              setfamMemRelation("");
              setEmail("");
              setError("");
      } catch (error) {
        console.error('Error:', error);
      }
    }
    };  
    const fetchUser = async (email, phoneNumber) => {
      if(email){
      try {
        const response = await axios.get(`http://localhost:8000/getUserByEmail/${email}`,{withCredentials:true});
        
          const user = response.data;
          setUsername(user.username);
          setfamMemGender(user.gender);
          setfamMemName(user.name);
          if (user.dateOfBirth) {
            const birthDate = new Date(user.dateOfBirth);
            const currentDate = new Date();
            const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
            setfamMemAge(age );
             
          } else {
            setfamMemAge('');
            
          }
          const FamilyMember = {username, famMemName,famMemNatID,famMemAge, famMemGender, famMemRelation};
          console.log("beforee", FamilyMember);
        
      } catch (error) {
        alert('Email Not Found')
      }
    }
    else{
      try {
        const response = await axios.get(`http://localhost:8000/getUserByPhoneNumber/${phoneNumber}`,{withCredentials:true});
        
          const user = response.data;
          setUsername(user.username);
          setfamMemGender(user.gender);
          setfamMemName(user.name);
          if (user.dateOfBirth) {
            const birthDate = new Date(user.dateOfBirth);
            const currentDate = new Date();
            const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
            setfamMemAge(age );
             
          } else {
            setfamMemAge('');
            
          }
          const FamilyMember = {username, famMemName,famMemNatID,famMemAge, famMemGender, famMemRelation};
          console.log("bbbefore", FamilyMember);
        
      } catch (error) {
        alert('Phone Number Not Found')
      }

    }
    };

  useEffect(() => {   
  }, []);


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
              Add Family Member Patient Page
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
            <Grid item xs={12} md={4} lg={6}                
              sx={{
                '&:hover > div': {
                  transform: 'scale(1.01)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
          <Paper
           sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out',
              height: 570,
              borderRadius: 3,

            }}
          >

        {/* <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}> */}
            <Title style={{ color: '#25A18E', fontSize: 23, textAlign: 'center' }}>
              Add Family Member Details
            </Title>
            <br/>
            <TextField
              label="Name"
              type="text"
              value={famMemName}
              onChange={(e) => setfamMemName(e.target.value)}
              fullWidth
              sx={{
                marginBottom: '20px', // Adjust the margin as needed
                // '& .MuiInputLabel-root': {
                //   color: '#25A18E', // Change label color if necessary
                // },
                '& .MuiInputLabel-shrink': {
                  color: '#25A18E', // Change label color while shrinking (on input)
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#25A18E', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#25A18E', // Change border color on focus
                  },
                }
              }}      
            />
            <TextField
              label="Age"
              type="number"
              value={famMemAge}
              onChange={(e) => setfamMemAge(e.target.value)}
              fullWidth
              sx={{
                marginBottom: '20px', // Adjust the margin as needed
                // '& .MuiInputLabel-root': {
                //   color: '#25A18E', // Change label color if necessary
                // },
                '& .MuiInputLabel-shrink': {
                  color: '#25A18E', // Change label color while shrinking (on input)
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#25A18E', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#25A18E', // Change border color on focus
                  },
                }
              }}           
            />
            <TextField
             label="National ID"
              type="number"
              value={famMemNatID}
              onChange={(e) => setfamMemNatID(e.target.value)}
              fullWidth
              sx={{
                // marginBottom: '20px', // Adjust the margin as needed
                // '& .MuiInputLabel-root': {
                //   color: '#25A18E', // Change label color if necessary
                // },
                '& .MuiInputLabel-shrink': {
                  color: '#25A18E', // Change label color while shrinking (on input)
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#25A18E', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#25A18E', // Change border color on focus
                  },
                }
              }}            
            />
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> */}
          <Box component="main" sx={{marginTop: 2}}>
      <Typography>
        Gender:
      </Typography>
            <FormControlLabel
              control={
                <Radio
                  value="female"
                  checked={famMemGender === 'female'}
                  onChange={handleGenderChange}
                   sx={{
                     color: '#25A18E', // Adjust color as needed
                     '&.Mui-checked': {
                      color: '#25A18E', // Adjust color for checked state
                      },
                  }}
                />
              }
              label="Female"
              sx={{
                // color: '#25A18E', // Adjust label color if needed
                // marginBottom: '8px',
                // display: 'block',
             }}
            />
            <FormControlLabel
              control={
                <Radio
                  value="male"
                  checked={famMemGender === 'male'}
                  onChange={handleGenderChange}
                  sx={{
                    color: '#25A18E', // Adjust color as needed
                    '&.Mui-checked': {
                    color: '#25A18E', // Adjust color for checked state
                     },
                  }}
                />
              }
              label="Male"
              sx={{
              // color: '#25A18E', // Adjust label color if needed
              // marginBottom: '8px',
              // display: 'block',
              }}
            />
          </Box>
    <Box component="main" sx={{marginTop: 1}}>
      <Typography>
        Relation to you:
      </Typography>
      <FormControlLabel
        control={
          <Radio
            value="wife/husband"
            checked={famMemRelation === 'wife/husband'}
            onChange={handleRelationChange}
            sx={{
              color: '#25A18E', // Adjust color as needed
              '&.Mui-checked': {
               color: '#25A18E', // Adjust color for checked state
               },
           }}
          />
        }
        label="Wife/Husband"
      />
      {/* {famMemRelation === 'wife/husband' && (
        <TextField
          label="Please provide your Wife/Husband's National ID"
          type="number"
          value={famMemNatID2}
          onChange={(e) => setfamMemNatID2(e.target.value)}
          fullWidth
          sx={{
            marginBottom: '20px', // Adjust the margin as needed
            // '& .MuiInputLabel-root': {
            //   color: '#25A18E', // Change label color if necessary
            // },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#25A18E', // Change border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#25A18E', // Change border color on focus
              },
            }
          }}      
        />
      )}  */}
      <FormControlLabel
        control={
          <Radio
            value="child"
            checked={famMemRelation === 'child'}
            onChange={handleRelationChange}
            sx={{
              color: '#25A18E', // Adjust color as needed
              '&.Mui-checked': {
               color: '#25A18E', // Adjust color for checked state
               },
           }}
          />
        }
        label="Child"
      />
      </Box>
      <Button type="submit" variant="contained" color="primary" 
      style={{ 
        marginTop: 20, width: '50%' , marginLeft: 110
      }}
      sx={{
        color: 'white',
        backgroundColor: '#25A18E',
        '&:hover': {
            backgroundColor: '#20756c', // Change color on hover if desired
        },
        }}
        onClick={handleSubmit}>
        Add Family Member
      </Button>
    {/* </form> */}
    {error && <p>{error}</p>}  

          </Paper>
        </Grid>

              <Grid item xs={12} md={4} lg={6} 
                sx={{
                  '&:hover > div': {
                    transform: 'scale(1.01)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    height: 570,
                    borderRadius: 3,

                  }}
                >
            {error && <p>{error}</p>}
            {/* <form onSubmit={handleSubmit2} style={{ display: 'flex', flexDirection: 'column' }}> */}

            {/* <form onSubmit={handleSubmit2}> */}
            <Title style={{ color: '#25A18E', fontSize: 23, textAlign: 'center' }}>
            Link To An Existing Family Member
            </Title>
            <br/>
            <TextField
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                marginBottom: '20px', // Adjust the margin as needed
                // '& .MuiInputLabel-root': {
                //   color: '#25A18E', // Change label color if necessary
                // },
                '& .MuiInputLabel-shrink': {
                  color: '#25A18E', // Change label color while shrinking (on input)
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#25A18E', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#25A18E', // Change border color on focus
                  },
                }
              }}                  />
            <TextField
             label="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              sx={{
                marginBottom: '20px', // Adjust the margin as needed
                // '& .MuiInputLabel-root': {
                //   color: '#25A18E', // Change label color if necessary
                // },
                '& .MuiInputLabel-shrink': {
                  color: '#25A18E', // Change label color while shrinking (on input)
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#25A18E', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#25A18E', // Change border color on focus
                  },
                }
              }}      
            />
            <TextField
             label="National ID"
              type="number"
              value={famMemNatID2}
              onChange={(e) => setfamMemNatID2(e.target.value)}
              fullWidth
              sx={{
                marginBottom: '20px', // Adjust the margin as needed
                // '& .MuiInputLabel-root': {
                //   color: '#25A18E', // Change label color if necessary
                // },
                '& .MuiInputLabel-shrink': {
                  color: '#25A18E', // Change label color while shrinking (on input)
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#25A18E', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#25A18E', // Change border color on focus
                  },
                }
              }}      
            />
    <Box component="main">
      <Typography>
        Relation to you:
      </Typography>
      <FormControlLabel
        control={
          <Radio
            value="wife/husband"
            checked={famMemRelation2 === 'wife/husband'}
            onChange={handleRelationChange2}
            sx={{
              color: '#25A18E', // Adjust color as needed
              '&.Mui-checked': {
               color: '#25A18E', // Adjust color for checked state
               },
           }}
          />
        }
        label="Wife/Husband"
      />

      {/* {famMemRelation2 === 'wife/husband' && (
        <TextField
          label="Please provide your Wife/Husband's National ID"
          type="number"
          value={famMemNatID4}
          onChange={(e) => setfamMemNatID4(e.target.value)}
          fullWidth
          sx={{
            marginBottom: '20px', // Adjust the margin as needed
            // '& .MuiInputLabel-root': {
            //   color: '#25A18E', // Change label color if necessary
            // },
            '& .MuiInputLabel-shrink': {
              color: '#25A18E', // Change label color while shrinking (on input)
            },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#25A18E', // Change border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#25A18E', // Change border color on focus
              },
            }
          }}      
        />
      )}  */}
      <FormControlLabel
        control={
          <Radio
            value="child"
            checked={famMemRelation2 === 'child'}
            onChange={handleRelationChange2}
            sx={{
              color: '#25A18E', // Adjust color as needed
              '&.Mui-checked': {
               color: '#25A18E', // Adjust color for checked state
               },
           }}
          />
        }
        label="Child"
      />
      </Box>
      <Button type="submit" variant="contained" color="primary" 
      style={{ 
        marginTop: 20, width: '50%' , marginLeft: 110
      }}
      sx={{
        color: 'white',
        backgroundColor: '#25A18E',
        '&:hover': {
            backgroundColor: '#20756c', // Change color on hover if desired
        },
        }} 
        onClick={handleSubmit2}>
        Link Family Member
      </Button>
    

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