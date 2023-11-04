import { BrowserRouter, Routes, Route} from 'react-router-dom'


import Home from './pages/Home';
import AdminAddPackage from './pages/AdminAddPackage';
import AdminUpdatePackage from './pages/AdminUpdatePackage';
import Prescriptions from './pages/Prescriptions';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
   
        <div className="pages">
          <Routes>
            <Route 
              path = "/register"
              element = {<Home />}
             />
             <Route 
              path = "/admin"
              element = {<AdminAddPackage />}
             />
              <Route 
              path = "/admin/update"
              element = {<AdminUpdatePackage />}
             />
              <Route 
              path = "/patient/prescrptions"
              element = {<Prescriptions />}
             />


           </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
