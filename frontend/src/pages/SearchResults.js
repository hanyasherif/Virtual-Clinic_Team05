

//import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';

//components
import MedicineDetails from '../componenets/MedicineDetails'
import CreateMedicine from '../componenets/CreateMedicine'
import MedicineDetailsLite from '../componenets/MedicineDetailsLite';



const SearchResults = () => {
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
        <div className="SearchResults">
           
            <div className="medicines">
            <div>Welcome, Pharmacist!</div>
                {medicines &&
                    medicines.map((medicine) => 
                        <MedicineDetailsLite key={medicine._id} medicine={medicine} />)}   
           
            </div>  
            <CreateMedicine />
        </div>
    
    );
};

export default SearchResults;