const contractModel = require('../Models/EmploymentContract.js');
const userModel = require('../Models/User.js');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
// Create a new employment contract
const createContract = async(req,res)=>{
 
   const doctorId = req.body.doctorId;
     const termsAnd = req.body.termsAnd;
     const markup = req.body.markup;
       //         markup

       try{
        const newContract = {doctorId: doctorId, termsAndConditions: termsAnd, markup: markup}
        const contract = await contractModel.create(newContract);
        await contract.save();
            res.status(200).json({message: "contract created successfully"})
 
    }
    catch(err){
              res.json({message: err.message})}
    };

// Retrieve all employment contracts
// const getAllContracts = asyncHandler(async(req,res) => {
//   try {
//     const contracts = await EmploymentContract.find({}).sort({createdAt: -1})
//     res.status(200).json(contracts);

//   } catch (error) {
//     res.status(400)
//     throw new Error(error.message) 
//     }
// });

const getContract = async (req, res) => {
    try {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
      const doctorId= decodedToken.user._id
    // Change from req.params.doctorId to req.query.doctorId
      console.log(doctorId);
      const contract = await contractModel.findOne({ doctorId: doctorId});
      if (!contract) {
        return res.status(404).json({ message: "there is no contract " });
      }
       res.status(200).json(contract);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const acceptContract = async (req, res) => {
    try {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
        const doctorId= decodedToken.user._id
  
      // Fetch the specific appointment using the appointmentId
      const contract = await contractModel.findOne({ doctorId: doctorId});
  
      // Check if the appointment exists
      if (!contract) {
        return res.status(404).json({ message: "contract not found" });
      }
  
      contract.status = "Accepted";
  
      // Save the modified appointment
      await contract.save();
  
      res.status(200).json({ message: "Contract updated successfully", contract });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  const rejectContract = async (req, res) => {
    try {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
        const doctorId= decodedToken.user._id
  
      // Fetch the specific appointment using the appointmentId
      const contract = await contractModel.findOne({ doctorId: doctorId});
  
      // Check if the appointment exists
      if (!contract) {
        return res.status(404).json({ message: "contract not found" });
      }
  
      contract.status = "Rejected";
  
      // Save the modified appointment
      await contract.save();
  
      res.status(200).json({ message: "Contract updated successfully", contract });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


module.exports = {createContract,acceptContract,   rejectContract,   getContract};