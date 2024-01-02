import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>Welcome! Please select your role:</h1>
      <Link to="/guestPagePH">
        <button>Continue as Guest</button>
      </Link>
      <Link to="/patientPagePH">
        <button>Login as Patient</button>
      </Link>
      <Link to="/pharmacistPagePH">
        <button>Login as Pharmacist</button>
      </Link>
      <Link to="/adminPagePH">
        <button>Login as Administrator</button>
      </Link>  
    </div>
  );
};

export default Login;
