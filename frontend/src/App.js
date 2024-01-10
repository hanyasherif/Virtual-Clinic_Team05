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
import PharmacistArch from './pages/PharmacistArch';

import CartPagePH from './pages/CartPage';
import CheckoutPagePH from './pages/CheckoutPage';
import CancelOrderPH from './pages/sp2/CancelOrder';
// import OrderDetailsPH from './pages/sp2/OrderDetails';
import SuccessOrderPH from './pages/sp2/SuccessOrder';
import LoginPH from './pages/Login'; //old pharmacy login here
import ChangePasswPH from './pages/sp2/ChangePassw';
import ForgotPasswPH from './pages/sp2/ForgotPassw';
import OTPSenderPH from './pages/sp2/OTPsender'; 
import OtpVerificationPH from './pages/sp2/OTPVerification';
import ChangePasswordPH from './pages/sp2/ChangePass';
import Dashboard from './components/PatClinicDashboard';
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
// import Login from './components/login'; 
//old clinic login here
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
import ChangePasswordPatCl from './components/ChangePasswordPatCl'; 
import VideoChatPage from './pages/VideoChatPage'; 
import ChatPage from './pages/ChatPage'; 
import PatientsList from './components/PatientsList';
import PharmacistsList from './components/PharmacistsList';
import DocPharmacistsList from './components/DocPharmacistsList';
import ChatUserProfile from './components/ChatPatientInformation'
import DoctorDashboard from './components/DoctorDashboard';
import ChangePassDoc from './components/ChangePassDoc';
import AdminDashboardCl from './components/AdminDashboardCl';
import ChangePassAdmin from './components/ChangePassAdmin';

//import ChangePassword from './components/ChangePassword'; 

import DoctorApp from './components/DoctorApp';
import SelectedDoctorApp from './components/SelectedDoctorApp';
import PresDoctor from './components/PresDoctor';
import PresPatient from './components/PresPatient';
import SelectedPrescriptionD from './components/SelectedPrescriptionD';
import SelectedPrescriptionP from './components/SelectedPrescriptionP';
import MyCalendar from './components/MyCalender';
//import ChangePassword from './components/ChangePassword'; 
import OrderDetailsPH from './pages/OrderDetails';

import DashboardPH from './pages/Dashboard';
import DashboardCart from './pages/DashboardCart';
import DashboardCheckout from './pages/DashboardCheckout';
import DashboardPrescription from './pages/DashboardPrescription';
import SignIn from './pages/SignIn';
import DashboardPharmacist from './pages/DashboardPharmacist';
import DashboardPharmacistArchive from './pages/DashboardPharmacistArchive';
import DashboardPharmacistSales from './pages/DashboardPharmacistSales';
import DashboardAlternatives from './pages/DashboardAlternatives';
import DashboardViewOrders from './pages/DashboardViewOrders';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardAdminAdd from './pages/DashboardAdminAdd';
import DashboardAdminRemove from './pages/DashboardAdminRemove';
import DashboardAdminViewPatient from './pages/DashboardAdminViewPatient';
import DashboardAdminViewPharmacist from './pages/DashboardAdminViewPharmacist';
import DashPharmaWallet from './pages/DashPharmaWallet';
import RequestFollowUp from './components/RequestFollowUp';
import SubPackage from './components/SubPackage';
import AddAdminPage from './components/AddAdminPage';
import PharmacistInfo from './components/PharmacistInfo';
import AppointmentFailure from './components/AppointmentFailure';
import AppointmentSuccess from './components/AppointmentSuccess';
import DoctorPatientPage from './components/DoctorPatientPage';
import DocPatientsList from './components/DocPatientsList';
import DocPatientAppPage from './components/DocPatientAppPage';
import RescheduleDoctor from './components/RescheduleDoctor';
// import DashboardWallet from './pages/DashboardWallet';

// import ChooseMode from './pages/chooseMode';

import ChoosePath from './pages/ChoosePath';
import ChoosePathAdmin from './pages/ChoosePathAdmin';
import ViewReAdminDoc from './components/ViewReAdminDoc';
import PharmacistChatDoc from './components/PharmacistChatDoc';

