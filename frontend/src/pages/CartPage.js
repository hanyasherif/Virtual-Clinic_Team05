import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Add this import statement
//import jwt from 'jsonwebtoken'; // Add this import statement
//import Cookies from 'js-cookie'; // Add this import statement
import emptyCart from '../assets/emptyCart.jpg';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [patientId, setPatientId] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/viewCart')
        setCartItems(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, []);
  

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete('/removeFromCart', {
        params: {
          itemId,
        },
      });

      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const changeQuantity = async (itemId, newQuantity) => {
    try {
      const response = await axios.put('/changeCartItemQuantity', {
        itemId,
        quantity: newQuantity,
      });

      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error changing item quantity:', error);
    }
  };

  

  if (loading) {
    return (
      <div>
        <img src={emptyCart} alt="Empty Cart" />
        <p>Your cart is empty!</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2>Cart Page</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <p>{item.medicine.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: {item.totalPrice}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => changeQuantity(item._id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <Link to="/CheckoutPagePH">
        <button>Proceed to checkout</button>
      </Link>
    </div>
  );
};

export default CartPage;
