// #Task route solution
const userModel = require('../Models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

//THIS IS THE TASK CODE TO GUIDE YOUUU



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
 //    let userID = await userModel.find(username = username)
     // const user = await userModel.findOne({ username });
 
    try {
      //  const deletedUser = await userModel.findOneAndDelete({ username });
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
         const users = await userModel.find({
            type: { $in: ["Patient", "pharmacist"] }
          }).sort({ createdAt: -1 });             
          res.status(200).json(users);
      } catch (err) {
          res.status(500).json({ message: err.message });
      } 
   }





 const registerPatient=async (req,res)=>
 {
    try{
 
         
             const att = req.body;
             const requiredAttributes = ['name', 'email', 'dateOfBirth','gender','mobileNumber','emergencyContactFullname','emergencyContactMobileNumber','emergencyContactRelation'];
             const missingAttributes = requiredAttributes.filter(attr => !att[attr]);
              if (missingAttributes.length > 0) {
                   return res.status(400).json({ error: `The following attributes are required: ${missingAttributes.join(', ')}` });
                }
               
            
            
             
             if(await findPatientByUsername(req.body.username))
             {
                res.status(404).json({ error: 'Username already exists.' });
                return;
             }  
            
             const salt = await bcrypt.genSalt();
             const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
 
 
             let patient = await userModel.create({type:"Patient", username: req.body.username , name : req.body.name , email: req.body.email , 
              password: hashedPassword , dateOfBirth : req.body.dateOfBirth , gender : req.body.gender, mobileNumber : req.body.mobileNumber,
               emergencyContactFullname:  req.body.emergencyContactFullname,  emergencyContactMobileNumber: req.body.emergencyContactMobileNumber , 
               emergencyContactRelation: req.body.emergencyContactRelation})
              await patient.save();


              const token = createToken(patient.name);

            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
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


const adminViewPharmacists=async(req,res)=>
{
    try{
      let patid = req.query.id;
       const pharmacists = await userModel.find({type:"Pharmacist" , _id:patid});
       res.status(200).json(pharmacists);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
     }
}

const adminViewPatients = async (req, res) => {

      
    try {
        let patid = req.query.id;
        console.log(patid)
       const patients = await userModel.find({type:"Patient" , _id:patid});
       res.status(200).json(patients)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const logout = async (req, res) => {
   res.clearCookie('jwt');
   res.status(200).json({message: 'Logout successful'});
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
      
        res.status(400).json({ error: error.message });
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
console.log(userEmail);
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
throw err;
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
               return res.status(500).json({ error: 'New password must have at least 8 characters, including 1 capital letter and 1 number' });
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

///from clinic
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



module.exports = {addAdministrator, removeUser , registerPatient,
   deleteUser, adminViewPharmacists,
   adminViewPatients,checkUsername, getUsers, logout,login, GEmail, CEmail, 
   CheckOTP, changePassword, getWalletInfo, modifyWallet}



