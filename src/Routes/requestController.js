// #Task route solution
const requestModel = require('../Models/Request.js');
const mongoose = require('mongoose');
const userModel = require('../Models/User');
const { collection } = require('../Models/User');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const path = require('path');
//THIS IS THE TASK CODE TO GUIDE YOUUU
const getUploaded = async (req, res) => {
   try {
     console.log("mohab222");
 
     let decodedToken; // Declare the variable outside the try block
 
     try {
       const token = req.cookies.jwt;
  
      console.log('Token:', token);
       decodedToken = jwt.verify(token, 'supersecret');
       console.log("ssssss" + decodedToken.user._id);
     } catch (error) {
       console.error('Error verifying token:', error.message);
       return res.status(401).json({ message: 'jwt must be provided' });
     }
 
     const user = decodedToken.user;
     const uploadedFiles = user.medicalHistory;
     res.status(200).json({ fileNames: uploadedFiles });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };
 
const addRequest = async(req,res) => {
   //add a new user to the database with 
   //Name, Email and Age
   console.log("dsass");
   let username = req.body.username
   let password = req.body.password
   let name = req.body.name
   let email = req.body.email
   let dateOfBirth = req.body.dateOfBirth
   let hourlyRate = req.body.hourlyRate
   let affiliation = req.body.affiliation
   let educationalBackground = req.body.educationalBackground
   let doctor = req.body.doctor
   let status = req.body.status

   try{
      let request = await requestModel.create({username: username, 
        name: name, email: email, dateOfBirth: dateOfBirth,
         password: password, hourlyRate: hourlyRate, affiliation: affiliation,
         educationalBackground: educationalBackground, status: 'pending'
      })
      await request.save()
      const createdRequested = await requestModel.findOne({username: username});
      res.status(200).json( createdRequested);
   }
   catch(err){
      res.json({message: err.message})
   }
      
   }

const removeUser = async (req, res) => {
   let username = req.body.username;
    //    let userID = await userModel.find(username = username)
    // const user = await userModel.findOne({ username });

   try {
      const deletedUser = await userModel.findOneAndDelete({ username });


      if (!deletedUser) {
         return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

const getARequest = async (req,res) => {
    const id = req.query.id
    try{
        const requests = await requestModel.find({doctor: new mongoose.Types.ObjectId(id)}).populate({
         path:'doctor'});
        res.status(200).json(requests);
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const getRequests = async (req,res) => {
   try{
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
   
      const requests = await requestModel.find();
      res.status(200).json(requests);
   }catch(err){
       res.status(400).json({message: err.message})
   }
}
const handleAccept = async (req, res) => {
   try {
       const requestId = req.params.requestId; // Assuming the request ID is passed as a parameter

       // Update the request status to 'accepted'
       const updatedRequest = await requestModel.findByIdAndUpdate(
           requestId,
           { status: 'accepted' },
           { new: true }
       );

       if (!updatedRequest) {
           return res.status(404).json({ error: 'Request not found' });
       }
       res.status(200).json({ message: 'Request accepted', request: updatedRequest });
   } catch (err) {
       res.status(500).json({ error: 'Internal server error' });
   }
};

const handleReject = async (req, res) => {
  try {
      const requestId = req.params.requestId; // Assuming the request ID is passed as a parameter

      // Update the request status to 'accepted'
      const updatedRequest = await requestModel.findByIdAndUpdate(
          requestId,
          { status: 'rejected' },
          { new: true }
      );

      if (!updatedRequest) {
          return res.status(404).json({ error: 'Request not found' });
      }
      res.status(200).json({ message: 'Request rejected', request: updatedRequest });
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
   }
};
// const id = req.query.id
//    try{
//     const blogs =await blogModel.find({author:mongoose.Types.ObjectId(id)}).populate({
//         path:'author'
//     })
//     res.status(200).json(blogs)

//     }
//    catch(error){
//     res.status(400).json({message: error.message})
//    }

//    const getUsers = async (req, res) => {

      
//       // try {
//       //     const users = await userModel.find({});
//       //     res.status(200).json(users);
//       // } catch (err) {
//       //     res.status(500).json({ message: err.message });
//       // }
//   }
  

//   const updateUser = async (req, res) => {
//    const userId = req.params.id; 
//    const updateFields = req.body; 

//    try {
//       const updatedUser = await userModel.findByIdAndUpdate(
//          userId,
//          { $set: updateFields },
//          { new: true } // To return the updated user
//       );

//       if (!updatedUser) {
//          return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//    } catch (err) {
//       res.status(500).json({ message: err.message });
//    }
// }


// const deleteUser = async (req, res) => {
//    const userId = req.params.id; 

//    try {
//       const deletedUser = await userModel.findByIdAndRemove(userId);

//       if (!deletedUser) {
//          return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
//    } catch (err) {
//       res.status(500).json({ message: err.message });
//    }
// }
// 
// module.exports = {createUser, getUsers, updateUser, deleteUser};

module.exports = {addRequest, getRequests, getARequest , getUploaded , handleReject, handleAccept}