//const stripePromise = loadStripe('pk_test_51OMBvdHlzuYFquyQjNy7RUTS6Qxu0DPEZzhTgpYISpLNpfyeylxmhnCZgrzVwtzPUPTj52lbqDeIqr1aQP8lwFKS00GOShxGqG');
function App() {
  return (
    <div className="App3">
      <BrowserRouter>
      <div >
      <Routes>
      <Route 
              path = "/register"
              element = {<Home />}/>
             <Route 
              path = "/adminAddPackage"
              element = {<AdminAddPackage/>}/>
              <Route 
              path = "/admin/update"
              element = {<AdminUpdatePackage />}/>
              <Route 
              path = "/patient/prescrptions"
              element = {<Prescriptions />}/>
               <Route 
              path = "/PrescriptionInfo"
              element = {<PrescriptionInfo />}/>
                   <Route 
              path = "/DocPatientsList"
              element = {<DocPatientsList />}/>
              <Route path="/addAdmin"
              element={<AddAdminForm/>}/>
              <Route path="/remove"
              element={<RemoveDoctorPatientAdmin/>}/>
              <Route path="/docList"
              element={<DoctorsList/>}/>
              <Route path="/docProfile"
              element={<DocProfile/>}/>
                <Route path="/DoctorPatientPage"
              element={<DoctorPatientPage/>}/>
                <Route path="/DocPatientAppPage"
              element={<DocPatientAppPage/>}/>
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
              element={<AdminDashboardCl/>}/>
              <Route path="/DoctorPage"
              element={<DoctorDashboard/>}/>
               <Route path="/RescheduleDoctor"
              element={<RescheduleDoctor/>}/>
              {/* <Route path="/"
              element={<Menu/>}/> */}
              <Route path="/ViewReAdminDoc"
              element={<ViewReAdminDoc/>}/>

              <Route path="/"
              element={<SignIn/>}/> 
              {/* login here */}


              <Route path="/PatientProfile"
              element={<UserProfile/>}/>
                 <Route path="/PharmacistProfile"
              element={<PharmacistInfo/>}/>

              <Route path="/uploadMedicalHistory"
              element={<UploadMedicalHistory/>}/>      
              {/* <Route path="/login"
              element={<Login/>}/> */}
               <Route path="/Dashboard"
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
              element={<ChangePasswordPatCl/>}/>
               <Route path="/ChangeMyPasswordDoc"
              element={<ChangePassDoc/>}/>
                  <Route path="/ReschedulePatient"
               element={<MyCalendar/>}/>
            <Route path="/RequestFollowUp"
               element={<RequestFollowUp/>}/>
          
              <Route path="/videochatpage"
              element={<VideoChatPage/>}/>
              <Route path="/addAdminPage"
              element={<AddAdminPage/>}/>

              <Route path="/ChangePassAdmin"
              element={<ChangePassAdmin/>}/>
                 <Route path="/SubPackage"
              element={<SubPackage/>}/>            
          
            
              {/*Aseel S3*/}
              <Route path="/DoctorApp"
              element={<DoctorApp/>}/>
               <Route path="/SelectedDoctorApp"
              element={<SelectedDoctorApp/>}/>
              <Route path="/PresDoctor"
              element={<PresDoctor/>}/>
              <Route path="/PresPatient"
              element={<PresPatient/>}/>
              <Route path="/SelectedPrescriptionD"
              element={<SelectedPrescriptionD/>}/>
              <Route path="/SelectedPrescriptionP"
              element={<SelectedPrescriptionP/>}/>
              

               {/*Stripe*/}
               <Route path="/AppointmentSuccess" element={<AppointmentSuccess/>}/>
               <Route path="/AppointmentFailure" element={<AppointmentFailure/>}/>
              
              {/*SS*/}
            <Route
              path="/PH"
              element={<SignIn/>}
            />
            <Route
              path="/patientPagePH"
              element={<DashboardPH/>}
            />
            <Route
              path="/pharmacistPagePH"
              element={<DashboardPharmacist/>}
            />

<Route
              path="/PharmacistChatDoc"
              element={<PharmacistChatDoc/>}
            />
            <Route
              path="/adminPagePH"
              element={<DashboardAdmin/>}
            />
            <Route 
              path="/addAdminPagePH"
              element={<DashboardAdminAdd/>}
            />
            <Route 
              path="/removePharPatPagePH"
              element={<DashboardAdminRemove/>}
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
              element = {<DashboardAdminViewPatient/>}
             /> 
              <Route
               path = "/admin/pharmacistPH"
              element = {<DashboardAdminViewPharmacist/>}
             />
             
             {/* sp2 */}

            <Route
              path="/cancelOrderPH"
              element={<CancelOrderPH/>}
            />
            <Route
              path="/cartPagePH"
              element={<DashboardCart/>} 
            />
            <Route
              path="/orderDetails"
              element={<DashboardViewOrders/>} 
            />
            <Route
              path="/checkoutPagePH"
              element={<DashboardCheckout/>}
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

            <Route path="/patient"
            element={<Dashboard/>}/>
          
          <Route path="/LandingPage"
            element={<LandingPage/>}/>
             <Route path="/chatpage"
              element={<ChatPage/>}/>
              
              <Route path="/patientslist"
              element={<PatientsList/>}/>

              <Route path="/Pharmacistslist"
              element={<PharmacistsList/>}/>

              <Route path="/DocPharmacistslist"
              element={<DocPharmacistsList/>}/>

              <Route path="/ChatPatientProfile"
              element={<ChatUserProfile/>}/>
         
          

              <Route path="/PharmacistArch"
              element={<DashboardPharmacistArchive/>}/>
              {/* sp3 */}

              <Route
              path="/PrescriptionMedicines"
              element={<DashboardPrescription/>}
            />

            <Route path="/Sales"
            element={<DashboardPharmacistSales/>}
            />

<Route path="/AlternativesMedicines"
            element={<DashboardAlternatives/>}
            />
              <Route
              path="/ChoosePath"
              element={<ChoosePath/>}
            />

<Route
              path="/ChoosePathAdmin"
              element={<ChoosePathAdmin/>}
            />
            <Route
              path="/DashPharmaWallet"
              element={<DashPharmaWallet/>}
            />
            
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