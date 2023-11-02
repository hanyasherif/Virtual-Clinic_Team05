// #Task route solution
const userModel = require('../Models/User.js');
const { default: mongoose } = require('mongoose');

//THIS IS THE TASK CODE TO GUIDE YOUUU

const addAdminstrator = async(req,res) => {
   //add a new user to the database with 
   //Name, Email and Age
   let username = req.body.username
   let password = req.body.password

   try{
      let user = await userModel.create({type: "Adminstrator",username: username, password: password})
      await user.save()
      res.status(200).json({message: "Adminstrator created successfully"})
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

module.exports = {addAdminstrator, removeUser}
