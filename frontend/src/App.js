import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewFamilyMember from './components/ViewFamilyMember';
import AddFamilyMember from './components/AddFamilyMember';
import FilterAppointmentsPatient from './components/FilterAppointmentsPatient';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route  path='/viewFamilyMember' element = {<ViewFamilyMember />} />
          <Route  path='/addFamilyMember' element = {<AddFamilyMember />} />
          <Route  path='/FilterAppointmentsPatient' element = {<FilterAppointmentsPatient />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
