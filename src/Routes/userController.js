// #Task route solution
const userModel = require('../Models/User.js');
const PrescriptionModel = require('../Models/Prescription.js');
const PackageModel = require('../Models/Package.js');
const { default: mongoose } = require('mongoose');

//THIS IS THE TASK CODE TO GUIDE YOUUU

const addAdminstrator = async(req,res) => {
   //add a new user to the database with 
   //Name, Email and Age
   let username = req.body.body.username
   let password = req.body.body.password

   try{
      let user = await userModel.create({type: "Adminstrator",username: username, password: password})
      await user.save()
      res.status(200).json({message: "Adminstrator created successfully"})
   }
   catch(err){
      res.json({message: err.message})
   }
      
   }

const removeUser = async (req, res) => {
   let username = req.body.body.username;
//    let userID = await userModel.find(username = username)
    // const user = await userModel.findOne({ username });

   try {
      const deletedUser = await userModel.findOneAndDelete({ username });


      if (!deletedUser) {
         return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}
//// Get Users test
const getUsers = async (req, res) => {

      
      try {
         const users = await userModel.find({});
         res.status(200).json(users)
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  }

////// Register Patient 
//// 
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


   // const addFamMem=async(req,res)=>
   // {
   //       try
   //       {
   //          let username=req.params.username
   //          let user = await userModel.findOneAndUpdate( { username: username },
   //             { $set: { famMemName: "Mohab Olayan2" } })
   //             if(!user)
   //             {
   //                return res.status(404).json({ message: 'User not found' });
   //             }
   //             else
   //             {
   //                return res.status(200).send("Successfully");
   //             }
   //       } catch (err) {
   //          res.status(500).json({ message: err.message });
   //       }
   // }

   

module.exports = {addAdminstrator, removeUser, getUsers,registerPatient , deleteUser}