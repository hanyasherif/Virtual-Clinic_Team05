import React from 'react';
//import '../patient.css';
import Dropdown from './Dropdown';
import { Button } from '@mui/material';
function Patient() {
 return (
    <div className="header">
      <h1>El7a2ny Clinic</h1>
      <div className="welcome">Welcome User</div>
      <Button className="but" onClick={() => window.location.href=`http://localhost:3000/register`}>RegisterPatient</Button>
      <Dropdown/>
    </div>
 );
}

export default Patient;