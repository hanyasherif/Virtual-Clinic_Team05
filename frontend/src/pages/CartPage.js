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
        setLoading(response.data.items.length === 0);
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
      console.log('Changing quantity:', itemId, newQuantity);
  
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
  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/viewCart');
        setCartItems(response.data.items);
        setLoading(response.data.items.length === 0);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const totalCartPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.map((item) => (
        <Paper key={item._id} elevation={3}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{item.medicine.name}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Total Price: {item.totalPrice}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => changeQuantity(item._id, e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                onClick={() => removeFromCart(item._id)}
                variant="contained"
                color="secondary"
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Paper>
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
};

export default CartPage;
