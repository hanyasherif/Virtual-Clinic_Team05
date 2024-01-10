// #Task route solution
const userModel = require('../Models/User.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const appointmentsModel = require('../Models/Appointment.js');
const contractModel = require('../Models/EmploymentContract.js');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
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

   async function sendEmail(email,date,message){
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
    subject: 'Test Email from Mailtrap',
    text: message+" " + date,
    };
    
    try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    }
    catch(err){
        console.error('Error sending email:', err);
        throw err;
    }
  };

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
 try{ 
    const patient = await userModel.findOne(patient);
    const email = patient.email;
    sendEmail(email,date);
  }
  catch(err){
    throw err;
  }

             
  
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
 function isValidObjectId(str) {
  // Check if the string is a 24-character hexadecimal string
  return /^[0-9a-fA-F]{24}$/.test(str);
}
// Add this method in the backend
const modifyAppointment = async (req, res) => {
   try {
     const appointmentId = req.body.appointmentId;
       const patientId = req.body.patientId;
       const patient = await userModel.findById(patientId);
       const email = patient.email;
       
 
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
     console.log(email);
     sendEmail(email,appointment.date,"Your Appointment Has Been Confirmed on");
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
  let status = "Free";
  let price = doctor.hourlyRate + contract.markup;
  try{
    const newApp = {date: date, doctor: doctorId,  price: price, status: status}
    const Appo = await appointmentsModel.create(newApp);
    await Appo.save();
        res.status(200).json({message: "Appointment created successfully"})

}
catch(err){
          res.json({message: err.message})}

};

const getDoctorAppointments = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const doctorId= decodedToken.user._id
    console.log(doctorId);
    const appointment = await appointmentsModel.find({doctor: doctorId });
    if (!appointment) {
      return res.status(404).json({ message: "appointment not found" });
    }
    console.log(appointment);
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDoctorAppointmentWithPatient = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const doctorId= decodedToken.user._id
    const patientId = req.query.patientId;
    console.log(doctorId);
    const appointment = await appointmentsModel.find({doctor: doctorId , patient: patientId }).populate('patient');;
    if (!appointment) {
      return res.status(404).json({ message: "appointment not found" });
    }
    console.log(appointment);
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const CancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.query.appointmentId;
 
 
    const appointment = await appointmentsModel.findById(appointmentId);
 
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    const patient = await userModel.findById(appointment.patient);
    let price =appointment.price;
    if(patient.package)
    {
      
        if(patient.package ==="Silver")
          price=appointment.price- (appointment.price * 0.4);
        
        else if(patient.package ==="Gold")
        price=patient.price- (appointment.price * 0.6);

        else
        price=appointment.price- (appointment.price * 0.8);
      
    }
    patient.walletInfo = patient.walletInfo+ price;
    

    // Save the modified appointment
    await patient.save();
    appointment.status = "Cancelled";
    await appointment.save();
    const date = appointment.date;
    const email = patient.email;
    sendEmail(email, date,"Your Appointment Has Been Canceled on");
    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const AppointmentCompleted = async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    

    // Fetch the specific appointment using the appointmentId
    const appointment = await appointmentsModel.findById(appointmentId);

    // Check if the appointment exists
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the appointment with the new patientId
    appointment.status = "Completed"

    // Save the modified appointment
    await appointment.save();
    console.log("s");
    console.log(appointment);
    res.status(200).json({ message: "Appointment updated Completed successfully", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const rescheduleAppointmentForP = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const userid= decodedToken.user._id;
    const appointmentId = req.query.appointmentId;     
    const existingAppointment = await appointmentsModel.findById(appointmentId);
    const patientId = existingAppointment.patient;
    const patient = await userModel.findById(existingAppointment.patient);
    const newDate = req.query.newDate;
    const email =patient.email;
    if (!existingAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    let parsedNewDate = new Date(newDate);

    if (isNaN(parsedNewDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format for newDate." });
    }

    let conflictingAppointment = await appointmentsModel.findOne({
      $or: [
        { patient: patientId, date: parsedNewDate },
        { doctor: existingAppointment.doctor, date: parsedNewDate }
      ]
    });

    while (conflictingAppointment) {
      console.log('There is another Appointment exists in the same time:', conflictingAppointment);

      const newFollowUpDate = new Date(conflictingAppointment.date.getTime() + 60 * 60 * 1000);

      parsedNewDate = newFollowUpDate;

      const updatedAppointment = await appointmentsModel.findOne({
        $or: [
          { patient: patientId, date: parsedNewDate },
          { doctor: existingAppointment.doctor, date: parsedNewDate }
        ]
      });

      conflictingAppointment = updatedAppointment;
    }

    const updatedAppointment = await appointmentsModel.findOneAndUpdate(
      { _id: appointmentId },
      { $set: { status: "Rescheduled", date: parsedNewDate } },
      { new: true }
    );

    sendEmail(email,parsedNewDate);
    res.status(200).json({ message: "Appointment rescheduled successfully", appointment: updatedAppointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
const requestFollowUpAppointment = async (req, res) => {
  try
  {
    const appointmentId = req.query.appointmentId;
    const newDate = req.query.newDate;
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const patientId= decodedToken.user._id;
    const appointment = await appointmentsModel.findById(appointmentId)
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    appointment.followUp = true;
    console.log("DATEEE" + newDate)
    appointment.followUpDate = newDate;
    appointment.save();
    //
    res.status(200).json({ message: "Request sent Successfully" });

  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const viewFollowUpRequests = async (req, res) => {
  try
  {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const doctorId= decodedToken.user._id;
    console.log("ww")
    const patientId= req.query.Id
  
    const appointments = await appointmentsModel.findOne({_id:patientId , followUp:true});
    if (!appointments) {
      return res.status(200).json({ message: 'You have no requests for a followUp.' });
    }
    res.status(200).json(appointments);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
  

  
}

const acceptFollowUpRequest = async (req, res) => {
  const appointmentId = req.query.appointmentId;
 
  // const patient = await userModel.findById(patientId);
  // const doctor = await userModel.findById(appointment.doctor);
  const appointment = await appointmentsModel.findById(appointmentId)
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
   const patient = await userModel.findById(appointment.patient);
  const doctor = await userModel.findById(appointment.doctor);

  let appointmentDate = await appointmentsModel.findOne({date:appointment.followUpDate , doctor: appointment.doctor});
  if(appointmentDate){
    res.status(404).json({ message: "There is an appointment already scheduled for this date" });
  }
  appointment.followUp = false;
  sendEmail(patient.email,"Your request for a follow up on the appointment with Dr. " + doctor.name + " on Date : " + appointment.date + " has been accepted your new Appointment is now on "+ appointment.followUpDate);
  

  const newAppointment = new appointmentsModel({
      date: appointment.followUpDate,
      doctor: appointment.doctor,
      patient: appointment.patient,
      status: 'Upcoming', 
      price:appointment.price
  });

   await newAppointment.save();
  //appointment.date=appointment.followUpDate;
  appointment.followUp = false;
  appointment.followUpDate = null;
  //appointment.status="Upcoming";
  appointment.save();
  return res.status(200).json({ message: 'Appointment Accepted ' });

}

const rejectFollowUpRequest = async (req, res) => {
  const appointmentId = req.query.appointmentId;
  const appointment = await appointmentsModel.findById(appointmentId)
 

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  const patient = await userModel.findById(appointment.patient);
  const doctor = await userModel.findById(appointment.doctor);
  sendEmail(patient.email,"Your request for a follow up on the appointment with Dr. " + doctor.name + " on Date : " + appointment.date + " has been rejected");
  appointment.followUp = false;
  appointment.followUpDate = null;
  appointment.save();

return res.status(200).json({ message: 'Appointment Rejected ' });
}
module.exports = {addAppointment,createAppointment,getAppointmentInfo,modifyAppointment,getDoctorAppointments,AppointmentCompleted
,rescheduleAppointmentForP,CancelAppointment,viewFollowUpRequests,acceptFollowUpRequest,rejectFollowUpRequest,requestFollowUpAppointment,getDoctorAppointmentWithPatient};
