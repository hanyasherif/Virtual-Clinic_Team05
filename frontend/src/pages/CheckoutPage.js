import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';

const CheckoutPage = () => {
  const AddressSelectionComponent = ({ addresses, handleSelectAddress }) => {
    return (
      <div>
        <h3>Existing Addresses:</h3>
        {addresses.map((address) => (
          <div key={address._id}>
            <label>
              <input
                type="radio"
                name="address"
                value={address._id}
                onChange={() => handleSelectAddress(address._id)}
              />
              {`${address.addressLine1}, ${address.city}, ${address.country}`}
            </label>
          </div>
        ))}
      </div>
    );
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleSelectPaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    // Replace with the actual patient ID
    const addressId = ''; // Replace with the actual selected address ID
    const paymentMethod = ''; // Replace with the actual payment method

    const performCheckout = async (addressId, paymentMethod) => {
      try {
        const orderData = {
          addressId: selectedAddressId,
          paymentMethod: selectedPaymentMethod,
        };

        console.log(orderData);

        const response = await axios.post('/checkout', orderData);

        if (response.status === 200) {
          console.log('Order placed successfully:', response.data);
          // Redirect or perform other actions as needed
        } else {
          console.error('Error placing order:', response.data);
          // Handle errors or show an error message to the user
        }
      } catch (error) {
        console.error('Error performing checkout:', error);
        // Handle errors or show an error message to the user
      }
    };

    performCheckout(addressId, paymentMethod);
    // Redirect or perform other actions as needed after checkout
  };

  // State for managing existing addresses
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');

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

  // Dummy credit card form state
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleCreditCardInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>CHECKOUT PAGE</h2>

      {/* Payment Method Selection */}
      <FormControl>
        <InputLabel>Payment Method</InputLabel>
        <Select value={selectedPaymentMethod} onChange={handleSelectPaymentMethod}>
          <MenuItem value="creditCard">Credit Card</MenuItem>
          <MenuItem value="wallet">Wallet</MenuItem>
          <MenuItem value="cashOnDelivery">Cash on Delivery</MenuItem>
        </Select>
      </FormControl>

      {/* Conditional rendering based on selected payment method */}
      {selectedPaymentMethod === 'wallet' && (
        <div>
          <p>Current Balance: $1250</p>
          {/* Additional content for wallet payment method */}
        </div>
      )}

      {selectedPaymentMethod === 'cashOnDelivery' && (
        <div>
          <p>Total Price: $100</p>
          <p>Price Due</p>
          {/* Additional content for cash on delivery payment method */}
        </div>
      )}

      {selectedPaymentMethod === 'creditCard' && (
        <div>
          <h3>Credit Card Information:</h3>
          <TextField
            label="Card Number"
            type="text"
            name="cardNumber"
            value={creditCardInfo.cardNumber}
            onChange={handleCreditCardInputChange}
            required
          />
          <br />
          <TextField
            label="Expiration Date"
            type="text"
            name="expirationDate"
            value={creditCardInfo.expirationDate}
            onChange={handleCreditCardInputChange}
            required
          />
          <br />
          <TextField
            label="CVV"
            type="text"
            name="cvv"
            value={creditCardInfo.cvv}
            onChange={handleCreditCardInputChange}
            required
          />
          <br />
          {/* Additional content for credit card payment method */}
        </div>
      )}

      {/* Existing Addresses Selection */}
      <AddressSelectionComponent addresses={addresses} handleSelectAddress={handleSelectAddress} />

      {/* Proceed to success order page */}
      <Link to="/SuccessOrder">
        <Button variant="contained">Success Order</Button>
      </Link>

      {/* Perform checkout button */}
      <Button variant="contained" onClick={handleCheckout}>
        Perform Checkout
      </Button>
    </div>
  );
};

export default CheckoutPage;
