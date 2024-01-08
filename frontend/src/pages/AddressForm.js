import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const AddressForm = () => {
  // State for managing new address form inputs
  const [newAddress, setNewAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  // State for managing existing addresses
  const [addresses, setAddresses] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Handle form submission for adding a new address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/addAddress', {
        ...newAddress,
      });
      // Fetch updated addresses after adding a new one
      const response = await axios.get('/getAddresses', {});
      setAddresses(response.data);
      // Clear the new address form
      setNewAddress({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('/searchAddress', {});
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <form onSubmit={handleAddAddress}>
      <h3>Add New Address:</h3>
      <div>
        <label>
          Address Line 1:
          <input
            type="text"
            name="addressLine1"
            value={newAddress.addressLine1}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Address Line 2:
          <input
            type="text"
            name="addressLine2"
            value={newAddress.addressLine2}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={newAddress.city}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={newAddress.state}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={newAddress.postalCode}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={newAddress.country}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>

      <button type="submit">Add New Address</button>
    </form>
  );
};

export default AddressForm;
