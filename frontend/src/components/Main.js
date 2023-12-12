import { Button } from '@mui/material';
import React from 'react';
import '../App.css';
function Menu() {
  

  return (
    <div>
      <h1>El7an2y</h1>
      <div className="category-section">
      <Button onClick={() => window.location.href=`http://localhost:3000/login`}>login</Button>
        <h3>Patient</h3>
        <Button onClick={() => window.location.href=`http://localhost:3000/register`}>RegisterPatient</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/addFamilyMember/:id`}>Add FamilyMember</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/viewFamilyMember/:id`}>View FamilyMember</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/docList`}>View Doctors</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/patient/prescrptions`}>View Prescriptions</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/FilterAppointmentsPatient`}>Filter Appointments </Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/uploadMedicalHistory`}>Upload Medical History</Button>
      </div>
      <div className="category-section">
        <h3>Doctor</h3>
        <Button onClick={() => window.location.href=`http://localhost:3000/addRequest`}>Submit Request</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/setting`}>Edit Profile</Button>
        <Button  onClick={() => window.location.href=`http://localhost:3000/ShowPatients`}>ShowPatients</Button>
      <Button onClick={() => window.location.href=`http://localhost:3000/Info`}>SearchClient</Button>
      <Button onClick={() => window.location.href=`http://localhost:3000/Meeting`}>Show UpcomingAppointment</Button>
      </div>
      <div className="category-section">
        <h3>Admin</h3>
        <Button onClick={() => window.location.href=`http://localhost:3000/addAdmin`}>Add Admin</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/remove`}>Delete Users</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/requests`}>View Doctors Requests</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/admin`}>Add Packages and Delete</Button>
        <Button onClick={() => window.location.href=`http://localhost:3000/admin/update`}>Update PackageS</Button>
      </div>
    </div>
  );
}

export default Menu;



