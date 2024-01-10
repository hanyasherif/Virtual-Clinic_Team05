import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Alert } from '@mui/material';

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [walletInfo, setWalletInfo] = useState(0);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
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
  
  

  const handleSelectPaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleCreditCardInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleCheckout = async () => {
    setSuccessAlertOpen(true);

    if (selectedPaymentMethod === 'wallet') {
      const totalCartAmount = await calculateTotalCartAmount();

      if (walletInfo < totalCartAmount) {
        alert('You do not have enough money in the wallet to pay');
        return;
      }

      try {
        await modifyPatientWallet(totalCartAmount);
        setSuccessAlertOpen(true);
      } catch (error) {
        console.error('Error updating Patient wallet:', error);
      }
    } else {
      const addressId = selectedAddressId;
      const paymentMethod = selectedPaymentMethod;

      try {
        const orderData = {
          addressId,
          paymentMethod,
        };

        const response = await axios.post('/checkout', orderData);

        if (response.status === 200) {
          console.log('Order placed successfully:', response.data);
        } else {
          console.error('Error placing order:', response.data);
        }
      } catch (error) {
        console.error('Error performing checkout:', error);
      }
    }
  };

  const modifyPatientWallet = async (price) => {
    try {
      const response = await axios.post('http://localhost:8000/modifyWallet', { price }, { withCredentials: true });
      console.log(response.data.message);
      setWalletInfo((prevWalletInfo) => prevWalletInfo - price);
    } catch (error) {
      console.error('Error updating Patient wallet:', error);
      throw error; // Propagate the error so that it can be caught in handleCheckout
    }
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Payment Method</InputLabel>
        <Select value={selectedPaymentMethod} onChange={handleSelectPaymentMethod}>
          <MenuItem value="creditCard">Credit Card</MenuItem>
          <MenuItem value="wallet">Wallet</MenuItem>
          <MenuItem value="cashOnDelivery">Cash on Delivery</MenuItem>
        </Select>
      </FormControl>

      {selectedPaymentMethod === 'wallet' && (
        <div>
          <p>Current Balance: ${walletInfo}</p>
        </div>
      )}

{selectedPaymentMethod === 'cashOnDelivery' && (
  <div>
    <p>Total totalCartAmount: ${totalCartAmount}</p>
    <p>totalCartAmount Due</p>
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
        </div>
      )}

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
