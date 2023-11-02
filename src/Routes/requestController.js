// #Task route solution
const requestModel = require('../Models/Request.js');
const mongoose = require('mongoose');
const userModel = require('../Models/User');


//THIS IS THE TASK CODE TO GUIDE YOUUU

const addRequest = async(req,res) => {
   //add a new user to the database with 
   //Name, Email and Age
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
         educationalBackground: educationalBackground, doctor: doctor,
          status: status
      })
      await request.save()
      res.status(200).json({message: "Request created successfully"})
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

const getRequests = async (req,res) => {
    const id = req.query.id
    try{
        const requests = await requestModel.find({doctor: new mongoose.Types.ObjectId(id)}).populate({
         path:'doctor'});
        res.status(200).json(requests);
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

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

module.exports = {addRequest, getRequests}