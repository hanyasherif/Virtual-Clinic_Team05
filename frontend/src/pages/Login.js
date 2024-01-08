import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = async () => {
      try {
         const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username: username, password }),
         });

         if (!response.ok) {
            const error = await response.json();
            console.error('Login failed:', error.message);
            // Handle error (e.g., show error message)
            return;
         }

         const data = await response.json();

         // Store token and role in localStorage or cookies
         //localStorage.setItem('token', data.token);
         //localStorage.setItem('role', data.role);
       console.log(data.type);
         // Redirect to different pages based on the role
         switch (data.type) {
            case 'Patient':
               // Redirect to patient page
               window.location.href = `/choosePath`;
               break;
            case 'Pharmacist':
               // Redirect to page
               window.location.href = "/pharmacistPagePh";
               break;
            case 'Administrator':
               // Redirect to page
               window.location.href = "/adminPagePH";
               break;
               case 'Doctor':
               // Redirect to page
               window.location.href = "/DoctorPage";
               break;
            default:
                window.location.href = "/choosePath";
                
               break;
         }
      } catch (error) {
         console.error('Login error:', error);
      }
   };

   return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Login form */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
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
          onClick={handleLogin}
        >
          Login
        </Button>
  
        {/* Buttons for Change Password and Forgot Password */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', marginTop: 20 }}>
          <Link to="/ChangePasswPH">
            <Button variant="contained" style={{ width: '45%' }}>
              Change Password
            </Button>
          </Link>
  
          <Link to="/ForgotPasswPH">
            <Button variant="contained" style={{ width: '45%' }}>
              Forgot Password
            </Button>
          </Link>
        </div>
  
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
