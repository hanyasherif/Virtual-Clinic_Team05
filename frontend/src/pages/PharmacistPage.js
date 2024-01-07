//import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';

//components
import MedicineDetails from '../componenetsPh/MedicineDetails'
import CreateMedicine from '../componenetsPh/CreateMedicine'



const PharmacistPage = () => {
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
        <div className="pharmacistPage">
           
            <div className="medicines">
            <div>Welcome, Pharmacist!</div>
            <div>
                <button onClick={() => window.location.href='http://localhost:3000/docList'}>Doctors Chat List</button>
                <button onClick={() => window.location.href='http://localhost:3000/patientslist'}>Patients Chat List</button>
            </div>
                {medicines &&
                    medicines.map((medicine) => 
                        <MedicineDetails key={medicine._id} medicine={medicine} />)}   
           
            </div>  
            <CreateMedicine />
        </div>
    
    );
};

export default PharmacistPage;