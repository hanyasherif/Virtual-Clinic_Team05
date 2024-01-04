// #Task route solution
const userModel = require('../Models/User.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const appointmentsModel = require('../Models/Appointment.js');
const contractModel = require('../Models/EmploymentContract.js');
const jwt = require("jsonwebtoken");

const addAdminstrator = async(req,res) => {
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
async function GetPatientEmail(id){
  try{const user = await userModel.findById(id);
   if (!user) {return;}
   return user.email;
  } 
  catch (err) {return err;}
}
async function sendEmailForAppointmentReschudle(email,date) { //Reschedulled Email
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "seifkandel3@gmail.com",
          pass: "c x o d r z b m d n u s y f p r",
      },
  });  
  const mailOptions = {
  from: 'sender@example.com',
  to: email, 
  subject: 'Email from Clinic',
  text: "Your Appointment Has Been ReSchedulled on new Date :" + date,
  };
  
  try {
  let info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);
  } catch (err) {
  console.error('Error sending email:', err);
  throw  err;
    }
  };

async function sendEmailForAppointmentCancellation(email,date) {//Cancellation Email
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "seifkandel3@gmail.com",
          pass: "c x o d r z b m d n u s y f p r",
      },
  });  
  const mailOptions = {
  from: 'sender@example.com',
  to: email, 
  subject: 'Email from Clinic',
  text: "Your Appointment Has Been Cancelled  on" + date,
  };
  
  try {
  let info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);
  } catch (err) {
  console.error('Error sending email:', err);
  throw  err;
    }
  };
async function sendEmailForAppointment(email,date) { //confirmation email for the appointment
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "seifkandel3@gmail.com",
          pass: "c x o d r z b m d n u s y f p r",
      },
  });  
  const mailOptions = {
  from: 'sender@example.com',
  to: email, 
  subject: 'Email from Clinic',
  text: "Your Appointment Has Been Created Successfully on" + date,
  };
  
  try {
  let info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);
  } catch (err) {
  console.error('Error sending email:', err);
  throw  err;
    }
  };
const addAppointment = async(req,res)=>{
   let doctor = req.body.doctor //bn-pass bl session
   let date = req.body.date;
   let status = req.body.status;
   let patient = req.body.patient;
   let price = doctor.hourlyRate;
   GetPatientEmail(patient)
   .then(email => {
    sendEmailForAppointment(email,date);
  })
   .catch(err => {
     console.error(err); 
    });
    try{
       const newApp = {date: date, doctor: doctor, patient: patient,status:status, price: price}
       const Appo = await appointmentsModel.create(newApp);
       await Appo.save();
           res.status(200).json({message: "Appointment created successfully"})
   }
   catch(err){
             res.json({message: err.message})}
}
const CancelAppointmentAsPatient= async(req,res)=>{
  const appointmentId = req.query.appointmentId; 
  const appoint = getAppointmentInfo1(appointmentId);
  const patientId = appoint.patient;
  const date = appoint.date;
  GetPatientEmail(patientId)
  .then(email => {
    sendEmailForAppointmentCancellation(email,date)
 })
  .catch(err => {
    console.error(err); 
  });

  try {
    const appointment = await appointmentsModel.findByIdAndDelete(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "appointment not found" });
    }
  } catch (err) {
    console.error(err); 
  }
}
async function getAppointmentInfo1(appointmentId){
  try {
    const appointment = await appointmentsModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
 function isValidObjectId(str) {
  // Check if the string is a 24-character hexadecimal string
  return /^[0-9a-fA-F]{24}$/.test(str);
}
// Add this method in the backend
const modifyAppointment = async (req, res) => {
   try {
     const appointmentId = req.body.appointmentId;
     const patientId = req.body.patientId;
     if(patientId=='6543f2e0d09148f82f46195d')
     {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
        const patientId= decodedToken.user._id
     }
 
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
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
    const doctorId= decodedToken.user._id

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
 
module.exports = {addAppointment,createAppointment,getAppointmentInfo,modifyAppointment,CancelAppointmentAsPatient}
