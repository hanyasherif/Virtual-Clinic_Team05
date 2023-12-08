// #Task route solution
const userModel = require('../Models/User.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const appointmentsModel = require('../Models/Appointment.js');

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



const addAppointment = async(req,res)=>{
   let doctor = req.body.doctor //bn-pass bl session
  
   
   let date = req.body.date;
   let status = req.body.status;
   let patient = req.body.patient;
   try{
       const newApp = {date: date, doctor: doctor, patient: patient,status:status}
       const Appo = await appointmentsModel.create(newApp);
       await Appo.save();
           res.status(200).json({message: "Appointment created successfully"})

   }
   catch(err){
             res.json({message: err.message})}


             
  
}
const getAppointmentInfo = async (req, res) => {
   try {
     const appointmentId = req.query.appointmentId; // Change from req.params.doctorId to req.query.doctorId
     console.log(appointmentId);
     const appointment = await appointmentsModel.findById(appointmentId);
     if (!appointment) {
       return res.status(404).json({ message: "appointment not found" });
     }
     console.log(appointment);
     res.status(200).json(appointment);
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 };


module.exports = {addAppointment,getAppointmentInfo}
