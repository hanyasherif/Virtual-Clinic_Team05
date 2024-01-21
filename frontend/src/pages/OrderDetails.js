import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Button, Paper, Typography } from '@mui/material';

const OrderDetails = () => {
  const userId = ''; // Use the provided userId
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); // No dependencies, run once when the component mounts

  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`/cancelOrder`, null, {
        params: {
          orderId: orderId,
        },
      });
      // Assuming you have a mechanism to update the order status in state or refetch orders
      // For simplicity, you can refetch the orders after cancellation
      // fetchOrders();
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4">Order Details for Patient {userId}</Typography>
      {orders.map((order) => (
        <Paper key={order._id} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">Order ID: {order._id}</Typography>
          <Typography>User: {order.user}</Typography>
          <Typography>Order Status: {order.orderStatus}</Typography>
          <Typography>Payment Method: {order.paymentMethod}</Typography>
          <Typography>Order Total: {order.orderTotal}</Typography>
          <Typography>Delivery Address: {order.deliveryAddress}</Typography>

          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Order Items
          </Typography>
          <ul>
            {order.items.map((item) => (
              <li key={item.medicine._id}>
                <Typography>Medicine: {item.medicine.name}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Total Price: {item.totalPrice}</Typography>
              </li>
            ))}
          </ul>

          {order.orderStatus === 'pending' || order.orderStatus === 'processing' ? (
            <Button variant="contained" color="error" onClick={() => cancelOrder(order._id)}>
              Cancel Order
            </Button>
          ) : null}
        </Paper>
      ))}
    </div>
  );
};

export default OrderDetails;
