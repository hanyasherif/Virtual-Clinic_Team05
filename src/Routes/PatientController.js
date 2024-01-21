const userModel = require('../Models/User.js');
const PrescriptionModel = require('../Models/Prescription.js');
const appointmentModel = require('../Models/Appointment.js');
const PackageModel = require('../Models/Package.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const AppointmentModel = require('../Models/Appointment.js');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const otpmodel = require('../Models/otp.js');
const bcrypt = require('bcrypt');
// Rest of your code using nodemailer


const viewPackages = async(req,res)=>{
   
    try{
       
        const packges = await PackageModel.find()
        res.status(200).json(packges)
    }
    catch(error){
        res.status(400).json({message: error.message})
        }
  
  }

const subscribePackage = async(req,res)=>{
    try
    {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
      //const user = await userModel.findById(decodedToken.user._id);
        const patId= decodedToken.user._id
        const packageName= req.query.packageName
        const patient = await userModel.findById(patId)
        if(!patient)
        {
            return res.status(404).json({ message: 'Patient not found' });
        }
        if(patient.packageStatus=="unsubscribed" || !patient.packageStatus)
        {
             subscribe(packageName,patient)
             await patient.save();
            console.log(patient.package)
            let famMems= await familyMemberModel.find({patient:patId})
            for (let famMem of famMems) {
                // Access each family member in the loop
                
                let tmp= await userModel.findOne({username:famMem.username})
               
                if(tmp){
                    subscribe(packageName,tmp)
                    await tmp.save();
                }
              }
              res.status(200).send("Package Subscribed Successfully");

        }
        else{
            return res.status(400).json({ message: 'Patient already subscribed to package' });
        }
        
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}
function subscribe(packageName,patient)
{
      try{
        patient.package=packageName;
        patient.packageStatus="subscribed";
        const now = new Date();
        patient.startDate= now;
        const yearsToAdd = 1; 
        const futureDate = new Date(now);
        futureDate.setFullYear(now.getFullYear() + yearsToAdd);
        patient.endDate=futureDate;
      }
      catch(error){
        res.status(400).json({message: error.message})
      }
}

const viewMyPackage=async(req,res)=>
{
    try{
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
        const patId= decodedToken.user._id
        const patient = await userModel.findById(patId)
        if(!patient)
        {
            return res.status(404).json({ message: 'Patient not found' });
        }
        if(!patient.packageStatus)
        {
            consoole.log("test")
            return res.status(200).json({ message: 'No package subscribed.' });
        }
        else
        {
          
            const pack = await PackageModel.findOne({name:patient.package})
            let familyMembers=[];
            let famMems= await familyMemberModel.find({patient:patient._id})
            for (let famMem of famMems) {
                // Access each family member in the loop
                
                let tmp= await userModel.findOne({username:famMem.username})
                if(tmp){
                    familyMembers.push(tmp);
                }
              }
              resData={
                status:patient.packageStatus,
                details:pack,
                familyMembers:familyMembers,
                startDate:patient.startDate,
                endDate:patient.endDate
              }
              if(patient.packageStatus=="cancelled" & new Date()>patient.endDate)
              { 
                console.log("ff");

                patient.package=undefined;
                patient.startDate=undefined
                patient.endDate=undefined
                patient.packageStatus=undefined
                patient.save();
                return res.status(200).json({ message: 'No package subscribed.' });
              }
              else
              {
              console.log("dd");
                return res.status(200).json(resData);
              }
            
        }
        
      }
      catch(error){
        res.status(400).json({message: error.message})
      }
}

const cancelPackage= async(req,res)=>
{
    try{
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
        const patId= decodedToken.user._id
        const patient = await userModel.findById(patId)
        patient.packageStatus="cancelled";
        patient.save();
        let famMems= await familyMemberModel.find({patient:patient._id})
            for (let famMem of famMems) {
                // Access each family member in the loop
                
                let tmp= await userModel.findOne({username:famMem.username})
                if(tmp){
                    tmp.packageStatus="cancelled";
                    tmp.save();
                }
              }
      }
      catch(error){
        res.status(400).json({message: error.message})
      }
}


const GEmail = async (req, res) => {//Changing password
  try {
    let newpassword=req.body.password
    let userEmail = req.body.Useremail;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!passwordRegex.test(req.body.password)) {
               return res.status(500).json({ error: 'New password must have at least 8 characters, including 1 capital letter and 1 number' });
          }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 
    lowercaseUserEmail=userEmail.toLowerCase();
    let newuser = await userModel.findOneAndUpdate(
      { email: { $regex: new RegExp('^' + lowercaseUserEmail + '$', 'i') } },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json({ message: "Password Changed"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const CEmail = async (req, res) => {//Checking if Email Exist
try {

const userEmail = req.query.email; // Use a different variable name to avoid conflict
console.log("TEST0"+userEmail);
const user = await userModel.find({ email: userEmail });
if (user != null){
  sendEmail(userEmail);
  res.status(200).json({ message: "Email Exists" });
} else {
  res.status(404).json({ message: "Email Not Found" });
}
} catch (err) {
res.status(500).json({ message: err.message });
}
};

const CheckOTP = async (req,res) => {
let num =req.query.numO
try {
const otp = await otpmodel.findOneAndDelete({ number: num });
if (otp) {
  res.status(200).json({ Useremail: otp.Useremail });
} else {
  res.status(400).json({ message: 'Wrong OTP' });
}
} catch (err) {
res.status(500).json({ message: 'Error checking OTP: ' + err.message });
}
};
const generateOTP = () => {
return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
};

async function sendEmail(email) {
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "seifkandel3@gmail.com",
        pass: "c x o d r z b m d n u s y f p r",
    },
});
const otp = generateOTP();

const mailOptions = {
from: 'sender@example.com',
to: email, // Replace with the recipient's email address
subject: 'Test Email from Mailtrap',
text: "This is a test email from Mailtrap! Your OTP is:" +otp,
};

try {
let info = await transporter.sendMail(mailOptions);
console.log('Email sent:', info.response);
// Save OTP to the database
try {
  let otpNum = await otpmodel.create({ number: otp , Useremail : email});
  await otpNum.save();
} catch (err) {
  console.error('Error saving OTP to the database:', err);
}
} catch (err) {
console.error('Error sending email:', err);
throw err;
  }
};


const changePassword = async (req, res) => {//Changing password
  try {
    let newpassword=req.body.password
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const patId= decodedToken.user._id
    let currentPassword=req.body.currentPassword;
    const isPasswordValid = await bcrypt.compare(currentPassword, decodedToken.user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!passwordRegex.test(req.body.password)) {
               return res.status(400).json({ error: 'New password must have at least 8 characters, including 1 capital letter and 1 number' });
          }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 
   
    let newuser = await userModel.findOneAndUpdate(
      { _id: patId},
      { $set: { password: hashedPassword } }
    );
    res.status(200).json({ message: "Password Changed"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const ViewPackage = async (req, res) => {
     
  try{
    const name= req.query.name
    const packages = await PackageModel.findOne({name:name})
    res.status(200).json(packages)
}
catch(error){
    res.status(400).json({message: error.message})
    }
}
  
module.exports = {viewPackages ,subscribePackage , viewMyPackage ,cancelPackage  ,GEmail ,CEmail,CheckOTP,changePassword,ViewPackage}; 