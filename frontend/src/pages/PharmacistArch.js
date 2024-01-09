//import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


//components
import MedicineDetails from '../componenetsPh/MedicineDetailsArch'
import CreateMedicine from '../componenetsPh/CreateMedicine'
import { Typography } from '@mui/material';



const PharmacistPage = () => {
    const [medicines, setMedicines] = useState(null);

    useEffect(() => {
        const fetchMedicine = async () => {
            const response = await fetch('/medicines');
            const json = await response.json();

            if (response.ok) {
                if (response.ok) {
                    const nonArchivedMedicines = json.filter(medicine => medicine.isArchived);
                    setMedicines(nonArchivedMedicines);
                  }
            }
        };

        fetchMedicine();
    }, []);

    return (
        <div className="pharmacistPage">
             <div className="medicines">

                <Typography variant="h4" component="h2" gutterBottom>
            <div>Medicines Archive:</div>
            </Typography>
                {medicines &&
                    medicines.map((medicine) => 
                        <MedicineDetails key={medicine._id} medicine={medicine} />)}   
           
            </div>  


        </div>
    
    );
};

export default PharmacistPage;