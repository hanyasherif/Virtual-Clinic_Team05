const Cart = require('../Models/Cart');
const Medicine = require('../Models/Medicine');
const Order = require('../Models/Order');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');  // Ensure you have nodemailer installed

// View cart items
const viewCart = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const patientId = decodedToken.user._id;
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
    const decodedToken = jwt.verify(token, 'supersecret');
    const patientId = decodedToken.user._id;
    console.log("the medicine Iddddddd" ,medicineId);
    const totalPrice = await calculateTotalPrice(medicineId, quantity);

    console.log("the Totallllll " ,totalPrice);
    const cartItem = {
      medicine: medicineId,
      quantity,
      totalPrice
    };

    // Find the cart for the patient or create a new one if it doesn't exist
    const cart = await Cart.findOneAndUpdate(
      { patient: patientId },
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
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      throw new Error('Medicine not found');
    }

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
    const decodedToken = jwt.verify(token, 'supersecret');
    const patientId = decodedToken.user._id;

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

async function sendEmail(email, NameOfMedicine) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seifkandel3@gmail.com',
      pass: 'c x o d r z b m d n u s y f p r',
    },
  });

  const mailOptions = {
    from: 'sender@example.com',
    to: email,
    subject: 'From the Pharmacy',
    text: `This Medicine is Currently Out of Stock: ${NameOfMedicine}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}

// Checkout route
const checkout = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const patientId = decodedToken.user._id;

    const { addressId, paymentMethod } = req.body;

    // Find the cart for the patient
    const cart = await Cart.findOne({ patient: patientId }).populate('items.medicine');

    if (!cart) {
      return res.status(400).json({ error: 'Cart not found for the user' });
    }

    // Check if any item in the cart has zero available quantity
    for (const item of cart.items) {
      const medicineId = item.medicine._id;
      const medicineDetails = await Medicine.findById(medicineId);
      const availableQuantity = medicineDetails.availableQuantity;

      if (availableQuantity === 0) {
        const medicine = await Medicine.findById(medicineId);
        const MedicineName = medicine.name;
        const pharmacists = await userModel.findAll({ where: { type: 'Pharmacist' } });

        pharmacists.forEach(async (pharmacist) => {
          const email = pharmacist.email;
          sendEmail(email, MedicineName);
        });

        // If any item has zero available quantity, halt the checkout process
        return res.status(400).json({ error: 'Some items are out of stock' });
      }
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

      await Medicine.findByIdAndUpdate(
        medicineId,
        {
          $inc: {
            availableQuantity: -quantity,
            sales: +quantity,
          },
        },
        { new: true }
      );
    }

    // Clear the cart for the user
    await Cart.findOneAndRemove({ patient: patientId });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Stripe
const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    // Assuming you have 'stripe' initialized properly
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


const getCartTotalAmount= async (req,res)=>{
  try {
    // Retrieve user ID from the authenticated user (you may use the user ID stored in the session or token)
    const userId = req.user.id;

    // Fetch cart items for the user
    const cartItems = await CartItem.find({ user: userId });

    // Calculate the total amount
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    res.status(200).json({ totalAmount });
  } catch (error) {
    console.error('Error fetching cart total amount:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}



module.exports = { addToCart, viewCart, removeFromCart, changeCartItemQuantity, checkout, createPaymentIntent ,getCartTotalAmount};
