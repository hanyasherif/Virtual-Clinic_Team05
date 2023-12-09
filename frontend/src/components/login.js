import React, { useState } from 'react';

const Login = () => {
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = async () => {
      try {
         const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username: userName, password }),
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
            case 'Doctor':
               // Redirect to page
               window.location.href = "/docprofile";
               break;
            case 'Patient':
               // Redirect to patient page
               window.location.href = `/patient?Id=${data._id}`;
               break;
            case 'Administrator':
               // Redirect to page
               window.location.href = "/AdminAddPackage";
               break;
            default:
                window.location.href = "/";
                
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
            <label htmlFor="userName">Username:</label>
            <input
               type="text"
               id="userName"
               value={userName}
               onChange={(e) => setUserName(e.target.value)}
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
      </div>
   );
};

export default Login;
