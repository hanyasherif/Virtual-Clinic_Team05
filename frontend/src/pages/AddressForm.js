import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios';
import Title from '../components/Title';

const AddressForm = () => {
  const [newAddress, setNewAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [addresses, setAddresses] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/addAddress', {
        ...newAddress,
      });
      const response = await axios.get('/getAddresses', {});
      setAddresses(response.data);
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
     <Title style={{ color: '#25A18E', fontSize: 23, textAlign: 'center' }}>
              Add new address (optional)
            </Title>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 1"
            type="text"
            name="addressLine1"
            value={newAddress.addressLine1}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2"
            type="text"
            name="addressLine2"
            value={newAddress.addressLine2}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            type="text"
            name="city"
            value={newAddress.city}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="State"
            type="text"
            name="state"
            value={newAddress.state}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Postal Code"
            type="text"
            name="postalCode"
            value={newAddress.postalCode}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Country"
            type="text"
            name="country"
            value={newAddress.country}
            onChange={handleInputChange}
            required
          />
        </Grid>
      </Grid>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 5, marginLeft: 110, width: '55%' }}
          sx={{
            color: 'white',
            backgroundColor: '#25A18E',
            '&:hover': {
              backgroundColor: '#20756c',
            },
          }}
        >
              Add Address
        </Button>
    </form>
  );
};

export default AddressForm;
