// #Task route solution
const medicineModel = require('../Models/Medicine.js');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const Prescription = require('../Models/Prescription.js'); // Adjust the path as needed


const createMedicine = async (req, res) => {
  const {
    name,
    price,
    description,
    availableQuantity,
    sales,
    activeIngredients,
    medicinalUse,
  } = req.body;

  // Handle file upload using multer
  const picture = req.file ? req.file.path : ''; // Use the file path


  //danny
//   if(req.file){
//    medicineModel.picture = req.file.path;
//   }

// const picture = req.file ? req.file.path : './medImage/' + req.file.originalname;


  try {
    const medicine = await medicineModel.create({
      name,
      picture,
      price,
      description,
      availableQuantity,
      sales,
      activeIngredients,
      medicinalUse,
    });

    await medicine.save();
    res.status(200).json({ message: 'Medicine created successfully' });
  } catch (err) {
    res.json({ message: err.message });
  }
};


   const getMedicine = async (req, res) => {
      try {
          const medicines = await medicineModel.find({});
          res.status(200).json(medicines);
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  }
  


const updateMedicine = async (req, res) => {
   const medicineId = req.params.id;
   const updateFields = req.body;

   try {
      const updatedMedicine = await medicineModel.findByIdAndUpdate(
         medicineId,
         { $set: updateFields },
         { new: true, select: 'name price description availableQuantity sales activeIngredients' } // To return the updated user
      );

      if (!updatedMedicine) {
         return res.status(404).json({ message: 'Medicine not found' });
      }

      res.status(200).json({ message: 'Medicine updated successfully', medicine: updatedMedicine });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

const searchMedicine = async (req, res) => {
    const name = req.query.name; // Access data from the query parameters
 
    try {
       const regex = new RegExp(name, 'i');
       const medicines = await medicineModel.find({ name: { $regex: regex } });
 
       res.status(200).json(medicines);
    } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Internal server error' });
    }
 };
 

const filterMedicine = async (req, res) => {
   const medicinalUse = req.query.medicinalUse; // Access data from the query parameters

   try {
      const regex = new RegExp(medicinalUse, 'i');
      const medicines = await medicineModel.find({ medicinalUse: { $regex: regex } });

      res.status(200).json(medicines);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }
};

//new sp3

const prescriptionMedicine = async (req, res) => {
  try {
   //  const token = req.cookies.jwt;
   //  const decodedToken = jwt.verify(token, 'supersecret');
   //  const patientId = decodedToken.user._id;

      const patientId = req.query.patientId; // Access data from the query parameters

    // Use Mongoose to find prescriptions by patient ID
    const prescriptions = await Prescription.find({ patient: patientId });

    // Create an array to store the medicines from prescriptions
    const medicines = [];

    // Iterate through each prescription to get associated medicines
    for (const prescription of prescriptions) {
      const medicineIds = prescription.medicine; // Assuming medicine field in prescription contains names

      // Use Mongoose to find medicines by IDs
      const medicinesForPrescription = await medicineModel.find({
        name: { $in: medicineIds },
      });

      // Add medicines to the array
      medicines.push(...medicinesForPrescription);
    }

    // Send the medicines as the response
    res.status(200).json({ medicines });
  } catch (error) {
    // Handle errors, e.g., invalid token or database error
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findAlternativeMedicines = async (req, res) => {
    try {
       const { medicineName } = req.query;
 
       // Find the medicine with the provided name
       const targetMedicine = await medicineModel.findOne({ name: medicineName });
 
       if (!targetMedicine) {
          return res.status(404).json({ error: 'Medicine not found' });
       }
 
       // Find alternatives with the same active ingredient and in stock
       const alternatives = await medicineModel.find({
          activeIngredients: targetMedicine.activeIngredients,
          availableQuantity: { $gt: 0 },
       });

       if (alternatives.length === 0) {
          return res.status(404).json({ error: 'No alternatives found' });
       }
 
       res.status(200).json({ alternatives });
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
    }
 };


 
module.exports = {createMedicine, getMedicine, updateMedicine,searchMedicine, filterMedicine, prescriptionMedicine,findAlternativeMedicines};


