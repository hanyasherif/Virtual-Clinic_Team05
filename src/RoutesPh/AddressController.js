const AddressModel = require('../Models/Address.js');
const jwt = require('jsonwebtoken');

const addAddress = async (req, res) => {
  // const userId = req.user._id;
  const addressLine1 = req.body.addressLine1;
  const addressLine2 = req.body.addressLine2;
  const city = req.body.city;
  const state = req.body.state;
  const postalCode = req.body.postalCode;
  const country = req.body.country;

  const token = req.cookies.jwt;  
  const decodedToken = jwt.verify(token, 'supersecret'); // Replace 'your-secret-key' with your actual secret key
  console.log(decodedToken);
  const patientId = decodedToken.user._id;

  try {
    const address = await AddressModel.create({
      user: patientId,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
    });

    await address.save();
    res.status(200).json({ message: "Address created successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const searchAddress = async (req, res) => {
  const token = req.cookies.jwt;  
  const decodedToken = jwt.verify(token, 'supersecret'); // Replace 'your-secret-key' with your actual secret key
  console.log(decodedToken);
  const patientId = decodedToken.user._id;
  // const userId = req.query.user;
  try {
    const address = await AddressModel.find({ user: patientId });
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  addAddress, searchAddress
};
