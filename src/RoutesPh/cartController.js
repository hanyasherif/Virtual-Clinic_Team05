const Cart = require('../Models/Cart');
const Medicine = require('../Models/Medicine');
const Order = require('../Models/Order');
const jwt = require('jsonwebtoken');
//GARABNAAAAAA JWTTTT HENAAAAAAAAAAAAAAAAAAAAAA



// View cart items
const viewCart = async (req, res) => {
  try {
    console.log("ss");
      const token = req.cookies.jwt;  
      const decodedToken = jwt.verify(token, 'supersecret'); // Replace 'your-secret-key' with your actual secret key
      console.log(decodedToken);
      const patientId = decodedToken.user._id;
      console.log("ss34567878");
      console.log(patientId);
    const cart = await Cart.findOne({ patient: patientId }).populate('items.medicine');

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Add an over-the-counter medicine to the cart
const addToCart = async (req, res) => {
    try {
        const { medicineId, quantity } = req.body;

        const token = req.cookies.jwt;  
        const decodedToken = jwt.verify(token, 'supersecret'); // Replace 'your-secret-key' with your actual secret key
        const patientId = decodedToken.user._id;

        const totalPrice = await calculateTotalPrice(medicineId, quantity);

        console.log(req.body)
        const cartItem = {
            medicine: medicineId,
            quantity,
            totalPrice
        };
        
        // Find the cart for the patient or create a new one if it doesn't exist
        const cart = await Cart.findOneAndUpdate(
            { patient: patientId }, //jwt HENAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            { $push: { items: cartItem }, $inc: { totalAmount: Number(totalPrice) } },
            { new: true, upsert: true }
        );

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

async function calculateTotalPrice(medicineId, quantity) {
        try {
            // Fetch the medicine price from the database
            console.log(medicineId);
            const medicine = await Medicine.findById(medicineId);
            //console.log(medicine);
            if (!medicine) {
                throw new Error('Medicine not found');
            }
    
            // Calculate the total price
            const totalPrice = medicine.price * quantity;
    
            return totalPrice;
        } catch (error) {
            console.error('Error calculating total price:', error.message);
            throw error;
        }
}



// Remove an item from the cart
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.query;

      const token = req.cookies.jwt;  
      const decodedToken = jwt.verify(token, 'supersecret'); // Replace 'your-secret-key' with your actual secret key
      //console.log(decodedToken);
      const patientId = decodedToken.user._id;
      //console.log(patientId);

        // Find the item to be removed and get its total price
        const cartItem = await Cart.findOne({ patient: patientId, 'items._id': itemId }, { 'items.$': 1 });
        const totalPrice = cartItem.items[0].totalPrice;

        const cart = await Cart.findOneAndUpdate(
            { patient: patientId },
            { $pull: { items: { _id: itemId } }, $inc: { totalAmount: -totalPrice } },
            { new: true }
        );

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Change the amount of an item in the cart
const changeCartItemQuantity = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        const cartItem = await Cart.findOne({ 'items._id': itemId }, { 'items.$': 1 });
        const medicineId = cartItem.items[0].medicine;

        const newTotalPrice = await calculateTotalPrice(medicineId, quantity);

        const cart = await Cart.findOneAndUpdate(
            { 'items._id': itemId },
            { $set: { 'items.$.quantity': quantity, 'items.$.totalPrice': newTotalPrice }, totalAmount: newTotalPrice },
            { new: true }
        );

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Checkout route
const checkout = async (req, res) => {
    try {

      const token = req.cookies.jwt;  
      const decodedToken = jwt.verify(token, 'supersecret'); // Replace 'your-secret-key' with your actual secret key
      const patientId = decodedToken.user._id;

      console.log("mangawy")
      console.log(patientId);
      const { addressId, paymentMethod } = req.body;
  
      // Find the cart for the patient
      const cart = await Cart.findOne({ patient: patientId }).populate('items.medicine');
  
      if (!cart) {
        return res.status(400).json({ error: 'Cart not found for the user' });
      }
  
      // Calculate the total order amount
      const orderTotal = cart.totalAmount;
  
      // Create an order based on cart items
      const order = new Order({
        user: patientId,
        items: cart.items.map(item => ({
          medicine: item.medicine._id,
          quantity: item.quantity,
          totalPrice: item.totalPrice
        })),
        deliveryAddress: addressId,
        paymentMethod,
        orderTotal
      });
  
      // Save the order to the database
      await order.save();

       // Decrease the medicine's available quantity
    for (const item of cart.items) {
      const medicineId = item.medicine._id;
      const quantity = item.quantity;

      await Medicine.findByIdAndUpdate(medicineId, { $inc: { availableQuantity: -quantity } });
    }
  
      // Clear the cart for the user
      await Cart.findOneAndRemove({ patient: patientId });
  
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  /////stripe

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating Payment Intent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Usage:
// app.post('/create-payment-intent', createPaymentIntent);

//stryipe end
  

module.exports = { addToCart, viewCart, removeFromCart, 
  changeCartItemQuantity, checkout, createPaymentIntent };
