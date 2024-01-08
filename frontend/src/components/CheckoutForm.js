import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const CheckoutForm = ({ onToken }) => {
    const user = useSelector((state) => state.user);
    const [error, setError] = useState(null);
   
    const handleSubmit = async (event) => {
       event.preventDefault();
       const { token, error } = await getStripeToken();
   
       if (error) {
         setError(error.message);
       } else {
         onToken(token);
       }
    };
   
    const getStripeToken = async () => {
       // Implement the logic to create a Stripe token
       // based on the user's input (credit card or wallet)
    };
   
    return (
       <form onSubmit={handleSubmit}>
         {/* Add input fields for credit card or wallet information */}
         {error && <p>{error}</p>}
         <button type="submit">Buy Package</button>
       </form>
    );
   };