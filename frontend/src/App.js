import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';


//Pages & Components
// import Home from './pages/Home'
// import Navbar from './components/Navbar'
import './App.css';
import AddAdminForm from './components/AddAdminForm'
import RemoveDoctorPatientAdmin from './components/RemoveDoctorPatientAdmin'
import DoctorsList from './components/DoctorsList'
import DocProfile from './components/DocProfile'
import Home from './components/Home';
import AdminAddPackage from './components/AdminAddPackage';
import AdminUpdatePackage from './components/AdminUpdatePackage';
import Prescriptions from './components/Prescriptions';
import Requests from './pages/Requests';
//import Navbar from './components/Navbar1';
import SubmitRequest from './pages/SubmitRequest';
import ViewFamilyMember from './components/ViewFamilyMember';
import AddFamilyMember from './components/AddFamilyMember';
import FilterAppointmentsPatient from './components/FilterAppointmentsPatient';
import UsersList from './components/UsersList';
import Setting from './components/Setting';
import PatientInfo from './components/PatientInfo';
import Menu from './components/Main';
import Meeting from './components/Appointments';
import UserProfile from './components/Patientinformation'
import PrescriptionInfo from './components/PrescriptionInfo';
import ResestpasswordPage from './components/ResetPasswordEmailPage';
import ChangePasswordPage from './components/ChangingPassword';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
      {/* <Navbar /> */}
      <div className="pages">
      <Routes>
      <Route 
              path = "/register"
              element = {<Home />}/>
             <Route 
              path = "/admin"
              element = {<AdminAddPackage />}/>
              <Route 
              path = "/admin/update"
              element = {<AdminUpdatePackage />}/>
              <Route 
              path = "/patient/prescrptions"
              element = {<Prescriptions />}/>
               <Route 
              path = "/PrescriptionInfo"
              element = {<PrescriptionInfo />}/>
              <Route path="/addAdmin"
              element={<AddAdminForm/>}/>
              <Route path="/remove"
              element={<RemoveDoctorPatientAdmin/>}/>
              <Route path="/docList"
              element={<DoctorsList/>}/>
              <Route path="/docProfile"
              element={<DocProfile/>}/>
              <Route path="/addRequest"
              element={<SubmitRequest/>}></Route>
              <Route path="/requests"
              element={<Requests/>}></Route>
              <Route  path='/viewFamilyMember/:id' 
              element = {<ViewFamilyMember />} />
              <Route  path='/addFamilyMember/:id' 
              element = {<AddFamilyMember />} />
              <Route  path='/FilterAppointmentsPatient' 
              element = {<FilterAppointmentsPatient />} />
              <Route path="/ShowPatients"
              element={<UsersList/>}/>
              <Route path="/setting"
              element={<Setting/>}/>
              <Route path="/Info"
              element={<PatientInfo/>}/>
              <Route path="/Meeting"
              element={<Meeting/>}/>
              <Route path="/"
              element={<Menu/>}/>
              <Route path="/PatientProfile"
              element={<UserProfile/>}/>
               <Route path="/reset-password-email" element = {<ResestpasswordPage />}/>
               <Route path="/ChangePassword" element = {<ChangePasswordPage />}/>
              </Routes>
             
      </div>
      {/* <UsernameTextBox /> Include TextBoxExample component here */}
      {/* <PasswordTextBox /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
// export { TextBoxExample };