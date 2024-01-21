// #Task route solution
const userModel = require('../Models/User.js');
const requestModel = require('../Models/Request.js');
const PrescriptionModel = require('../Models/Prescription.js');
const appointmentModel = require('../Models/Appointment.js');
const PackageModel = require('../Models/Package.js');
const  mongoose  = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const appointmentsModel = require('../Models/Appointment.js');
const AppointmentModel = require('../Models/Appointment.js');
const RoomModel = require('../Models/Room.js');

const fs = require('fs');
const bcrypt = require('bcrypt')
const path = require('path');
const jwt = require("jsonwebtoken"); 

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

//////////////////////HANYA////////////////////////////////////////////
const addAdministrator = async(req,res) => {
   //add a new user to the database with 
   //Name, Email and Age
   let username = req.body.username
   let password = req.body.password

   try{
      const usert = await userModel.findOne({username: username});
      if(usert){
        res.status(404).json({message: "Username already exists"})
      }
      else
      {
        let user = await userModel.create({type: "Administrator",username: username, password: password})
        await user.save()
        res.status(200).json({message: "Administrator created successfully"})
      }
     
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
           const filteredDoctors = doctors.filter((doctor) => doctor.docSpeciality !== null 
           && doctor.docSpeciality !== undefined);
       
           res.status(200).json(filteredDoctors);
         } catch (err) {
           res.status(500).json({ message: err.message });
         }
       };
       
       const phviewPatients = async (req, res) => {
        try {
          const patients = await userModel.find({ type: "Patient" });
      
          // // Filter out doctors with null or undefined docSpeciality
          // const filteredDoctors = doctors.filter((doctor) => doctor.docSpeciality !== null 
          // && doctor.docSpeciality !== undefined);
      
          res.status(200).json(patients);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      const viewPharmacists = async (req, res) => {
        try {
          const pharmacists = await userModel.find({ type: "Pharmacist" });
      
          // // Filter out doctors with null or undefined docSpeciality
          // const filteredDoctors = doctors.filter((doctor) => doctor.docSpeciality !== null 
          // && doctor.docSpeciality !== undefined);
      
          res.status(200).json(pharmacists);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      const getDoctorInfo = async (req, res) => {
         try {
           const doctorId = req.query.doctorId; // Change from req.params.doctorId to req.query.doctorId
           const doctor = await userModel.findById(doctorId);
           if (!doctor) {
             return res.status(404).json({ message: "Doctor not found" });
           }
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
    const appointments = await appointmentModel.find({ doctor: doc, status: "Free" });
    
    res.status(200).json(appointments)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
}

const uploadMedicalDocument = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    
    const user = decodedToken.user;
    const { originalname, path } = req.file;
    const user2= await userModel.findById(user._id);
    user2.medicalHistory.push({ name: originalname, path: path });
    await user2.save();

    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadDoctorDocument = async (req, res) => {
  try {
    const usernameR = req.body.usernameR;
    const originalname= req.file;
    const request= await requestModel.findOne({username:usernameR});
    request.doc.push(originalname);
    await request.save();
   
    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUploaded = async (req, res) => {
  try {
      const token = req.cookies.jwt;
      const decodedToken = jwt.decode(token);
    const user = decodedToken.user;
    const user2= await userModel.findById(user._id);
    const uploadedFiles = user2.medicalHistory;

    res.status(200).json({fileNames: uploadedFiles});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeMedicalDocument = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const user = await userModel.findById(decodedToken.user._id);
    const documentId = req.params.documentId;

    // Find the document in the user's medicalHistory and remove it

    const document = user.medicalHistory.id(documentId);

    if (document) {
      // Remove the file from the server
      fs.unlinkSync(/* update with the correct path */ document.path);
      document.remove();
      await user.save();
      res.status(200).json({ message: 'Document removed successfully' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error removing medical document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const servefiles = async (req, res) => {
  try {
    const fullPath = decodeURIComponent(req.params.filePath);
    // console.log(filePath);
    // Assuming `filePath` contains both the path and filename
    const oldpath = path.join(__dirname, fullPath);
    const filePath = oldpath.replace(/\\/g, '/');
    console.log(filePath);
    // Check if the file exists
    if (fs.existsSync(fullPath)) {
      // Set the content-disposition header to trigger a download
      res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
      
      // Read the file and send it as a response
      const fileStream = fs.createReadStream(fullPath);
      fileStream.pipe(res);
    } else {
      // If the file doesn't exist, send a 404 response
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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
            const patientEmail= await userModel.findOne({email: req.body.email});
            if(patientEmail)
            {
              res.status(404).json({ error: 'Email already exists.' });
               return;
            }
             // Check if the new password meets the requirements
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!passwordRegex.test(req.body.password)) {
               return res.status(400).json({ error: 'New password must have at least 8 characters, including 1 capital letter and 1 number' });
          }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            let patient = await userModel.create({type:"Patient", username: req.body.username , name : req.body.name , email: req.body.email , 
            password: hashedPassword , dateOfBirth : req.body.dateOfBirth , gender : req.body.gender, mobileNumber : req.body.mobileNumber,
            emergencyContactFullname:  req.body.emergencyContactFullname,  emergencyContactMobileNumber: req.body.emergencyContactMobileNumber})
            await patient.save();

            res.status(200).json({message: "Patient Registered Succesfully", patient});
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
   
const addFamilyMember = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const patientId = decodedToken.user._id

    let famMemName = req.body.famMemName;
    let famMemNatID = req.body.famMemNatID;
    let famMemAge = req.body.famMemAge;
    let famMemGender = req.body.famMemGender;
    let famMemRelation = req.body.famMemRelation;
    console.log(req.body.username);
    let newfamilyMember;

    if (req.body.username) {
      let username = req.body.username;
      newfamilyMember = { username: username, famMemName: famMemName, famMemNatID: famMemNatID, famMemAge: famMemAge,
        famMemGender: famMemGender, famMemRelation: famMemRelation, patient: patientId }
    } else {
      newfamilyMember = { famMemName: famMemName, famMemNatID: famMemNatID, famMemAge: famMemAge,
        famMemGender: famMemGender, famMemRelation: famMemRelation, patient: patientId }
    }

    const familyMember = await familyMemberModel.create(newfamilyMember);
    await familyMember.save();
    res.status(200).json({ success: true, message: "Family member created successfully" });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: "Failed to create family member", error: err.message });
  }
};

 
 const viewRegFamilyMembers = async(req,res)=>{
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  const patientId = decodedToken.user._id
    const username = req.params.id;
    try{
     const famMembers = await familyMemberModel.find({patient: patientId}).populate({path: 'patient'});
     res.status(200).send(famMembers);
 }
    
     catch(error){
     res.status(400).json({message: error.message})
     }
 
 }
 const getUserById = async(req,res)=>{
 
     const id = req.params.id;
     try{
      const user = await userModel.findById(id);
      res.status(200).send(user);
  }
     
      catch(error){
      res.status(400).json({message: error.message})
      }
  
  }

  const getUserByTokenId = async(req,res)=>{
 
     const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  const id = decodedToken.user._id;
    try{
     const user = await userModel.findById(id);
     res.status(200).send(user);
 }
    
     catch(error){
     res.status(400).json({message: error.message})
     }
 
 }
  const getUserByUsername = async(req,res)=>{
 
    const username = req.params.username;
  
    try {
      const user = await userModel.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  }
 
 const viewAppointments = async(req,res)=>{
     try{
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
      const patientId = decodedToken.user._id;
      const Appointments = await appointmentsModel.find({ patient: patientId });
      const doctorNames = [];
      for(let i = 0; i<Appointments.length; i++){
        doctorNames.push((await userModel.findById(Appointments[i].doctor)).name);
      }
      res.status(200).json({Appointments, doctorNames});
  }
     
      catch(error){
      res.status(400).json({message: error.message})
      }
  }
 
 const filterAppointmentsDate = async(req,res)=>{
    try{
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
      const patientId = decodedToken.user._id;
      const Appointments = await appointmentsModel.find({patient: patientId, date :req.params.date})
      const doctorNames = [];
      for(let i = 0; i<Appointments.length; i++){
        doctorNames.push((await userModel.findById(Appointments[i].doctor)).name);
      }
      res.status(200).json({Appointments, doctorNames});
      }
      catch(error){
        res.status(400).json({message: error.message})
        }
  
 }
const filterAppointmentsStatus = async(req,res)=>{ 
    try{
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
      const patientId = decodedToken.user._id;
      console.log(patientId);
      console.log(req.params.status);
      const Appointments = await appointmentsModel.find({patient: patientId, status :req.params.status})
      console.log(Appointments);
      const doctorNames = [];
      for(let i = 0; i<Appointments.length; i++){
        doctorNames.push((await userModel.findById(Appointments[i].doctor)).name);
      }
      res.status(200).json({Appointments, doctorNames});    
    }
    catch(error){
      res.status(400).json({message: error.message})
    } 
}
const getWalletInfo = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
    const userId= decodedToken.user._id


  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.status(200).json(user.walletInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWalletInfoDoc = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
    const userId= decodedToken.user._id


  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.status(200).json(user.walletInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFamilyMemberData = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  const patientId = decodedToken.user._id

  try {
    // Find all family members that reference the user with the provided ID
    const familyMembers = await familyMemberModel.find({ patient: patientId });

    res.status(200).json({ familyMemberData: familyMembers });
  } catch (error) {
    console.error('Error fetching family member data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getUserByEmail = async(req,res)=>{
 
  const email = req.params.email;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
const getUserByPhoneNumber = async(req,res)=>{
 
  const phoneNumber = req.params.phoneNumber;

  try {
    const user = await userModel.findOne({ mobileNumber: phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
const modifyWallet = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
      const patientId= decodedToken.user._id
    const price = req.body.price;
  

    // Fetch the specific appointment using the appointmentId
    const user = await userModel.findById(patientId);

    // Check if the appointment exists
    if (!user) {
      return res.status(404).json({ message: "patient not found" });
    }

    // Update the appointment with the new patientId
    user.walletInfo = user.walletInfo- price;
    

    // Save the modified appointment
    await user.save();

    res.status(200).json({ message: "patient wallet updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const modifyWalletDoctor = async (req, res) => {
  try {
    const price = req.body.price;
    const doctorId = req.body.id;

    // Fetch the specific appointment using the appointmentId
    const user = await userModel.findById(doctorId);

    // Check if the appointment exists
    if (!user) {
      return res.status(404).json({ message: "doctor not found" });
    }

    // Update the appointment with the new patientId
    user.walletInfo = user.walletInfo + price;
    

    // Save the modified appointment
    await user.save();

    res.status(200).json({ message: "doctor wallet updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const searchByNamePatients = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  let DoctorId = decodedToken.user._id;

  try {
    const { name, patList } = req.body; // Retrieve 'name' and 'patList' from the request body
    console.log(name);
    console.log(patList);
    const regexName = new RegExp(name, 'i'); // 'i' flag for case-insensitive search

    const results = patList.filter(patient => regexName.test(patient.name));

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getMyId = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  let patientId = decodedToken.user._id;
return patientId;
};
const payStripe = async (req, res) => {
  const amount = req.body.amount;
  const patientId = req.body.patientId;
  const appointment = req.body.appointment;
        const doctorid= appointment.doctor
        const doctor = await userModel.findById(doctorid);


  //create a stripe session
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
        {
            price_data: {
                product_data: {
                    name: 'appointment with doctor' + doctor.name ,
                },
                unit_amount: parseInt(amount*100,10),
                currency: 'egp',
                //remove recurring variable if not a subscription

            },
            quantity: 1,
        },
    ],
    //change mode to 'payment' if not a subscription
    mode:'payment',
    //redirection url after success, query contains session id
    success_url: `http://localhost:3000/AppointmentSuccess?sessionID={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/SApp?appointmentId=${appointment._id}`,
    //metadata containing your product's id and its purchaser (important for later)
    metadata: {
        'patientID': patientId.toString(),
        'doctorId': doctor._id.toString(),
        'appointmentid':appointment._id.toString()
    }
});
console.log(session)
res.status(200).json(session)
};
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
const success = async (req, res) => {

  const { sessionID } = req.params
  const session = await stripe.checkout.sessions.retrieve(
      sessionID,
      {
          expand: ['line_items'],
      }
  );
  if(session.payment_status==="paid"){
      const appointmentid = session.metadata.appointmentid
   //   const familyMemberId=session.metadata.familyMemberId
      const patientID = session.metadata.patientId

      const appointment = await AppointmentModel.findById(appointmentid)
      const patient = await PatientModel.findById(patientID)
       const email = patient.email;

      try{
          appointment.patient = patientID
        
          appointment.status = 'Upcoming'
          
          await appointment.save()
          console.log(email);
     sendEmail(email,appointment.date,"Your Appointment Has Been Confirmed on");
          
          res.status(200).json(appointment)

      }
      catch (error) {
          res.status(400).json(error.message)
      }
  } else {
      res.status(400).json({error:"payment unsuccessful"})
  }


};




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

const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
    return jwt.sign({ user }, 'supersecret', {
        expiresIn: maxAge
    });
};

const login = async (req, res) => {
  const uName = req.body.username;
  const password = req.body.password;
    try {

        const user = await userModel.findOne({ username: uName });
        if (!user) {
            throw new Error('User not found');
        }
        //console.log(await bcrypt(user.password));
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = createToken(user);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 , sameSite: 'None' ,  secure: true });
        console.log(token);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

const findPatById = async(req,res)=>{
  try{
    const patient= await userModel.findById(req.query.Id);
    if(!patient)
    {
        return res.status(404).json({ error: "Patient Not Found" });;
    }
    res.status(200).json(patient)
}
catch (err) {
    return false; 
}
}

const getRoom = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, 'supersecret');
  const partner1Id =decodedToken.user._id;
  console.log(partner1Id)
  const partner2Id = req.query.partner;
  console.log(partner2Id)
  try {
  
    let room = await RoomModel.findOne({
      $or: [
        { $and: [{ partner1Id :partner1Id}, { partner2Id :partner2Id}] },
        { $and: [{ partner1Id: partner2Id }, { partner2Id: partner1Id }] }, 
      ],
    });
    
    if (!room && partner1Id !== partner2Id) {
      room = await RoomModel.create({ partner1Id, partner2Id });
    }
    console.log(room)
    res.json(room);
    
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving chat room', message: error.message });
  }
};
 
// Return the token and user role

module.exports = { login, addAdministrator, removeUser, getUsers,registerPatient , deleteUser , removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, viewDoctors,
   getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,
   filterAppointmentsStatus, AddDoctor,AddPatient,CreatAppoint, logout, viewAppointmentsOfDoctor, uploadMedicalDocument, removeMedicalDocument
  , getUploaded, findPatById, servefiles ,getUserById  ,getWalletInfo, getWalletInfoDoc, getFamilyMemberData,
  getUserByEmail,getUserByPhoneNumber,getUserByUsername,modifyWallet,modifyWalletDoctor, getUserByTokenId, getRoom, phviewPatients, viewPharmacists,searchByNamePatients,getMyId,
  payStripe,success,uploadDoctorDocument}   

// module.exports = {addAdministrator, removeUser, getUsers,registerPatient , deleteUser , removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, viewDoctors,
//    getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,
//    filterAppointmentsStatus,getUserById  , AddDoctor,AddPatient,CreatAppoint, logout, viewAppointmentsOfDoctor,getWalletInfo,getFamilyMemberData,
//    getUserByEmail,getUserByPhoneNumber,getUserByUsername,modifyWallet,modifyWalletDoctor}   
