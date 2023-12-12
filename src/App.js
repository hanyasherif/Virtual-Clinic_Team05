
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();

const {addAdministrator, removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, viewDoctors, getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs  ,
   registerPatient, deleteUser, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,filterAppointmentsStatus,getUserById , AddPatient,AddDoctor,CreatAppoint, logout, viewAppointmentsOfDoctor,
   getWalletInfo,getFamilyMemberData,getUserByEmail, getUserByPhoneNumber,getUserByUsername,modifyWallet,modifyWalletDoctor} = require("./Routes/userController");
const {createPres , viewPatientPrescriptions , filterPrescriptions , getPrescription} = require("./Routes/PrescriptionController");
const {adminAddPackage , adminDeletePackage , adminUpdatePackage , getPacakges} = require("./Routes/AdminController");
const {addRequest, getRequests, getARequest} = require("./Routes/requestController");
const{addAppointment,getAppointmentInfo,modifyAppointment,createAppointment} = require("./Routes/appointmentController");
const{ ViewPatients, EditMyInfo,SearchPatient,filteredAppointments,GetPFullData}=require("./Routes/DrController");
const {createContract, acceptContract,   rejectContract,   getContract}= require("./Routes/employmentController");
const MongoURI = process.env.MONGO_URI ;

//App variables
const app = express();
const cors = require('cors');
const port = process.env.PORT || "8000";

app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})

// configurations
// Mongo DB
app.use(cors());
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));


app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });

// #Routing to userController here
////////////////////////////////////////////////hanya//////////////////////////////////////////////////////////
app.use(express.json())
app.post("/addAdministrator", addAdministrator);
app.delete("/removeUser", removeUser);
app.post("/checkUsername", checkUsername);
app.get("/getAllUsers", getUsers);
app.get("/searchByName",searchByName);
app.get("/searchBySpec",searchBySpec);
app.get("/searchByNameSpec",searchByNameSpec);
app.get("/viewDoctors", viewDoctors);
app.get("/getDoctorInfo", getDoctorInfo);
app.get("/getSpecs", getSpecs);
app.get("/filterSpecs/:spec", filterSpecs);
app.get("/filterDate/:date", filterByDate);
app.get("/filterDateSpecs", filterDateSpecs);
app.get("/logout", logout);
app.get("/viewAppointmentsOfDoctor/:docID", viewAppointmentsOfDoctor);

// #Routing to userController here
////////////////////////////////mohab/////////////////////////////
app.use(express.json())
app.post("/admin/addPackage", adminAddPackage);
app.delete("/admin/deletePackage", adminDeletePackage);
app.put("/admin/updatePackage", adminUpdatePackage);
app.delete("/deleteUser/:username", deleteUser);
app.post("/createPatient",registerPatient);
app.get("/packs", getPacakges);
app.post("/addPrescription",createPres);
app.get("/viewPrescription/:username", viewPatientPrescriptions);
app.get("/filterPrescription", filterPrescriptions);
app.get("/getPrescription", getPrescription);



/////////////////////////////////wael/////////////////////////////
app.use(express.json())
app.post("/addRequest", addRequest);
app.get("/getRequests", getRequests);
app.get("/getARequest", getARequest);

//////////////////////////////////aseel/////////////////////////////
app.post("/addFamilyMember/:id",addFamilyMember); //no /:id(username) 3shan ana 7atah alreadyf body((or not?))
app.get("/viewRegFamilyMembers/:id",viewRegFamilyMembers);
app.get("/viewAppointments",viewAppointments);
app.get("/filterAppointmentsDate/:date",filterAppointmentsDate); 
app.get("/filterAppointmentsStatus/:status",filterAppointmentsStatus);
app.get("/getUserById/:id", getUserById);
app.post("/addAppointment",addAppointment);
app.get("/getAppointmentInfo",getAppointmentInfo) //query in frontenddd
app.get("/getWalletInfo/:id",getWalletInfo);
app.get("/getFamilyMemberData",getFamilyMemberData);
app.post('/modifyAppointment', modifyAppointment);
app.get("/getUserById/:id", getUserById);
app.get("/getUserByEmail/:email",getUserByEmail);
app.get("/getUserByPhoneNumber/:phoneNumber",getUserByPhoneNumber);
app.get("/getUserByUsername/:username", getUserByUsername);
app.post("/modifyWallet", modifyWallet);
app.post("/modifyWalletDoctor", modifyWalletDoctor);


app.post("/createContract", createContract);
app.post("/acceptContract/:doctorId", acceptContract);
app.post("/rejectContract/:doctorId", rejectContract);
app.get("/getContract/:doctorId", getContract);

app.post("/createAppointment/:id",createAppointment);

////////////////////////////////////////////////sherif and momen/////////////////////////////
app.post("/Addpatient", AddPatient);
app.post("/Adddoctor", AddDoctor);
app.post("/AddC", CreatAppoint);
app.get("/getC",ViewPatients);
app.get("/SearchP",SearchPatient);//Searchbyname
app.post("/Edit",EditMyInfo);
app.get("/UpcomingAppoint",filteredAppointments);
app.get("/GetFullData",GetPFullData);
