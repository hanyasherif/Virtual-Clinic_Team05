const userModel = require('../Models/User.js');
const PackageModel = require('../Models/Package.js');
const { default: mongoose } = require('mongoose');

const adminAddPackage=async(req,res)=>
   {
      try
      {
         let name = req.body.name;
         let price = req.body.price
         let doctorDiscount = req.body.doctorDiscount;
         let pharmacyDiscount = req.body.pharmacyDiscount;
         let famMemDiscount = req.body.famMemDiscount;
         let checkPack= await PackageModel.findOne({name:name})
         if(checkPack)
         {
            return res.status(404).send("Package Name Taken");
         }
         let package= await PackageModel.create({name:name, price:price , doctorDiscount:doctorDiscount ,
             pharmacyDiscount,pharmacyDiscount, famMemDiscount:famMemDiscount})
          package.save();
         
         return res.status(200).send("Package Added Successfully");
      } catch (err) {
         res.status(500).json({ message: err.message });
      }
   }
   const adminUpdatePackage=async(req,res)=>
   {
      try
      {
         let name = req.query.name;
         let updatedPackage=req.body
         let package = await PackageModel.findOneAndUpdate({name:name},
            { $set: updatedPackage }, // Update with new package data
            { new: true });
         if(!package)
         {
            return res.status(404).json({ message: 'Package not found' });
         }
         package.save();
         return res.status(200).json("Package Updated Successfully");
      } catch (err) {
         res.status(500).json({ message: err.message });
      }
   }

   const adminDeletePackage=async(req,res)=>
   {
      try
      {
         {
            let name = req.query.name;
            let package = await PackageModel.findOneAndDelete({name:name});
            if(!package)
            {
               return res.status(404).json({ message: 'Package not found' });
            }
            return res.status(200).send("Package deleted Successfully");
         } 
 
      } catch (err) {
         res.status(500).json({ message: err.message });
      }
   }

    const getPacakges=async(req,res)=>
    {
      try{
         const pack= await PackageModel.find();
         res.status(200).json(pack)
      } catch (err) {
         res.status(500).json({ message: err.message });
      }
    }
   module.exports = {adminAddPackage , adminUpdatePackage , adminDeletePackage , getPacakges}