import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Container, Grid, Typography, Button, Card, CardMedia } from '@mui/material';
// import lolImage1 from './lol1.jpg'; // Import your LOL image paths
// import lolImage2 from './lol2.jpg'; // Import your LOL image paths

import logo from '../assets/Logo.png';

function WelcomePage() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" color="primary" sx={{ marginBottom: 4, textAlign: 'center' }}>
          Welcome to El7a2ny! <br/>
          Choose where to proceed:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
              <CardMedia component="img" height="140" image={logo} alt="LOL Image 1" />
            </Card>
            <Button component={Link} to="/AdminPage" variant="contained" color="primary" size="large">
               Click Here to Proceed to Clinic
            </Button>
          </Grid>

          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
              <CardMedia component="img" height="140" image={logo} alt="LOL Image 2" />
            </Card>
            <Button component={Link} to="/adminPagePH" variant="contained" color="primary" size="large">
            Click Here to Proceed to Pharmacy            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default WelcomePage;
