const userModel = require('../Models/User.js');
const AppointmentModel = require('../Models/Appointment.js');
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken");

const ViewPatients = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  let DoctorId = decodedToken.user._id;
  const uniquePatients = new Set(); // Set to store unique patient IDs
  const patientDetails = [];

  AppointmentModel.find({ doctor: DoctorId })
    .populate({
      path: 'patient',
      select: '_id username name email dateOfBirth emergencyContactFullname emergencyContactMobileNumber gender famMemName famMemNatID famMemAge famMemRelation HealthRecord',
    })
    .exec((err, appointments) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      } else {
        console.log('Appointments before population:', appointments);
        appointments.forEach((appointment) => {
          if (appointment.patient && !uniquePatients.has(appointment.patient._id)) {
            uniquePatients.add(appointment.patient._id);
            const patientDetail = {
              _id: appointment.patient._id,
              username: appointment.patient.username,
              name: appointment.patient.name,
              dateOfBirth: appointment.patient.dateOfBirth,
              email: appointment.patient.email,
              gender: appointment.patient.gender,
              famMemName: appointment.patient.famMemName,
              famMemNatID: appointment.patient.famMemNatID,
              famMemRelation: appointment.patient.famMemRelation,
              famMemAge: appointment.patient.famMemAge,
              emergencyContactFullname: appointment.patient.emergencyContactFullname,
              emergencyContactMobileNumber: appointment.patient.emergencyContactMobileNumber,
              HealthRecord: appointment.patient.HealthRecord,
            };
            patientDetails.push(patientDetail);
          }
        });
        return res.json(patientDetails);
      }
    });
};

