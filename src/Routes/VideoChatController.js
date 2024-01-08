const userModel = require('../Models/User.js');
const RoomModel = require('../Models/Room.js');
const PrescriptionModel = require('../Models/Prescription.js');
const appointmentModel = require('../Models/Appointment.js');
const PackageModel = require('../Models/Package.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const AppointmentModel = require('../Models/Appointment.js');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const sendEmail=async(req,res)=>{
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const user = await userModel.findById(decodedToken.user._id);
    const emailReciever=req.body.email;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "seifkandel3@gmail.com",
            pass: "c x o d r z b m d n u s y f p r",
        },
    });
    
    
    const mailOptions = {
    from: 'sender@example.com',
    to: user.email, // Replace with the recipient's email address
    subject: 'Test Email from Mailtrap',
    text: "This is a test email from Mailtrap! Your OTP is+otp"
    };
    const mailOptions2 = {
        from: 'sender@example.com',
        to: emailReciever, // Replace with the recipient's email address
        subject: 'Test Email from Mailtrap',
        text: "This is a test email from Mailtrap! Your OTP is:"
    };
    try{
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptions2);
        res.status(200).json({message: "Email sent Succesfully"})
    }
    catch (err) {
        res.status(500).json({ message: err.message });
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

module.exports = {getRoom, sendEmail};