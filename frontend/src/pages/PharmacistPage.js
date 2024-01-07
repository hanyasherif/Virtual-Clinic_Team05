//import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


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
                if (response.ok) {
                    const nonArchivedMedicines = json.filter(medicine => !medicine.isArchived);
                    setMedicines(nonArchivedMedicines);
                  }
            }
        };

        fetchMedicine();
    }, []);

    return (
        <div className="pharmacistPage">
           
            <div className="medicines">
            <div>Welcome, Pharmacist!</div>
                {medicines &&
                    medicines.map((medicine) => 
                        <MedicineDetails key={medicine._id} medicine={medicine} />)}   
           
            </div>  
            <CreateMedicine />

            <Link to="/PharmacistArch">
  <button>Go to Archive</button>
</Link>

        </div>
    
    );
};

export default PharmacistPage;