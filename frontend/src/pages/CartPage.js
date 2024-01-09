import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from '@material-ui/core';
import emptyCart from '../assets/emptyCart.jpg';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/viewCart');
        setCartItems(response.data.items);
        //setLoading(response.data.items.length === 0);
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
      //console.log('Changing quantity:', itemId, newQuantity);
  
      const response = await axios.put('/changeCartItemQuantity', {
        itemId,
        quantity: newQuantity,
      });
  
      console.log('Response from server:', response.data);
  
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error changing item quantity:', error);
    }
  };
  

  

  const totalCartPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.map((item) => (
        <div key={item._id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
          <Typography variant="h6">{item.medicine.name}</Typography>
          <Typography variant="body2">Quantity: {item.quantity}</Typography>
          <Typography variant="body2">Total Price: {item.totalPrice}</Typography>
          <div>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => changeQuantity(item._id, e.target.value)}
            />
           
          </div>

          
          <div style={{ marginTop: '10px' }}>
            <Button
              onClick={() => removeFromCart(item._id)}
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#A81D24',
                '&:hover': {
                    backgroundColor: '#911A20', // Change color on hover if desired
                },
                }}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Typography variant="h6" style={{ marginTop: '10px' }}>
        Total Cart Price: {totalCartPrice}
      </Typography>
      <Link to="/CheckoutPagePH">
        <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}

export default CartPage;
