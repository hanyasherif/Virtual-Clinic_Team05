const { default: mongoose } = require('mongoose');
const Order = require('../Models/Order');

const jwt = require('jsonwebtoken');


// Get all orders for a user
const viewOrders = async (req, res) => {
    try {
        const token = req.cookies.jwt;  
        const decodedToken = jwt.verify(token, 'supersecret'); // Replace 'your-secret-key' with your actual secret key
        console.log(decodedToken);
        const patientId = decodedToken.user._id;
        console.log(patientId);

      
        const orders = await Order.find({ user: mongoose.Types.ObjectId(patientId) });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Cancel an order
const cancelOrder = async (req, res) => {
    try {

        const token = req.cookies.jwt;  
        const decodedToken = jwt.verify(token, 'supersecret'); // Replace 'your-secret-key' with your actual secret key
        console.log(decodedToken);
        const patientId = decodedToken.user._id;
        console.log(patientId);

        const { orderId } = req.query;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Only allow cancellation if the order is pending or processing
        if (order.orderStatus === 'pending' || order.orderStatus === 'processing') {
            order.orderStatus = 'canceled';
            await order.save();
            res.status(200).json(order);
        } else {
            res.status(400).json({ error: 'Cannot cancel the order at this stage' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { viewOrders, cancelOrder };



// Get order details by order ID
// const getOrderDetails = async (req, res) => {
//   try {
//     const { orderId } = req.query;
//     const order = await Order.findById(orderId).populate('items.medicine');
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }
//     res.status(200).json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
