const userModel = require('../Models/User.js');
const PrescriptionModel = require('../Models/Prescription.js');
const appointmentModel = require('../Models/Appointment.js');
const PackageModel = require('../Models/Package.js');
const { default: mongoose } = require('mongoose');
const familyMemberModel = require('../Models/FamilyMember.js');
const AppointmentModel = require('../Models/Appointment.js');



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
        const patId= req.query.patId
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
            return res.status(404).json({ message: 'Patient already subscribed to package' });
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
        
        const patId= req.query.patId
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
        const patId= req.query.patId
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

  
module.exports = {viewPackages ,subscribePackage , viewMyPackage ,cancelPackage}; 