const userModel = require('../Models/User.js');
const PrescriptionModel = require('../Models/Prescription.js');
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken");
const PDFDocument = require('pdfkit');
const createPres=async(req,res)=>
{
   try{
     //Aseel
     let appointmentId = req.body.appointmentId;
     let date = req.body.date;
     let instruction = req.body.instruction;

      let doc=req.body.doctorId
      let pat=req.body.patientId
      let medicines=req.body.medicines
      let dosage=req.body.dosage
      let patientName = req.body.patientName;
      let doctorName = req.body.doctorName;
      let docc = await userModel.findById(doc);
      let patt = await userModel.findById(pat);
      
      if (!patt) {
         return res.status(400).json({ error: 'Patient must exist.' });
       }
       if (!docc) {
         return res.status(400).json({ error: 'Doctor must exist.' });
       }
      
        let pr = await PrescriptionModel.create({
         doctor: doc,
         patient: pat,
         date: date,
         filled: false,
         medicines: medicines,
         dosage: dosage,
         instruction: instruction,
         appointmentId: appointmentId,
         patientName: patientName,
         doctorName: doctorName
      });

      pr.save();
      res.status(200).json(pr);
   } catch (err) {
      console.error(err); // Log the error for your reference

      res.status(500).json({ message: 'Internal Server Error' });
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
            console.log(doctorId);
            let result = await PrescriptionModel.find({doctorName:doctorId , patient:user.id});
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

const getDoctorPresription = async(req,res)=>{
  try{
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const doctorId= decodedToken.user._id
    //let doctorId = req.params.id;
    let prescriptions = await PrescriptionModel.find({doctor: doctorId})
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

const getPatientPresription = async(req,res)=>{
  try{
    let patientId = req.query.id;
    let prescriptions = await PrescriptionModel.find({patient: patientId})
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
const modifyDosage= async(req,res)=>
{
  try{
    console.log("entered");
    let prescriptionId = req.params.prescriptionId;
    let index = req.body.index;
    let modifiedDosage = req.body.modifiedDosage
    console.log(prescriptionId);
    let prescription = await PrescriptionModel.findById(prescriptionId);
    if(!prescription)
    {
     return res.status(404).json({ message: 'No prescriptions found' });
    }
    else{
      console.log("previous dosage" , prescription.dosage[index] );
      prescription.dosage[index] = modifiedDosage;
    

      // Save the modified appointment
      await prescription.save();
  
      res.status(200).json({ message: "prescription dosage modified successfully", prescription });
    }

}
catch (err) {
    res.status(500).json({ message: err.message });
 }
}

const addMedicine= async(req,res)=>
{
  try {
    const { medicine, dosage } = req.body;
    const prescriptionId = req.params.prescriptionId;

    // Find the prescription by ID
    const prescription = await PrescriptionModel.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    // Add medicine and dosage to the arrays
    prescription.medicines.push(medicine);
    prescription.dosage.push(dosage);

    // Save the updated prescription
    await prescription.save();

    res.status(200).json({ message: 'Medicine and dosage added successfully', prescription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const deleteMedicine= async(req,res)=>
{
try {
  const prescriptionId = req.params.prescriptionId;
  const index = req.body.index;

  // Find the prescription by ID
  const prescription = await PrescriptionModel.findById(prescriptionId);

  if (!prescription) {
    return res.status(404).json({ message: 'Prescription not found' });
  }

  // Check if the index is within the bounds of the array
  if (index < 0 || index >= prescription.medicines.length) {
    return res.status(400).json({ message: 'Invalid index' });
  }

  // Remove medicine and dosage at the specified index
  prescription.medicines.splice(index, 1);
  prescription.dosage.splice(index, 1);

  // Save the updated prescription
  await prescription.save();

  res.status(200).json({ message: 'Medicine and dosage deleted successfully', prescription });
} catch (err) {
  res.status(500).json({ message: err.message });
}
}
const modifyInstruction= async(req,res)=>
{
  try{
    console.log("entered");
    let prescriptionId = req.params.prescriptionId;
    let instruction = req.body.instruction;
    console.log(prescriptionId);
    let prescription = await PrescriptionModel.findById(prescriptionId);
    if(!prescription)
    {
     return res.status(404).json({ message: 'No prescriptions found' });
    }
    else{
      prescription.instruction = instruction;
    

      // Save the modified appointment
      await prescription.save();
  
      res.status(200).json({ message: "prescription instruction modified successfully", prescription });
    }

}
catch (err) {
    res.status(500).json({ message: err.message });
 }
}
const generatePdf = async (req, res) => {
  try{
   const prescriptionId = req.params.prescriptionId; // Assuming you have an endpoint like /prescription/:id
   console.log("prescription ID" , prescriptionId);
   const prescription = await PrescriptionModel.findById(prescriptionId);
 
   if (!prescription) {
     return res.status(404).json({ message: 'Prescriptionnnn not found' });
   }
   res.setHeader('Content-Type', 'application/pdf');
   res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent('prescription.pdf')}`);
   const doc = new PDFDocument();
 
   // Add prescription details to the PDF
   doc.text(`Patient: ${prescription.patientName}`);
   doc.text(`Doctor: ${prescription.doctorName}`);
   doc.text('------------------------------------'); 
   doc.text('Medicines:');
   for (let i = 0; i < prescription.medicines.length; i++) {
    const medicine = prescription.medicines[i];
    const dosage = prescription.dosage[i]; // Assuming you have a dosages array parallel to medicines
  
    doc.text(`- ${medicine}, Dosage: ${dosage}`);
  }
   doc.text('-----------------------------------'); 
   doc.text(`Instructions: ${prescription.instruction}`);
   doc.text('-----------------------------------'); 
   doc.text(`Status: ${prescription.filled? "Filled" : "Not Filled"}`);
   doc.text('-----------------------------------'); 
   doc.text(`Date: ${prescription.date}`);
 
   doc.pipe(res);
   doc.end();
  }
  catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Internal server error' });
 }
 };
module.exports = {createPres , viewPatientPrescriptions , filterPrescriptions , getPrescription,getDoctorPresription, getPatientPresription,modifyDosage,
  addMedicine,deleteMedicine,modifyInstruction,generatePdf}