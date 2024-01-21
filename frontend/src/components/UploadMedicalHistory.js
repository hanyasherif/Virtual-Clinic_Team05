import * as React from 'react';
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
import { mainListItems, secondaryListItems } from './listItemsCl';
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

export default function UploadMedicalHistory() {

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

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getUploadedFiles(); // Fetch uploaded files when the component mounts
    
  }, []);

  const getUploadedFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getUploaded`,{
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch uploaded files');
      }
      const data = await response.json();
      if (data && data.fileNames) {
        setUploadedFiles(data.fileNames);
      }
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
      toast.error('Failed to fetch uploaded files. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadDocument = async (file) => {
    try {
      const formData = new FormData();
      formData.append('document', selectedFile);
  
      await fetch(`http://localhost:8000/upload-document`, {
        method: "POST",
        body: formData,credentials: 'include'
      });

      await getUploadedFiles();
  
      // Handle success, e.g., show a success toast
      toast.success('Document uploaded successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error({ message: error.message });
      // Handle error, e.g., show an error toast
      toast.error('Failed to upload document. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const removeDocument = async (documentId) => {
    try {
      await fetch(`http://localhost:8000/remove-document/${documentId}`, {
        method: "delete",
        credentials:'include'
      });

      await getUploadedFiles();
  
      // Handle success, e.g., show a success toast
      toast.success('Document removed successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error removing document:', error);
      // Handle error, e.g., show an error toast
      toast.error('Failed to remove document. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const viewDocument = (filePath, fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
  
    if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      // For images: Open in a new tab
      window.open(filePath, '_blank');
    } else if (fileExtension === 'pdf') {
      fetchAndDownloadPDF(filePath, fileName);
    } else {
      // Handle other file types or display a message for unsupported formats
      console.log('File format not supported for preview/download.');
      // Display a message or handle differently for unsupported file types
    }
  };
  
  const fetchAndDownloadPDF = async (filePath, fileName) => {
    try {
      const encodedFilePath = encodeURIComponent(filePath);
      const encodedFileName = encodeURIComponent(fileName);
      const response = await fetch(`http://localhost:8000/serveFiles/${encodedFilePath}/${encodedFileName}`);
      const fileBlob = await response.blob();
      // Use FileSaver or any other method to save the blob as a file
    } catch (error) {
      console.error('Error fetching file:', error);
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
              Upload Medical History Patient Page
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
            <div className="UploadMedicalHistory">
              
      <input type="file" onChange={handleFileChange} style={{marginLeft:400, marginTop: 20}}/>
      
      <Button variant="contained" 
      sx={{
        color: 'white',
        backgroundColor: '#25A18E',
        '&:hover': {
            backgroundColor: '#20756c', // Change color on hover if desired
        },
        }} 
      onClick={uploadDocument}>Upload</Button>
      <br/><br/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">File Name</StyledTableCell>
              <StyledTableCell align="center">File Path</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <TableRow
                  hover
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#f5f5f5",
                      width: "100%",
                    },
                  }}
                  key={file._id}
                >
                  <TableCell align="center">{file.name}</TableCell>
                  <TableCell align="center">{file.path}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" 
                    sx={{
                      color: 'white',
                      backgroundColor: '#A81D24',
                      '&:hover': {
                          backgroundColor: '#911A20', // Change color on hover if desired
                      },
                      }} 
                    onClick={() => removeDocument(file._id)}>Remove</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" 
                    sx={{
                      color: 'white',
                      backgroundColor: '#25A18E',
                      '&:hover': {
                          backgroundColor: '#20756c', // Change color on hover if desired
                      },
                      }} 
                    onClick={() => viewDocument(file.path, file.name)}>View</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No files uploaded yet
                </TableCell>
              </TableRow>
            )}
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
