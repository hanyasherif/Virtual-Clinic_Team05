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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Navbar /> */}
      <div className="pages">
      <Routes>
        <Route path="/addAdmin"
        element={<AddAdminForm/>}/>
        <Route path="/remove"
        element={<RemoveDoctorPatientAdmin/>}/>
        <Route path="/docList"
        element={<DoctorsList/>}/>
        <Route path="/docProfile"
        element={<DocProfile/>}/>
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