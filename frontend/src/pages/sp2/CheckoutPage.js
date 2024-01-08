import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Cookies from 'js-cookie';


// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51OMBvdHlzuYFquyQjNy7RUTS6Qxu0DPEZzhTgpYISpLNpfyeylxmhnCZgrzVwtzPUPTj52lbqDeIqr1aQP8lwFKS00GOShxGqG');


const CheckoutPage = () => {
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

    // const addressId = '656c8edff1452498a620df80'; // Replace with the actual selected address ID

    
  // Handle selecting an existing address
 

    const performCheckout = async (addressId, paymentMethod) => {
      try {
        // Create the order data
        const orderData = {
          addressId: selectedAddressId, // Use the selected address ID
          paymentMethod: selectedPaymentMethod, // Use the selected payment method
        };

        console.log(orderData);
    
        // Send a POST request to the backend checkout route
        const response = await axios.post('/checkout', orderData);
    
        // Check if the request was successful
        if (response.status === 200) {
          // history.push('/OrderDetails');
          // Do any additional logic if needed
    
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

    // Call the performCheckout method
    performCheckout( addressId, paymentMethod);

    // Redirect or perform other actions as needed after checkout
  };

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
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');



  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('/searchAddress', {
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
  
    fetchAddresses();
  }, []);

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
      const response = await axios.get('/getAddresses', {
      });
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


  return (
    <div>
      <h2>CHECKOUT PAGE</h2>

      {/* Form for entering a new address */}
      <div>
        <label>
          Payment Method:
          <select value={selectedPaymentMethod} onChange={handleSelectPaymentMethod}>
            <option value="creditCard">Credit Card</option>
            <option value="wallet">Wallet</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
          </select>
        </label>
      </div>
      
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
  
     

      {/* View existing addresses with radio buttons */}
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

      {/* Proceed to success order page */}
      <Link to="/SuccessOrder">
        <button>success order</button>
      </Link>

      {/* <Link to="/CartPage"> */}
        <button onClick={handleCheckout}>Perform checkout</button>
      {/* </Link> */}
    </div>

    
  );
};

export default CheckoutPage;
