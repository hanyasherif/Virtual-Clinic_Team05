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
      <Typography
  color="#25A18E"
  fontSize={55}
  textAlign="center"
  sx={{ marginBottom: 4, textAlign: 'center' }}
>
  Welcome to El7a2ny! <br />
  Choose where to proceed:
</Typography>

        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
              <CardMedia component="img" height="140" image={logo} alt="logo1" />
            </Card>
            <Button
          type="submit"
          variant="contained"
          color="primary"
          component={Link} to="/patient"
          style={{ marginTop: 20, width: '100%' }}
          sx={{
            color: 'white',
            backgroundColor: '#25A18E',
            '&:hover': {
              backgroundColor: '#20756c',
            },
          }}
        >
                      Clinic 

        </Button>
          </Grid>

          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
              <CardMedia component="img" height="140" image={logo} alt="LOL Image 2" />
            </Card>
           
            <Button
          type="submit"
          variant="contained"
          color="primary"
          component={Link} to="/patientPagePH
          "
          style={{ marginTop: 20, width: '100%' }}
          sx={{
            color: 'white',
            backgroundColor: '#25A18E',
            '&:hover': {
              backgroundColor: '#20756c',
            },
          }}
        >
  Pharmacy

        </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default WelcomePage;
