import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Alert } from '@mui/material';

const CheckoutPage = () => {
  const [walletInfo, setWalletInfo] = useState(0);
  // const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [totalCartAmount, setTotalCartAmount] = useState(0);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getUserByTokenId', { withCredentials: true });
        const user = response.data;
        setWalletInfo(user.walletInfo);
      } catch (error) {
        console.error('Error fetching wallet info:', error);
      }
    };

    fetchWalletInfo();
  }, []);

  useEffect(() => {
    const fetchTotalCartAmount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getCartTotalAmount', { withCredentials: true });
        setTotalCartAmount(response.data.totalAmount);
      } catch (error) {
        console.error('Error fetching total cart amount:', error);
      }
    };

    fetchTotalCartAmount();
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const calculateTotalCartAmount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getCartTotalAmount', { withCredentials: true });
      setTotalCartAmount(response.data.totalAmount); // Set the state with the fetched value
      return response.data.totalAmount;
    } catch (error) {
      console.error('Error fetching total cart amount:', error);
      return 0;
    }
  };
  useEffect(() => {
    calculateTotalCartAmount(); // Fetch the totalCartAmount and set it in the state
  }, []);

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

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleAlertClose = () => {
    setSuccessAlertOpen(false);
  };

  const handleCheckout = async () => {
    // Replace with the actual patient ID
    const addressId = ''; // Replace with the actual selected address ID
    const paymentMethod = ''; // Replace with the actual payment method

    setSuccessAlertOpen(true);

    

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
          setSuccessAlertOpen(true); // Toggle the Alert
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
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: -100, padding: 0 }}>
  <h2></h2>

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
          <p>Current Balance: ${walletInfo}</p>
        </div>
      )}

{selectedPaymentMethod === 'cashOnDelivery' && (
  <div>
    {/* <p>Total totalCartAmount: ${totalCartAmount}</p> */}
    <p>Total price: $45.27</p>


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
  <div>
    <h3>Existing Addresses:</h3>
    <FormControl sx={{ width: 200, marginBottom: 2 }}>
      <InputLabel sx={{ marginTop: 1 }}>Select Address</InputLabel>
      <Select
        value={selectedAddressId || ''}
        onChange={(e) => handleSelectAddress(e.target.value)}
      >
        {addresses.map((address) => (
          <MenuItem key={address._id} value={address._id}>
            {`${address.addressLine1}, ${address.city}, ${address.country}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>

  {/* Perform checkout button */}
  <Button
    type="submit"
    variant="contained"
    color="primary"
    onClick={handleCheckout}
    style={{ marginTop: 20, width: '70%' }}
    sx={{
      color: 'white',
      backgroundColor: '#25A18E',
      '&:hover': {
        backgroundColor: '#20756c',
      },
    }}
  >
    Perform Checkout
  </Button>

  {/* Success Alert */}
  {successAlertOpen && (
    <Alert
      severity="success"
      open={successAlertOpen}
      autoHideDuration={6000}
      onClose={() => setSuccessAlertOpen(false)}
    >
      Order placed successfully
    </Alert>
  )}
</div>

      );
};

export default CheckoutPage;
