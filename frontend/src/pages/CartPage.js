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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%', // Make each medicine component the same width
  },
  cartItem: {
    marginBottom: theme.spacing(2),
  },
  quantityInput: {
    marginLeft: theme.spacing(2),
  },
  proceedButton: {
    marginTop: theme.spacing(2),
  },
  removeButton: {
    marginLeft: 'auto', // Move the Remove button to the right
  },
}));

const CartPage = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/viewCart');
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
      <div className={classes.root}>
        <img src={emptyCart} alt="Empty Cart" />
        <Typography variant="body1">Your cart is empty!</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.map((item) => (
        <Paper key={item._id} elevation={3} className={classes.paper}>
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
                className={classes.quantityInput}
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
                className={classes.removeButton}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Link to="/CheckoutPagePH">
        <Button
          variant="contained"
          color="primary"
          className={classes.proceedButton}
        >
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
};

export default CartPage;
