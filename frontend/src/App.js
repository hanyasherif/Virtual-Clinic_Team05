import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Requests from './pages/Requests';
import Navbar from './components/Navbar';
import SubmitRequest from './pages/SubmitRequest';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={<Requests/>}
          ></Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
