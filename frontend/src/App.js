import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';

//Pharma



import HomePH from "./pages/HomeKO";
import LoginAsPH from "./pages/LoginAs";
import NavbarPH from './componenetsPh/Navbar';
import PatientPagePH from './pages/PatientPage';
import PharmacistPagePH from './pages/PharmacistPage';
import AdminPagePH from './pages/AdminPage';
import AddAdminPagePH from './pages/AddAdminPage';
import RemovePharPatPagePH from './pages/RemovePharPatPage';
import GuestPagePH from './pages/GuestPage';
import PatRegPH from './pages/PatReg';
import PharRegPH from './pages/PharReg';
import RequestsPH from './componentsPh/Requests';
import SubmitRequestPH from './pages/SubmitRequest';
import PatientInfoPH from './pages/PatientInfo';
import PharmacistInfoPH from './pages/PharmacistInfo';

import CartPagePH from './pages/sp2/CartPage';
import CheckoutPagePH from './pages/sp2/CheckoutPage';
import CancelOrderPH from './pages/sp2/CancelOrder';
import OrderDetailsPH from './pages/sp2/OrderDetails';
import SuccessOrderPH from './pages/sp2/SuccessOrder';
import LoginPH from './pages/Login';
import ChangePasswPH from './pages/sp2/ChangePassw';
import ForgotPasswPH from './pages/sp2/ForgotPassw';
import OTPSenderPH from './pages/sp2/OTPsender'; 
import OtpVerificationPH from './pages/sp2/OTPVerification';
import ChangePasswordPH from './pages/sp2/ChangePass';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

///
//Pages & Components
// import Home from './pages/Home'
// import Navbar from './components/Navbar'
//import './App.css';
import AddAdminForm from './components/AddAdminForm'
import RemoveDoctorPatientAdmin from './components/RemoveDoctorPatientAdmin'
import DoctorsList from './components/DoctorsList'
import DocProfile from './components/DocProfile'
import Home from './components/Home';
import AdminAddPackage from './components/AdminAddPackage';
import AdminUpdatePackage from './components/AdminUpdatePackage';
import Prescriptions from './components/Prescriptions';
import Requests from './pagesCl/Requests';
//import Navbar from './components/Navbar1';
import SubmitRequest from './pagesCl/SubmitRequest';
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
      <div >
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
              {/*SS*/}
            <Route
              path="/PH"
              element={<LoginPH/>}
            />
            <Route
              path="/patientPagePH"
              element={<PatientPagePH/>}
            />
            <Route
              path="/pharmacistPagePH"
              element={<PharmacistPagePH/>}
            />
            <Route
              path="/adminPagePH"
              element={<AdminPagePH/>}
            />
            <Route 
              path="/addAdminPagePH"
              element={<AddAdminPagePH/>}
            />
            <Route 
              path="/removePharPatPagePH"
              element={<RemovePharPatPagePH/>}
            />
            <Route 
              path="/guestPagePH"
              element={<GuestPagePH/>}
            />
            <Route 
              path="/patRegPH"
              element={<PatRegPH/>}
            />
            <Route 
              path="/pharRegPH"
              element={<PharRegPH/>}
            />
            <Route
             path = "/admin/patientPH"
              element = {<PatientInfoPH/>}
             /> 
              <Route
               path = "/admin/pharmacistPH"
              element = {<PharmacistInfoPH/>}
             />
             
             {/* sp2 */}

            <Route
              path="/cancelOrderPH"
              element={<CancelOrderPH/>}
            />
            <Route
              path="/cartPagePH"
              element={<CartPagePH/>} 
            />
            <Route
              path="/orderDetailsPH"
              element={<OrderDetailsPH/>} 
            />
            <Route
              path="/checkoutPagePH"
              element={<CheckoutPagePH/>}
            />
            <Route
              path="/successOrderPH"
              element={<SuccessOrderPH/>}
            />
             <Route
              path="/checkoutPagePH"
              element={<SuccessOrderPH/>}
            />
            <Route
              path="/ChangePasswPH"
              element={<ChangePasswordPH/>}
            />
            <Route
              path="/ForgotPasswPH"
              element={<OTPSenderPH/>}
            />
            <Route path="/reset-password-emailPH" element = {<OTPSenderPH/>}/>
               <Route path="/ChangePasswordPH" element = {<OtpVerificationPH/>}/>
            
            
            <Route path="/ChangeMyPasswordPH"
            element={<ChangePasswordPH/>}/>

            <Route path="/Dashboard"
            element={<Dashboard/>}/>
          
          <Route path="/LandingPage"
            element={<LandingPage/>}/>
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