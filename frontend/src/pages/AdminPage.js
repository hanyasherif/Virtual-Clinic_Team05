//import { set } from 'mongoose';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

//components
import MedicineDetailsLite from '../componenetsPh/MedicineDetailsLite'
import CreateMedicine from '../componenetsPh/CreateMedicine'
import Requests from '../componentsPh/Requests';



const AdminPage = () => {
    const [medicines, setMedicines] = useState(null);

    useEffect(() => {
        const fetchMedicine = async () => {
            const response = await fetch('/medicines');
            const json = await response.json();

            if (response.ok) {
                setMedicines(json);
            }
        };

        fetchMedicine();
    }, []);

    return (
        <div className="adminPage">
           
            <div className="medicines">
         
            <div>Welcome, Admin!</div>
            <div>
      <Link to="/AddAdminPagePH">
        <button>Add Administrator</button>
      </Link>
      <Link to="/RemovePharPatPagePH">
        <button>Remove Pharmacist/Patient</button>
      </Link>
      <Link to="/admin/pharmacistPH">
        <button>View Pharmacist info</button>
      </Link>
      <Link to="/admin/patientPH">
        <button>View Patient info</button>
      </Link>
      <div>
        <Requests />
      </div>
    </div>
                
            </div>  
          
        </div>
    
    );
};

export default AdminPage;