import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DoctorsList from './components/DoctorsList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/viewDoctors"
        element={<DoctorsList/>}/>

        {/* <Route path="/viewDoctors"
        element={<DoctorProfile/>}/> */}
      </Routes>
      <DoctorsList/>
      </BrowserRouter>

    </div>
    
  );
}

export default App;
