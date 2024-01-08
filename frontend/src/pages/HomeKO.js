//import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';

//components
import MedicineDetails from '../componenetsPh/MedicineDetails'
// import CreateMedicine from '../componenets/CreateMedicine'



const Home = () => {
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
        <div className="home">
           
            <div className="medicines">
         
                {medicines &&
                    medicines.map((medicine) => 
                        <MedicineDetails key={medicine._id} medicine={medicine} />)}   
           
            </div>  
            {/* <CreateMedicine /> */}
        </div>
    
    );
};

export default Home;