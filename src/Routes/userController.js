// #Task route solution
const userModel = require('../Models/User.js');
const PrescriptionModel = require('../Models/Prescription.js');
const appointmentModel = require('../Models/Appointment.js');
const PackageModel = require('../Models/Package.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const appointmentsModel = require('../Models/Appointment.js');
const AppointmentModel = require('../Models/Appointment.js');
 

//////////////////////HANYA////////////////////////////////////////////
const addAdministrator = async(req,res) => {
   //add a new user to the database with 
   //Name, Email and Age
   let username = req.body.username
   let password = req.body.password

   try{
      let user = await userModel.create({type: "Administrator",username: username, password: password})
      await user.save()
      res.status(200).json({message: "Administrator created successfully"})
   }
   catch(err){
      res.json({message: err.message})
   }
      
   }

   const removeUser = async (req, res) => {
      let userID = req.query.userID;
  
      try {
         const deletedUser = await userModel.findByIdAndDelete(userID);
   
         if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
         }
   
         res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
      } catch (err) {
         res.status(500).json({ message: err.message });
      }
   }
  
   const checkUsername = async (req, res) => {
     try {
       const username = req.body.username;
   
       // Check if the username exists in the database
       const existingUser = await userModel.findOne({ username });
   
       if (existingUser) {
         // If a user with the same username exists, respond with not unique
         res.status(200).json({ isUnique: false });
       } else {
         // If the username is unique, respond with unique
         res.status(200).json({ isUnique: true });
       }
     } catch (error) {
       console.error('Error checking username uniqueness:', error);
       res.status(500).json({ isUnique: false }); // Assume not unique in case of an error
     }
   };
  
   const getUsers = async (req, res) => {
      
      try {
         // const users = await userModel.find({});
         const users = await userModel.find({
            type: { $in: ["Patient", "Doctor", "Administrator"] }
          })
          .sort({ createdAt: -1 });            
          res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        } 
     }

   //   search for a doctor by name and/or speciality 

   const searchByName = async (req, res) => {
      try {
        const { name } = req.query;
    
        // Create a regular expression with 'i' option for case-insensitive search
        const regexName = new RegExp(name, 'i');
    
        const results = await userModel.find({
          name: { $regex: regexName },
          type: "Doctor"
        });
    
        res.status(200).json(results);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };

    const searchBySpec = async (req, res) => {
      try {
        const { speciality } = req.query;
    
        // Create a regular expression with 'i' option for case-insensitive search
        const regexSpeciality = new RegExp(speciality, 'i');
    
        const results = await userModel.find({
          docSpeciality: { $regex: regexSpeciality },
          type: "Doctor"
        });
    
        res.status(200).json(results);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };
 
    const searchByNameSpec = async (req, res) => {
      try {
        const { name, speciality } = req.query;
    
        // Create regular expressions with 'i' option for case-insensitive search
        const regexName = new RegExp(name, 'i');
        const regexSpeciality = new RegExp(speciality, 'i');
    
        const results = await userModel.find({
          name: { $regex: regexName },
          docSpeciality: { $regex: regexSpeciality },
          type: "Doctor"
        });
    
        res.status(200).json(results);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };

    const filterSpecs = async(req,res) => {
      
      const spec = req.params.spec;
      // check if userId is not empty
      if(spec){
         const docs = await userModel.find({docSpeciality: spec});
         res.status(200).json(docs)
      }else{
          res.status(400).json({error:"not found"})
      }
  }

   const filterByDate = async (req, res) => {
      const date = req.params.date;
      console.log(date);
    
      if (date) {
        // Find appointments for the specified date and populate the 'doctor' field
        const appointments = await appointmentModel
          .find({ date: date, status: true })
          .populate("doctor");
    
        // Extract unique doctors from the filtered appointments
        const doctors = [...new Set(appointments.map((appointment) => appointment.doctor))];

        res.status(200).json(doctors);
      } else {
        res.status(400).json({ error: "Date not provided" });
      }
    };

    const filterDateSpecs = async (req, res) => {
      const { date, spec } = req.query;
    
      if (date) {
        // Find appointments for the specified date and populate the 'doctor' field
        const appointments = await appointmentModel
          .find({ date: date, status: true })
          .populate("doctor");
    
        // Extract unique doctors from the filtered appointments
        const doctors = [...new Set(appointments.map((appointment) => appointment.doctor))];

        if(spec){
         const filteredDoctors = doctors.filter((doctor) => doctor.docSpeciality === spec);
         res.status(200).json(filteredDoctors)
         }else{
            res.status(400).json({error:"not found"})
         }
      }
    };
    

      const viewDoctors = async (req, res) => {
         try {
           const doctors = await userModel.find({ type: "Doctor" });
       
           // Filter out doctors with null or undefined docSpeciality
           const filteredDoctors = doctors.filter((doctor) => doctor.docSpeciality !== null && doctor.docSpeciality !== undefined);
       
           res.status(200).json(filteredDoctors);
         } catch (err) {
           res.status(500).json({ message: err.message });
         }
       };
       

      const getDoctorInfo = async (req, res) => {
         try {
           const doctorId = req.query.doctorId; // Change from req.params.doctorId to req.query.doctorId
           console.log(doctorId);
           const doctor = await userModel.findById(doctorId);
           if (!doctor) {
             return res.status(404).json({ message: "Doctor not found" });
           }
           console.log(doctor);
           res.status(200).json(doctor);
         } catch (err) {
           res.status(500).json({ message: err.message });
         }
       };

       const getSpecs = async (req, res) => {
         try {
           const doctors = await userModel.find({ type: "Doctor" });
       
           // Create an array to store unique docSpeciality values
           const docSpecialities = [];
       
           // Loop through the doctors and extract docSpeciality
           doctors.forEach((doctor) => {
             const { docSpeciality } = doctor;
       
             // Check if the docSpeciality is not null or undefined and is not already in the docSpecialities array
             if (docSpeciality != null && !docSpecialities.includes(docSpeciality)) {
               docSpecialities.push(docSpeciality);
             }
           });
       
           res.status(200).json(docSpecialities);
         } catch (err) {
           res.status(500).json({ message: err.message });
         }
       };

//////////////////////////////////HANYA SPRINT 2////////////////////////////////////////////

const logout = async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({message: 'Logout successful'});
}

const viewAppointmentsOfDoctor = async(req,res) => { 

  try{
    const doc = await userModel.findById(req.params.docID);
    const appointments = await appointmentModel.find({doctor:doc});
    
    res.status(200).json(appointments)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
}
//////////////////////////////////MOHAB//////////////////////////////////
////// Register Patient 

const registerPatient=async (req,res)=>
{
   try{

        
            const att = req.body;
            const requiredAttributes = ['name', 'email', 'dateOfBirth','gender','mobileNumber','emergencyContactFullname','emergencyContactMobileNumber'];
            const missingAttributes = requiredAttributes.filter(attr => !att[attr]);
             if (missingAttributes.length > 0) {
                  return res.status(400).json({ error: `The following attributes are required: ${missingAttributes.join(', ')}` });
               }
              
           
           
            
            if(await findPatientByUsername(req.body.username))
            {
               res.status(404).json({ error: 'Username already exists.' });
               return;
            }  
           


            let patient = await userModel.create({type:"Patient", username: req.body.username , name : req.body.name , email: req.body.email , 
             password: req.body.password , dateOfBirth : req.body.dateOfBirth , gender : req.body.gender, mobileNumber : req.body.mobileNumber,
              emergencyContactFullname:  req.body.emergencyContactFullname,  emergencyContactMobileNumber: req.body.emergencyContactMobileNumber})
             await patient.save();
             res.status(200).json({message: "Patient Registered Succesfully" });
            }
            catch (err) {
                  res.status(500).json({ message: err.message });
            }
   
  
}


const findPatientByUsername= async(username)=>
{
    try{
        const patient= await userModel.findOne({username: username});
        if(!patient)
        {
            return false;
        }
        else
        {
            return true;

        }
    }
    catch (err) {
        return false; 
    }
}

const deleteUser = async (req, res) => {
   const username = req.params.username; 

   try {
      const deletedUser = await userModel.findOneAndDelete({username:username});

      if (!deletedUser) {
         return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

//////////////////////////////////Aseeel //////////////////////////////////
   
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
    console.log("ssa");
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

//////////////////////////////////sherif and momen//////////////////////////////////

 const AddDoctor = async(req,res) => {
  let username = req.body.username
  let password = req.body.password   
  let email=req.body.email;
  let hourly=req.body.hourly;
  let affiliation=req.body.affiliation;
  try{
     let user = await userModel.create({type: "Doctor",username: username, password: password,email:email,hourly:hourly,affiliation:affiliation})
     await user.save()
     res.status(200).json({message: "Doctor created successfully"})
  }
  catch(err){
     res.json({message: err.message})
  }
  }
const AddPatient = async(req,res) => {
     let username = req.body.username
     let password = req.body.password      
     try{
        let user = await userModel.create({type: "Patient",username: username, password: password})
        await user.save()
        res.status(200).json({message: "Patient created successfully"})
     }
     catch(err){
        res.json({message: err.message})
     }
}                 
const CreatAppoint = async (req,res)=>{
let DocUser=req.body.id;
let patuser=req.body.id2;
try{
  let Doctor=await userModel.findById(DocUser);
  let patient=await userModel.findById(patuser);
  let Appoint = await AppointmentModel.create({date:"2024/08/28",doctor:Doctor,patient:patient,status:false});
  await Appoint.save()
  res.status(200).json({message: "appoint created successfully"}
  )
}
catch(err){
  res.json({message: err.message})
}
}

module.exports = {addAdministrator, removeUser, getUsers,registerPatient , deleteUser , removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, viewDoctors,
   getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,
   filterAppointmentsStatus,getDoctorName  , AddDoctor,AddPatient,CreatAppoint, logout, viewAppointmentsOfDoctor}   