const SearchPatient = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const doctorId = decodedToken.user._id;
    const patientName = req.query.name;

    // Step 1: Find patient ID based on patient name
    const patient = await userModel.findOne({
      name: { $regex: new RegExp(`^${patientName}$`, 'i') }
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    const patientId = patient._id;

    // Step 2: Retrieve appointment based on doctor ID and patient ID
    const appointment = await AppointmentModel.findOne({
      doctor: doctorId,
      patient: patientId
    }).populate({
      path: 'patient',
      select: '_id username name email dateOfBirth emergencyContactFullname emergencyContactMobileNumber gender famMemName famMemNatID famMemAge famMemRelation HealthRecord'
    }).exec();

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    const patientDetails = {
      _id: appointment.patient._id,
      username: appointment.patient.username,
      dateOfBirth: appointment.patient.dateOfBirth,
      email: appointment.patient.email,
      gender: appointment.patient.gender,
      famMemName: appointment.patient.famMemName,
      famMemNatID: appointment.patient.famMemNatID,
      famMemRelation: appointment.patient.famMemRelation,
      famMemAge: appointment.patient.famMemAge,
      emergencyContactFullname: appointment.patient.emergencyContactFullname,
      emergencyContactMobileNumber: appointment.patient.emergencyContactMobileNumber,
      HealthRecord: appointment.patient.HealthRecord,
    };

    return res.json([patientDetails]);
  } catch (err) {
    console.error('Error searching for patient:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

const GetPFullData = async (req, res) => {//for Getting All Info
  try {
 
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
   
    let doctorId= decodedToken.user._id
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
   
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
 
  let DoctorId= decodedToken.user._id
    const updatedDoc = {};
  console.log("Doc Email Test: "+req.query.email);

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
    console.log("DocTest"+updatedDoc.email);
    res.json({ message: 'Doctor  updated successfully', doctor: updatedDoc });
  } catch (err) {
    res.status(400).json({ error:err.message});
  }

}
const filteredAppointments = async (req, res) => {
  const currentDate = new Date();
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  const doctorId= decodedToken.user._id 

  try {
    const AllNewAppointments = await AppointmentModel.find({
      doctor: doctorId, 
      // date: { $gte: currentDate },
    }).populate('patient');

    if (!AllNewAppointments || AllNewAppointments.length === 0) {
      return res.status(404).json({ message: 'No upcoming appointments with this doctor' });
    }

    res.status(200).json(AllNewAppointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const AddNewHR = async (req, res) => {
  let PatientId = req.body.PatientId;
  const newHealthRecords = [req.body.HealthRecord] || [];                 

  try {
    // Log the received ID
    console.log('Received ID:', PatientId);

    // Attempt to find the user by ID
    const existingPatient = await userModel.findById(PatientId);

    if (!existingPatient) {
      console.log(`Patient with ID ${PatientId} not found.`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Log the found user
    console.log('Found User:', existingPatient);

    // Continue with the update logic
    const updatedPatient = await userModel.findOneAndUpdate(
      { _id: PatientId },
      { $push: { HealthRecord: { $each: newHealthRecords } } },
      { new: true }
    );

    // Log the updated user
    console.log('Updated User:', updatedPatient);

    console.log(`Health records added for patient with ID ${PatientId}.`);
    res.json({
      message: 'New health records added successfully',
      patient: updatedPatient,
    });
  } catch (err) {
    // Log any errors that occur
    console.error('Error:', err);
    res.status(400).json({ error: err.message });
  }
};





const scheduleFollowUp = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const doctorId= decodedToken.user._id
      let followUpDate = req.body.FollowUpDate;
      
      const patientId = req.body.PatientId;
      console.log("ss"+req.body.AppointmentId)
      let appointment = await AppointmentModel.findById(req.body.AppointmentId);
      if (!appointment) {
        res.status(404).json({ message: "why" });
      }
      let appointmentDate = await AppointmentModel.findOne({date:followUpDate , doctor: doctorId});
      if(appointmentDate){
        res.status(404).json({ message: "There is an appointment already scheduled for this date" });
      }

      

      const newAppointment = new AppointmentModel({
          date: followUpDate,
          doctor: doctorId,
          patient: patientId,
          status: 'Upcoming', 
          price:appointment.price
      });

      await newAppointment.save();


      res.status(200).json({
          message: 'Follow-up appointment scheduled successfully',
          
      });
  } catch (err) {
      console.error('Error:', err);
      res.status(400).json({ error: err.message });
  }
};








const ViewUpdatedHRforD = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  const Id= decodedToken.user._id


  try {
    const user = await userModel.findById(Id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.type === 'Patient') {
      try {
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, 'supersecret');
        const patientId= decodedToken.user._id
      

        const patient = await userModel.findById(patientId);

        if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
        }

        if (!patient.HealthRecord || patient.HealthRecord.length === 0) {
          return res.json({ message: 'No health records found for the patient' });
        }
        const healthRecordsByPatient = [];
        healthRecordsByPatient.push({
          name: patient.name,
          patientId: patient._id,
          healthRecords: patient.HealthRecord
        });
        res.json({ healthRecordsByPatient });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    if (user.type === 'Doctor') {
      try {
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, 'supersecret');
        const doctorId= decodedToken.user._id

        const appointments = await AppointmentModel.find({ doctor: doctorId });

        if (!appointments || appointments.length === 0) {
          return res.json({ message: 'No appointments found for the doctor' });
        }

        const patientIds = Array.from(new Set(appointments.map(appointment => appointment.patient)));

        const healthRecordsByPatient = [];
        for (const patientId of patientIds) {
          const patient = await userModel.findById(patientId);
          if (patient && patient.HealthRecord && patient.HealthRecord.length > 0) {
            healthRecordsByPatient.push({
              name: patient.name,
              patientId: patient._id,
              healthRecords: Array.from(new Set(patient.HealthRecord))
            });
          }
        }

        res.json({ healthRecordsByPatient });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    //return res.status(404).json({ message: 'Invalid user type' });

  } catch (error) {
    console.error('Error checking if user can view health records:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {ViewPatients,EditMyInfo,SearchPatient,filteredAppointments,GetPFullData , scheduleFollowUp , ViewUpdatedHRforD ,AddNewHR}