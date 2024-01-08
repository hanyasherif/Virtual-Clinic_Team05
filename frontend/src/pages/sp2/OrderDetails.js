import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetails = () => {
  const userId = ''; // Use the provided userId
 // const orderId = '6571039ab3949c52fbc4351b' ;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders`, {
        });
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
      //fetchOrders();
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Order Details for Patient {userId}</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>User: {order.user}</p>
          <p>Order Status: {order.orderStatus}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Order Total: {order.orderTotal}</p>
          <p>Delivery Address: {order.deliveryAddress}</p>

          <h3>Order Items</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.medicine._id}>
                <p>Medicine: {item.medicine.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total Price: {item.totalPrice}</p>
              </li>
            ))}
          </ul>

          {order.orderStatus === 'pending' || order.orderStatus === 'processing' ? (
            <button onClick={() => cancelOrder(order._id)}>Cancel Order</button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
