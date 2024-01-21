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

    useEffect(() => {
        if (medicines) {
                    medicines.forEach((medicine) => {
                        if (medicine.availableQuantity === 0) {
                            alert(medicine.name + ' is Out of Stock');
                        }
                    });
                }
            }, [medicines]);


    return (
        <div className="pharmacistPage">
              <Link to="/PharmacistArch">
   <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginLeft: 120, marginBottom: 20,width: '50%' }}
          sx={{
            color: 'white',
            backgroundColor: '#25A18E',
            '&:hover': {
              backgroundColor: '#20756c',
            },
          }}
        >
          Go to Archived Medicines  
        </Button>            </Link>

            <div className="medicines">
            <div>
            <Button
        onClick={() => window.location.href = 'http://localhost:3000/PharmacistChatDoc'}
        variant="contained"
        sx={{
          color: 'white',
          backgroundColor: '#25A18E',
          '&:hover': {
            backgroundColor: '#20756c',
          },
          marginRight: '10px', // Add some spacing between buttons if needed
        }}
      >
        Doctors Chat List
      </Button>

      {/* Patients Chat List button */}
      <Button
        onClick={() => window.location.href = 'http://localhost:3000/patientslist'}
        variant="contained"
        sx={{
          color: 'white',
          backgroundColor: '#25A18E',
          '&:hover': {
            backgroundColor: '#20756c',
          },
        }}
      >
        Patients Chat List
      </Button>
            </div>
                {medicines &&
                    medicines.map((medicine) => 
                        <MedicineDetails key={medicine._id} medicine={medicine} />)}   
            </div>  
          
            
        </div>
    );
};

export default PharmacistPage;