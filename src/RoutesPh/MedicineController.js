// #Task route solution
const medicineModel = require('../Models/Medicine.js');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');


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


const archiveMedicine = async (medicineId) => {
   try {
     const updatedMedicine = await Medicine.findByIdAndUpdate(
       medicineId,
       { isArchived: true },
       { new: true }
     );
 
     // Handle the updated medicine (you can send it to the client or perform other actions)
     return updatedMedicine;
   } catch (error) {
     // Handle errors
     console.error(error);
     throw error;
   }
 };


 

 
module.exports = {createMedicine, getMedicine, updateMedicine,searchMedicine, filterMedicine, archiveMedicine};


