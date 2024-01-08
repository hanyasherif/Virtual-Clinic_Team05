import React, { useState } from 'react';
import './LoginForm.css'; // Import your CSS file for styling
import Header from "./Header";


const Login = () => {
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const goToVideoChat = () => {
      // Assuming you trigger this function when you want to navigate to the video chat
      window.location.href = "/video"
    };
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
               window.location.href = "/DoctorPage";
               break;
            case 'Patient':
               // Redirect to patient page
               window.location.href = `/patient`;
               break;
            case 'Administrator':
               // Redirect to page
               window.location.href = "/AdminPage";
               break;
            case 'Pharmacist':
               // Redirect to page
               window.location.href = "/pharmacistPagePh";
             break;
                  // case 'Patient':
                  //    // Redirect to patient page
                  //    window.location.href = `/patientPagePH`;
                  //    break;
                  // case 'Administrator':
                  //    // Redirect to page
                  //    window.location.href = "/adminPagePH";
                  //    break;
                  // default:
                  //     window.location.href = "/PH";
                      
                  //    break;
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
      <Header/>
      <div className="login-container">
        
  <h2>Login</h2>
  <div className="input-group">
    <label htmlFor="userName">Username:</label>
    <input
      type="text"
      id="userName"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
    />
  </div>
  <div className="input-group">
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <button className="login-button" onClick={handleLogin}>
    Login
  </button>
  <button onClick={goToVideoChat}>Go to Video Chat</button>
  <button onClick={() => window.location.href=`http://localhost:3000/reset-password-email`}>Forgot Password?</button>
  <p>
    Not signed up yet? <a href="/register">Sign Up</a>
  </p>
  <p>
    Wanna register as a doctor? <a href="/addRequest">Request Here</a>
  </p>
</div>
</div>

  );
};

export default Login;
