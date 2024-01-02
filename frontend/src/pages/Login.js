import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            case 'Pharmacist':
               // Redirect to page
               window.location.href = "/pharmacistPagePh";
               break;
            case 'Patient':
               // Redirect to patient page
               window.location.href = `/patientPagePH`;
               break;
            case 'Administrator':
               // Redirect to page
               window.location.href = "/adminPagePH";
               break;
            default:
                window.location.href = "/PH";
                
               break;
         }
      } catch (error) {
         console.error('Login error:', error);
      }
   };

   return (
      <div>
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
         <button onClick={handleLogin}>Login</button>
         <Link to="/guestPagePH">
        <button>Not a user? Register!</button>
      </Link>
      <Link to="/ChangePasswPH">
        <button>Change Password</button>
      </Link>
      <Link to="/ForgotPasswPH">
        <button>Forgot Password</button>
      </Link>
      </div>
   );
};

export default Login;
