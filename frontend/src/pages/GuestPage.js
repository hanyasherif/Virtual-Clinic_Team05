import React from 'react';
import { Link } from 'react-router-dom';

const GuestPage = () => {
  return (
    <div>
      <h1>Welcome! Please select your role:</h1>
      <Link to="/PatRegPH">Register as Patient</Link>
      <Link to="/PharRegPH">Register as Pharmacist</Link>

</div>
    
  );
};

export default  GuestPage;
