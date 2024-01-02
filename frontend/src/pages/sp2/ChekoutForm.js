// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     // Use elements.getElement to get a reference to the CardElement
//     const cardElement = elements.getElement(CardElement);

//     // Confirm the Payment Intent with the collected card details
//     const { token, error } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         // Add other payment method details if needed
//       },
//     });

//     if (error) {
//       console.error('Payment failed:', error);
//     } else {
//       console.log('Payment succeeded:', paymentIntent);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };
