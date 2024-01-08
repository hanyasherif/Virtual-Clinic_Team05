import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Login failed:', error.message);
        // Handle error (e.g., show error message)
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Store token and role in localStorage or cookies
      //localStorage.setItem('token', data.token);
      //localStorage.setItem('role', data.role);
      
      // Redirect to different pages based on the role
      switch (data.type) {
        case 'Patient':
          // Redirect to patient page
          window.location.href = `/choosePath`;
          break;
        case 'Pharmacist':
          // Redirect to pharmacist page
          window.location.href = '/pharmacistPagePh';
          break;
        case 'Administrator':
          // Redirect to admin page
          window.location.href = '/adminPagePH';
          break;
        case 'Doctor':
          // Redirect to doctor page
          window.location.href = '/DoctorPage';
          break;
        default:
          window.location.href = '/choosePath';
          break;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Login form */}
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Styled Login button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20, width: '50%' }}
          sx={{
            color: 'white',
            backgroundColor: '#25A18E',
            '&:hover': {
              backgroundColor: '#20756c',
            },
          }}
        >
          Login
        </Button>
      </form>

      {/* Buttons for Change Password and Forgot Password */}
      <Grid container spacing={2} style={{ width: '50%', marginTop: 20 }}>
        <Grid item xs={6}>
          <Link to="/ChangeMyPassword">
            <Button variant="contained" fullWidth>
              Change Password
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6}>
          <Link to="/ForgotPasswPH">
            <Button variant="contained" fullWidth>
              Forgot Password
            </Button>
          </Link>
        </Grid>
      </Grid>

      {/* Not a user? Register! button */}
      <Link to="/guestPagePH">
        <Button variant="contained" style={{ marginTop: 20, width: '50%' }}>
          Not a user? Register!
        </Button>
      </Link>
    </div>
  );
};

export default Login;
