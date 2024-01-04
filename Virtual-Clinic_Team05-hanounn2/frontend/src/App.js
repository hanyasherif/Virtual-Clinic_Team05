import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';


import ReschedulePage from './components/ReschedulePageForPatient';
import ReschedulePageDoc from './components/ReschedulePageForDoctor';
import AddAdminForm from './components/AddAdminForm'
import RemoveDoctorPatientAdmin from './components/RemoveDoctorPatientAdmin'
import DoctorsList from './components/DoctorsList'
import DocProfile from './components/DocProfile'
import Home from './components/Home';
import AdminAddPackage from './components/AdminAddPackage';
import AdminUpdatePackage from './components/AdminUpdatePackage';
import Prescriptions from './components/Prescriptions';
import Requests from './pages/Requests';
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
import UploadMedicalHistory from './components/UploadMedicalHistory';
import Login from './components/login';
import PatientPage from './components/PatientPage';
import AdminPage from './components/AdminPage'
import DoctorPage from './components/DoctorPage'
import ScheduleFollowUp from './components/ScheduleFollowUp'
import Patient from './components/Patient'
import ViewPackages from './components/ViewPackages';
import ViewMyPackage from './components/ViewMyPackage';
import OTPSender from './components/OTPSender';
import OtpVerification from './components/OtpVerification';
import PayAppointment from './components/PayAppointment';
import Wallet from './components/Wallet';
import SApp from './components/SApp';
import AddHealthRecord from './components/AddHealthRecord';
import ViewHealthRecords from './components/ViewHealthRecords';
 //import { loadStripe } from '@stripe/stripe-js';
import CreateContract from './components/CreateContract';
import ViewAcceptContract from './components/ViewAcceptContract';
import AddAppointment from './components/AddAppointments';
import ChangePassword from './components/ChangePassword'; 
//const stripePromise = loadStripe('pk_test_51OMBvdHlzuYFquyQjNy7RUTS6Qxu0DPEZzhTgpYISpLNpfyeylxmhnCZgrzVwtzPUPTj52lbqDeIqr1aQP8lwFKS00GOShxGqG');
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
              <Route  path='/viewFamilyMember' 
              element = {<ViewFamilyMember />} />
              <Route  path='/addFamilyMember' 
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
              <Route path="/AdminPage"
              element={<AdminPage/>}/>
              <Route path="/DoctorPage"
              element={<DoctorPage/>}/>
              {/* <Route path="/"
              element={<Menu/>}/> */}
              <Route path="/"
              element={<Login/>}/>
              <Route path="/reschedulePage"
              element={<ReschedulePage/>}/>
             <Route path="/reschedulePageDoc"
              element={<ReschedulePageDoc/>}/>
              <Route path="/PatientProfile"
              element={<UserProfile/>}/>
              <Route path="/uploadMedicalHistory"
              element={<UploadMedicalHistory/>}/>      
              {/* <Route path="/login"
              element={<Login/>}/> */}
               <Route path="/patient"
              element={<PatientPage/>}/>
               <Route path="/viewPackages"
              element={<ViewPackages/>}/>
               <Route path="/viewMyPackage"
              element={<ViewMyPackage/>}/>
              <Route path="/reset-password-email" element = {<OTPSender />}/>
               <Route path="/ChangePassword" element = {<OtpVerification/>}/>
              
              <Route path="/payAppointment"
              element={<PayAppointment/>}/>
              <Route path="/wallet"
              element={<Wallet/>}/>
              <Route path="/CreateContract"
              element={<CreateContract/>}/>
              <Route path="/SApp"
              element={<SApp/>}/>
              <Route path="/ViewAcceptContract"
              element={<ViewAcceptContract/>}/>
              <Route path="/AddAppointment"
              element={<AddAppointment/>}/>
              <Route path="/ViewHealthRecords"
              element={<ViewHealthRecords/>}/>
              <Route path="/AddNewHR"
              element={<AddHealthRecord/>}/>
              <Route path="/Schedule"
              element={<ScheduleFollowUp/>}/>
               <Route path="/ChangeMyPassword"
              element={<ChangePassword/>}/>
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