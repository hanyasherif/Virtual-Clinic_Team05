import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';


//Pages & Components
// import Home from './pages/Home'
// import Navbar from './components/Navbar'
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
              <Route path="/addAdmin"
              element={<AddAdminForm/>}/>
              <Route path="/remove"
              element={<RemoveDoctorPatientAdmin/>}/>
              <Route path="/docList"
              element={<DoctorsList/>}/>
              <Route path="/docProfile"
              element={<DocProfile/>}/>
              <Route path="addRequest"
              element={<SubmitRequest/>}></Route>
              <Route path="requests"
              element={<Requests/>}></Route>
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