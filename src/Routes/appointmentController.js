// #Task route solution
const userModel = require('../Models/User.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const appointmentsModel = require('../Models/Appointment.js');
const contractModel = require('../Models/EmploymentContract.js');

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
   let price = doctor.hourlyRate;
   try{
       const newApp = {date: date, doctor: doctor, patient: patient,status:status, price: price}
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

// Add this method in the backend
const modifyAppointment = async (req, res) => {
   try {
     const appointmentId = req.body.appointmentId;
     const patientId = req.body.patientId;
 
     // Fetch the specific appointment using the appointmentId
     const appointment = await appointmentsModel.findById(appointmentId);
 
     // Check if the appointment exists
     if (!appointment) {
       return res.status(404).json({ message: "Appointment not found" });
     }
 
     // Update the appointment with the new patientId
     appointment.patient = patientId;
     appointment.status = "Upcoming"
 
     // Save the modified appointment
     await appointment.save();
 
     res.status(200).json({ message: "Appointment updated successfully", appointment });
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 };
 
 const createAppointment = async (req, res) => {
  const doctorId = req.params.id;
  const contract = await contractModel.findOne({doctorId:doctorId})
  const doctor = await userModel.findById(doctorId);
  if(!contract || contract.status === "REJECTED" || contract.status === 'PENDING'){
     
      res.status(200).json({message:"You can't add appointment, your contract is not accepted"})
      return;
  }
 
 

  let date = req.body.date;
  let price = doctor.hourlyRate + contract.markup;
  try{
    const newApp = {date: date, doctor: doctorId,  price: price}
    const Appo = await appointmentsModel.create(newApp);
    await Appo.save();
        res.status(200).json({message: "Appointment created successfully"})

}
catch(err){
          res.json({message: err.message})}

};
 
module.exports = {addAppointment,createAppointment,getAppointmentInfo,modifyAppointment}
