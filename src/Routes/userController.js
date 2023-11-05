// #Task route solution
const userModel = require('../Models/User.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const appointmentsModel = require('../Models/Appointment.js');

//THIS IS THE TASK CODE TO GUIDE YOUUU

const addFamilyMember = async(req,res)=>{
   let username = req.params.id //bn-pass bl session
  
   let famMemName = req.body.famMemName;
   let famMemNatID = req.body.famMemNatID;
   let famMemAge = req.body.famMemAge;
   let famMemGender = req.body.famMemGender;
   let famMemRelation = req.body.famMemRelation;
   try{
       const newfamilyMember = {famMemName: famMemName, famMemNatID: famMemNatID,famMemAge: famMemAge,
           famMemGender: famMemGender,famMemRelation:famMemRelation, patient : username}
       const familyMember = await familyMemberModel.create(newfamilyMember);
       await familyMember.save();
           res.status(200).json({message: "Family member created successfully"})

   }
   catch(err){
             res.json({message: err.message})}


             
  
}

const viewRegFamilyMembers = async(req,res)=>{

   const username = req.params.id;
   try{
    const famMembers = await familyMemberModel.find({patient: mongoose.Types.ObjectId(username)}).populate({path: 'patient'});
    res.status(200).send(famMembers);
}
   
    catch(error){
    res.status(400).json({message: error.message})
    }

}
const getDoctorName = async(req,res)=>{

    const username = req.params.id;
    try{
     const doctor = await userModel.findById(username);
     res.status(200).send(doctor);
 }
    
     catch(error){
     res.status(400).json({message: error.message})
     }
 
 }

const viewAppointments = async(req,res)=>{

    try{
     const Appointments = await appointmentsModel.find();
     res.status(200).send(Appointments);
 }
    
     catch(error){
     res.status(400).json({message: error.message})
     }
 
 }

const filterAppointmentsDate = async(req,res)=>{
   try{
       const Appointments = await appointmentsModel.find({date :req.params.date})
       res.status(200).json(Appointments)
   }
   catch(error){
       res.status(400).json({message: error.message})
       }
 
}
const filterAppointmentsStatus = async(req,res)=>{
  
   try{
       const Appointments = await appointmentsModel.find({status :req.params.status})
       res.status(200).json(Appointments)
   }
   catch(error){
       res.status(400).json({message: error.message})
       }
 
}

module.exports = {addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,filterAppointmentsStatus,getDoctorName}
