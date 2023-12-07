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

//Menna

const filterAppointments = async (req, res) => {
  const { date, status } = req.body;

  try {
    let appointments;

    if (date && status) {
      // Filter appointments by both date and status
      appointments = await appointmentsModel.find({
        date,
        status,
      }).populate('doctor').populate('patient');
    } else if (date) {
      // Filter appointments by date
      appointments = await appointmentsModel.find({
        date,
      }).populate('doctor').populate('patient');
    } else if (status) {
      // Filter appointments by status
      appointments = await appointmentsModel.find({
        status,
      }).populate('doctor').populate('patient');
    } else {
      // No filters provided, return all appointments
      res.status(200).json();
    }

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const viewMyAppointments = async (req, res) => {
  const { userType, userId } = req.body;

  try {
    let appointments;

    if (userType === 'patient') {
      // Fetch both upcoming and past appointments for the patient
      const currentDate = new Date();
      const upcomingAppointments = await appointmentsModel.find({
        patient: userId,
        date: { $gte: currentDate }, // Upcoming appointments
      }).populate('doctor');

      const pastAppointments = await appointmentsModel.find({
        patient: userId,
        date: { $lt: currentDate }, // Past appointments
      }).populate('doctor');

      appointments = { upcoming: upcomingAppointments, past: pastAppointments };
    } else if (userType === 'doctor') {
      // Fetch both upcoming and past appointments for the doctor
      const currentDate = new Date();
      const upcomingAppointments = await appointmentsModel.find({
        doctor: userId,
        date: { $gte: currentDate }, // Upcoming appointments
      }).populate('patient');

      const pastAppointments = await appointmentsModel.find({
        doctor: userId,
        date: { $lt: currentDate }, // Past appointments
      }).populate('patient');

      appointments = { upcoming: upcomingAppointments, past: pastAppointments };
    } else {
      res.status(400).json({ message: 'Invalid user type provided' });
      return;
    }

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// const filterAppointmentsDate = async(req,res)=>{
//   try{
//       const Appointments = await appointmentsModel.find({date :req.params.date})
//       res.status(200).json(Appointments)
//   }
//   catch(error){
//       res.status(400).json({message: error.message})
//       }

// }
// const filterAppointmentsStatus = async(req,res)=>{
 
//   try{
//       const Appointments = await appointmentsModel.find({status :req.params.status})
//       res.status(200).json(Appointments)
//   }
//   catch(error){
//       res.status(400).json({message: error.message})
//       }

// }

module.exports = {addAppointment,filterAppointments,viewMyAppointments}
