import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

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
                const nonArchivedMedicines = json.filter(medicine => !medicine.isArchived);
                setMedicines(nonArchivedMedicines);
            }
        };

        fetchMedicine();
    }, []);

    return (
        <div className="pharmacistPage">
            <Typography variant="h5">Edit Medicine</Typography>
            <br/>
            <Link to="/PharmacistArch">
                <Button variant="contained" color="primary">Go to Archive</Button>
            </Link>
            <div className="medicines">
                {medicines &&
                    medicines.map((medicine) => 
                        <MedicineDetails key={medicine._id} medicine={medicine} />)}   
            </div>  
          
            
        </div>
    );
};

export default PharmacistPage;