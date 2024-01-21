import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import MedicineDetailsLite from '../componenetsPh/MedicineDetailsLite';
import axios from 'axios';

const PatientPagePrescription = () => {
  const [medicines, setMedicines] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch('/prescriptions');
        const json = await response.json();
        console.log('ALOOO', json);
        console.log(json);

        if (response.ok) {
          const nonArchivedMedicines = json.filter(medicine => !medicine.isArchived);
          setMedicines(nonArchivedMedicines);
        }
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicine();
  }, []);
  const addToCart = async (medicineId, quantity) => {
    try {
      const response = await axios.post('/addToCart', {
        medicineId,
        quantity,
      });

      const json = response.data;

      if (response.status === 200) {
        setCartItems(json.items);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };



  return (
    <div className="patientPage">
      <div>Prescription Medicines</div>
      <Grid container spacing={2} className="medicines">
        {medicines &&
          medicines.map((medicine) => (
            <Grid item key={medicine._id} xs={12} sm={6} md={4} lg={3}>
              <MedicineDetailsLite
                medicine={medicine}
                addToCart={addToCart}
              />
            </Grid>
          ))}
      </Grid>

      {/* Add button to route to CartPage */}
     
    </div>
  );
};

export default PatientPagePrescription;
