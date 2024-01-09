import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import MedicineDetailsLite from '../componenetsPh/MedicineDetailsLite';
import axios from 'axios';

const PatientPage = () => {
  const [medicines, setMedicines] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch('/medicines');
        const json = await response.json();

        if (response.ok) {
          const nonArchivedMedicines = json.filter(medicine => !medicine.isArchived);
          const paracetamolMedicines = nonArchivedMedicines.filter(medicine => medicine.activeIngredients === 'Paracetamol');
          console.log(paracetamolMedicines);
          setMedicines(paracetamolMedicines);
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
      <div>Welcome, Manar!</div>
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
      <Link to="/CartPagePH">
        <Button variant="contained" color="primary">
          Go to Cart
        </Button>
      </Link>
    </div>
  );
};

export default PatientPage;
