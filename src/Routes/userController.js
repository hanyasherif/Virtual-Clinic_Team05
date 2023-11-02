// #Task route solution
const userModel = require('../Models/User.js');
const appointmentModel = require('../Models/Appointment.js');
const { default: mongoose } = require('mongoose');

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

const removeUser = async (req, res) => {
   let username = req.body.username;
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
 
const viewDoctors = async(req,res) => {
   //37-view a list of all doctors along with their speciality, session price 
   //(based on subscribed health package if any --> frontend) 
   
   //1-check the user subscription 
   //2-if condition on subscription (3 types od subscriptions each has different packages)
   //3-loop on the doctors applying discount based on the subsc. type
   //4-then return those doctors

   try{
      const doctors = await userModel.find({type: "Doctor"});
      res.status(200).json(doctors)
   }
   catch(err){
      res.status(500).json({message: err.message})
   }
      
   }

 
   const selectDoctor = async(req, res) => {
   //40-select a doctor from the search/filter results
   
       const docId = req.params.id;
       try{
           const doctor = await userModel.findById(docId)
           res.status(200).json(doctor)
       }
       catch(error){
           res.status(400).json({message:error.message})
       }
        
   }


   // const filterDoctorsBySpecialityAndAvailability = async (req, res) => {
   //    try {
   //      const { educationalBackground, availability } = req.body;
   //      const query = {};
   //      if (educationalBackground) {
   //        query.educationalBackground = educationalBackground;
   //      }
   //      let filteredDoctors = await DoctorModel.find(query).populate("availability");
   //      if (availability) {
   //        filteredDoctors = filteredDoctors.filter(doctor => 
   //          doctor.availability.some(a => 
   //            a.date.toISOString().split('T')[0] === availability.date && 
   //            a.time === availability.time
   //          )
   //        );
   //      }
   //      if (filteredDoctors.length === 0) {
   //        return res.json({ message: "No matching doctors found." });
   //      }
   //      res.status(200).json(filteredDoctors);
   //    } catch (error) {
   //      console.error(error);
   //      res.status(500).json({ message: "Server error" });
   //    }
   //  };


//////39-filter  a doctor by speciality and/or availability on a certain date and at a specific time //////

// 1- check specialty and availability are not equal to null
// 2- if true 
// 3- get all doctors that match the specialty 
// 4- get all appointments that match
// 5- check doctors in both and display

    const filterDoctors = async (req, res) => {
      const docId = req.params.id;
      let commonDoctors = [];
      try {
         const {docSpeciality, date} = req.body;
         if(docSpeciality && date){
            let doctors = await userModel.find({docSpeciality:docSpeciality});
            let appointments = await appointmentModel.find({date:date, status:true}).populate("doctor"); //status value doubleCheck         
           // Loop through the doctors array
            doctors.forEach(doctor => {
           // Check if the doctor's ID exists in the appointments array
            const foundDoctor = appointments.find(appointment => appointment.doctor.docId === doctor.docId);
 
          // If a doctor with the same ID is found in appointments, push it to the commonDoctors array
            if (foundDoctor) {
               commonDoctors.push(doctor);
             }
         });
         // Now the commonDoctors array contains the doctors that have appointments on the specified date with the specified status
            console.log(commonDoctors);
         }

         else if(docSpeciality){
            let doctors = await userModel.find({docSpeciality:docSpeciality});
            console.log(doctors);
         }
         else {
            let appointments = await appointmentModel.find({date:date, status:true}).populate("doctor"); //status value doubleCheck         
            console.log(appointments);
         }
      }
      catch(error){
         res.status(500).json({message:error.message})
      }
   }



//    const getUsers = async (req, res) => {

      
//       // try {
//       //     const users = await userModel.find({});
//       //     res.status(200).json(users);
//       // } catch (err) {
//       //     res.status(500).json({ message: err.message });
//       // }
//   }
  

//   const updateUser = async (req, res) => {
//    const userId = req.params.id; 
//    const updateFields = req.body; 

//    try {
//       const updatedUser = await userModel.findByIdAndUpdate(
//          userId,
//          { $set: updateFields },
//          { new: true } // To return the updated user
//       );

//       if (!updatedUser) {
//          return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//    } catch (err) {
//       res.status(500).json({ message: err.message });
//    }
// }


// const deleteUser = async (req, res) => {
//    const userId = req.params.id; 

//    try {
//       const deletedUser = await userModel.findByIdAndRemove(userId);

//       if (!deletedUser) {
//          return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
//    } catch (err) {
//       res.status(500).json({ message: err.message });
//    }
// }
// 
// module.exports = {createUser, getUsers, updateUser, deleteUser};

module.exports = {addAdminstrator, removeUser, viewDoctors, selectDoctor, filterDoctors}
