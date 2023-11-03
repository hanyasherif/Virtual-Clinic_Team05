import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UsersList from './components/UsersList';
import Setting from './components/Setting';
import PatientInfo from './components/PatientInfo';
import Menu from './components/Main';
import Meeting from './components/Appointments';
import UserProfile from './components/Patientinformation'

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
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
    </Routes>
    </BrowserRouter>
      </div>
  );
}

export default App;
