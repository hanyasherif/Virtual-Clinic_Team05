const userModel = require('../Models/User.js');
const AppointmentModel = require('../Models/Appointment.js');
const { default: mongoose } = require('mongoose');
const ViewPatients = async(req,res) => {
let DoctorId=req.query.Id;
AppointmentModel.find({ doctor: DoctorId })
  .populate({
    path:'patient',
    select:'_id username name email dateOfBirth emergencyContactFullname emergencyContactMobileNumber gender famMemName famMemNatID famMemAge famMemRelation HealthRecord',
  }) 

  .exec((err, appointments) => {
    if (err) {
       return  res.status(400).json({error:err.message})
    }
    else{
      //console.log(appointments.patient)
        const patientDetails = appointments.map(appointment => ({
          _id:appointment.patient._id,  
        username: appointment.patient.username,
        dateOfBirth: appointment.patient.dateOfBirth,
          email:appointment.patient.email,
          gender: appointment.patient.gender,
          famMemName: appointment.patient.famMemName,
          famMemNatID: appointment.patient.famMemNatID,
          famMemRelation: appointment.patient.famMemRelation,
          famMemAge: appointment.patient.famMemAge,
          emergencyContactFullname:appointment.patient.emergencyContactFullname,
          emergencyContactMobileNumber:appointment.patient.emergencyContactMobileNumber,
          HealthRecord:appointment.patient.HealthRecord,
          }));   
          return res.json(patientDetails);
    }
}
    )
}
const SearchPatient = async(req,res) =>{//SearchByName
   
  let doctorId=req.query.Id;
  const patientName = req.query.name;
  AppointmentModel.find({ doctor: doctorId })
  .populate({
    path: 'patient',
    select:'_id username name email dateOfBirth emergencyContactFullname emergencyContactMobileNumber gender famMemName famMemNatID famMemAge famMemRelation HealthRecord',
    match: { name: { $regex: `^${patientName}$`, $options: 'i' },}
  }).exec((err, appointments) => {
      if (err) {
          return  res.status(400).json({error:err.message})
      }
      const patientDetails = appointments
        .filter(appointment => appointment.patient !== null)
        .map(appointment => ({
        _id:appointment.patient._id,  
        username: appointment.patient.username,
        dateOfBirth: appointment.patient.dateOfBirth,
        email:appointment.patient.email,
        gender: appointment.patient.gender,
        famMemName: appointment.patient.famMemName,
        famMemNatID: appointment.patient.famMemNatID,
        famMemRelation: appointment.patient.famMemRelation,
        famMemAge: appointment.patient.famMemAge,
        emergencyContactFullname:appointment.patient.emergencyContactFullname,
        emergencyContactMobileNumber:appointment.patient.emergencyContactMobileNumber,
        HealthRecord:appointment.patient.HealthRecord,
        }));
      return res.json(patientDetails);
    });
   
 }
const GetPFullData = async (req, res) => {//for Getting All Info
  try {
    const doctorId = req.query.Id;
    const patientId = req.query.Id1;
    if (!doctorId || !patientId) {
      return res.status(400).json({ error: 'Missing doctorId or patientId in the query parameters' });
    }
    const appointments = await AppointmentModel.find({ doctor: doctorId })
      .populate({
        path: 'patient',
        select:'_id username name email dateOfBirth emergencyContactFullname emergencyContactMobileNumber gender famMemName famMemNatID famMemAge famMemRelation HealthRecord',
        match: { _id: patientId, },
      })
      .exec();
    if (!appointments) {
      return res.status(404).json({ message: 'No appointments found for the given patient' });
    }
    const patientDetails = appointments
      .filter(appointment => appointment.patient !== null)
      .map(appointment => ({
        _id:appointment.patient._id,  
        username: appointment.patient.username,
        dateOfBirth: appointment.patient.dateOfBirth,
          email:appointment.patient.email,
          gender: appointment.patient.gender,
          famMemName: appointment.patient.famMemName,
          famMemNatID: appointment.patient.famMemNatID,
          famMemRelation: appointment.patient.famMemRelation,
          famMemAge: appointment.patient.famMemAge,
          emergencyContactFullname:appointment.patient.emergencyContactFullname,
          emergencyContactMobileNumber:appointment.patient.emergencyContactMobileNumber,
          HealthRecord:appointment.patient.HealthRecord,
       // name: appointment.patient.name,
        //email: appointment.patient.email,
      }));

    return res.status(200).json(patientDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred', error: err.message });
  }
};

const EditMyInfo = async(req,res) =>{
    let DoctorId=req.query.Id;
    const updatedDoc = {};

if (req.query.email) {
    updatedDoc.email = req.query.email;
}

if (req.query.hourlyRate) {
    updatedDoc.hourlyRate = req.query.hourlyRate;
}

if (req.query.affiliation) {
    updatedDoc.affiliation = req.query.affiliation;
}
try {
    const updatedDoctor = await userModel.findByIdAndUpdate(DoctorId, { $set: updatedDoc }, { new: true });
    res.json({ message: 'Doctor  updated successfully', doctor: updatedDoc });
  } catch (err) {
    res.status(400).json({ error:err.message});
  }

}
const filteredAppointments = async (req, res) => {
  const currentDate = new Date();
  const doctorId = req.query.Id;

  try {
    const AllNewAppointments = await AppointmentModel.find({
      doctor: doctorId, 
      date: { $gte: currentDate },
    });

    if (!AllNewAppointments || AllNewAppointments.length === 0) {
      return res.status(404).json({ message: 'No upcoming appointments with this doctor' });
    }

    res.status(200).json(AllNewAppointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {ViewPatients,EditMyInfo,SearchPatient,filteredAppointments,GetPFullData}