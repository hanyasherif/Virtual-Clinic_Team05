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
        const error =await response.json();
      
        alert('An error occurred:'+error.error);
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
          window.location.href = '/choosePathAdmin';
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* Login form */}
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          sx={{marginTop: -25,}}
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
          sx={{marginTop: -18}}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Styled Login button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: -100, width: '100%' }}
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <Link to="/ForgotPasswPH">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: -20, width: '100%' }}
            sx={{
              color: 'white',
              backgroundColor: '#25A18E',
              '&:hover': {
                backgroundColor: '#20756c',
              },
            }}
          >
            Forgot Password
          </Button>
        </Link>
        <Link to="/guestPagePH" style={{ marginTop: 10 }}>
          Not a user? Register
        </Link>
      </div>
    </div>
    
  );
};

export default Login;
