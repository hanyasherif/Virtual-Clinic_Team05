import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MedicineDetailsLite from '../componenetsPh/MedicineDetailsLite';
//import Cookies from 'js-cookie';
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
          setMedicines(json);
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
      <div>Welcome, Patient!</div>
      <div className="medicines">
        {medicines &&
          medicines.map((medicine) => (
            <MedicineDetailsLite
              key={medicine._id}
              medicine={medicine}
              addToCart={addToCart}
            />
          ))}
      </div>

      {/* Add button to route to CartPage */}
      <Link to="/CartPagePH">
        <button>Go to Cart</button>
      </Link>
    </div>
  );
};

export default PatientPage;
