const userModel = require('../Models/User.js');
const PrescriptionModel = require('../Models/Prescription.js');
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken");
const createPres=async(req,res)=>
{
   try{
      let doc=req.body.doc
      let pat=req.body.pat
      let medicine=req.body.medicine
      let dosage=req.body.dosage
      let docc = await userModel.findById(doc);
      let patt = await userModel.findById(pat);
      if (!patt) {
         return res.status(400).json({ error: 'Patient must exist.' });
       }
       if (!docc) {
         return res.status(400).json({ error: 'Doctor must exist.' });
       }
      
      let pr = await PrescriptionModel.create({doctor: doc, patient:pat, date:"03/12/2020" , filled:false , medicine:medicine, dosage: dosage
   })
      pr.save();
      res.status(200).json(pr);
   }
   catch (err) {
      res.status(500).json({ message: err.message });
   }

}

const viewPatientPrescriptions=async(req,res)=>
{
 try{
     let username = req.query.username;
     let pat = await userModel.findOne({username:username})
     let prescriptions = await PrescriptionModel.find({patient:pat.id})
     if(!prescriptions)
     {
      return res.status(404).json({ message: 'No prescriptions found' });
     }
     else{
      return res.status(200).json(prescriptions);
     }

 }
 catch (err) {
     res.status(500).json({ message: err.message });
  }
}
const filterPrescriptions=async(req,res)=>
{
    try{
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, 'supersecret');
      //const user = await userModel.findById(decodedToken.user._id);
        const patId= decodedToken.user._id
        const patient = await userModel.findById(patId)
        let username=patient.username;

        let filter = req.query.name
        console.log(filter)
        let doctorId = req.query.doctorId;
        let date = req.query.date
        let user = await userModel.findOne({username:username})
    
        if(filter=="doctor")
        {
            
            let result = await PrescriptionModel.find({doctor:doctorId , patient:user.id});
            //let doctor = await userModel.findById(result.doctor);
            const resultWithNames = result.map((prescription) => {
                return {
                  ...prescription.toObject(), // Convert the Mongoose document to a plain object
                  patientName: username,
              //    doctorName: doctor.name  // Add the 'name' property
                };
              });
            return res.status(200).json(resultWithNames);
        }
        else if (filter=="date")
        {
            let result = await PrescriptionModel.find({date:date , patient:user.id});
            //let doctor = await userModel.findById(result.doctor);
            const resultWithNames = result.map((prescription) => {
                return {
                  ...prescription.toObject(), // Convert the Mongoose document to a plain object
                  patientName: username,
              //    doctorName: doctor.name  // Add the 'name' property
                };
              });
            return res.status(200).json(resultWithNames);
        }
        else if(filter=="filled")
        {
            console.log("sss2");
            let result = await PrescriptionModel.find({filled:true , patient:user.id});
            //let doctor = await userModel.findById(result.doctor);
            const resultWithNames = result.map((prescription) => {
                return {
                  ...prescription.toObject(), // Convert the Mongoose document to a plain object
                  patientName: username,
                //  doctorName: doctor.name  // Add the 'name' property
                };
              });
            return res.status(200).json(resultWithNames);
        }
        else if (filter=="not filled")
        {
          
            let result = await PrescriptionModel.find({filled:false , patient:user.id});
      
            //let doctor = await userModel.findById(result.doctor);
            
            const resultWithNames = result.map((prescription) => {
                return {
                  ...prescription.toObject(), // Convert the Mongoose document to a plain object
                  patientName: username,
              //    doctorName: doctor.name  // Add the 'name' property
                };
              });
            return res.status(200).json(resultWithNames);
        }
        else{
            console.log("sss");
            let result = await PrescriptionModel.find({patient:user.id});
           
            const resultWithNames = result.map((prescription) => {
                return {
                  ...prescription.toObject(), // Convert the Mongoose document to a plain object
                  patientName: username,
                  //doctorName: doctor.name  // Add the 'name' property
                };
              });
;            return res.status(200).json(resultWithNames);
        }
       
        

    }catch (err) {
      res.status(500).json({ message: err.message });
   }
}


const getPrescription= async(req,res)=>
{
  try{
    let id = req.query.Id;
    console.log(id);
    let prescription = await PrescriptionModel.findById(id);
    if(!prescription)
    {
     return res.status(404).json({ message: 'No prescriptions found' });
    }
    else{
     return res.status(200).json(prescription);
    }

}
catch (err) {
    res.status(500).json({ message: err.message });
 }
}



module.exports = {createPres , viewPatientPrescriptions , filterPrescriptions , getPrescription}