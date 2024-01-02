// #Task route solution
const requestModel = require('../Models/Request.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
   let status = req.body.status

   try{
      let request = await requestModel.create({username: username, 
        name: name, email: email, dateOfBirth: dateOfBirth,
         password: password, hourlyRate: hourlyRate, affiliation: affiliation,
         educationalBackground: educationalBackground,
          status: status
      })
      await request.save()
      res.status(200).json({message: "Request created successfully"})
   }
   catch(err){
      res.json({message: err.message})
   }
      
   }


const getARequest = async (req,res) => {
    const id = req.query.id
    try{
        const requests = await requestModel.find({pharmacist: new mongoose.Types.ObjectId(id)}).populate({
         path:'pharmacist'});
        res.status(200).json(requests);
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const getRequests = async (req,res) => {
    try{
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
       res.status(500).json({ error: 'Internal server error' });
   }
};


module.exports = {addRequest, getRequests, getARequest, handleAccept, handleReject}
