const express = require("express");
const mongoose = require('mongoose');
const upload = require('../src/MulterConfig');

mongoose.set('strictQuery', false);
require("dotenv").config();
const cookieParser = require('cookie-parser');
const path = require('path');
const { requireAuth } = require('./Middleware/authMiddleware');
const bodyParser = require("body-parser");
const {addAdministrator, removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, 
  viewDoctors, getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs  ,
   registerPatient, deleteUser, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,
   filterAppointmentsStatus, AddPatient,AddDoctor,CreatAppoint, logout, viewAppointmentsOfDoctor, 
   uploadMedicalDocument, findPatById,login, removeMedicalDocument, 
    servefiles ,getUploaded ,    getWalletInfo,getFamilyMemberData,getUserByEmail, getUserByPhoneNumber,
    getUserByUsername,modifyWallet,modifyWalletDoctor , getUserById,getUserByTokenId} 
    = require("./Routes/userController");

const {createPres , viewPatientPrescriptions , filterPrescriptions , getPrescription} = require("./Routes/PrescriptionController");
const {adminAddPackage , adminDeletePackage , adminUpdatePackage , getPacakges} = require("./Routes/AdminController");
const {addRequest, getRequests, getARequest,  handleReject, handleAccept } = require("./Routes/requestController");
const{viewPackages , subscribePackage , viewMyPackage , cancelPackage , CheckOTP , CEmail , GEmail ,changePassword } = require("./Routes/PatientController");
// const {addAdministrator, removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, viewDoctors, getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs  ,
//    registerPatient, deleteUser, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,filterAppointmentsStatus,getUserById , AddPatient,AddDoctor,CreatAppoint, logout, viewAppointmentsOfDoctor,
//    getWalletInfo,getFamilyMemberData,getUserByEmail, getUserByPhoneNumber,getUserByUsername,modifyWallet,modifyWalletDoctor} = require("./Routes/userController");
const{addAppointment,getAppointmentInfo,modifyAppointment,createAppointment} = require("./Routes/appointmentController");
const{ ViewPatients, EditMyInfo,SearchPatient,filteredAppointments,GetPFullData , AddNewHR , ViewUpdatedHRforD ,scheduleFollowUp}=require("./Routes/DrController");
const {createContract, acceptContract,   rejectContract,   getContract}= require("./Routes/employmentController");
const MongoURI = process.env.MONGO_URI ;

//App variables
const app = express();

const cors = require('cors');
const { default: test } = require("node:test");
const port = process.env.PORT || "8000";

app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})

// configurations
// Mongo DB

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
app.use(bodyParser.json());
// #Routing to userController here
////////////////////////////////////////////////hanya//////////////////////////////////////////////////////////
app.use(express.static('public'));

const corsOptions = {
   origin:"http://localhost:3000",//included origin as true
  credentials: true, //included credentials as true
};

app.use(cors({
  origin:"http://localhost:3000",//included origin as true
 credentials: true, //included credentials as true
}));
app.use(cookieParser());
 

app.post("/ChangeEmailPassword",GEmail);
app.post("/otpChecker",CheckOTP);
app.get("/CheckEmail",CEmail);
app.post("/ChangePassword",requireAuth("ALL"),changePassword);

app.post("/addAdministrator", requireAuth("Administrator"),addAdministrator);
app.delete("/removeUser", requireAuth("Administrator"),removeUser);
app.post("/checkUsername", requireAuth,checkUsername);
app.get("/getAllUsers", requireAuth("Administrator"), getUsers);
app.get("/searchByName",requireAuth("Patient"),searchByName);
app.get("/searchBySpec",requireAuth("Patient"),searchBySpec);
app.get("/searchByNameSpec",requireAuth("Patient"),searchByNameSpec);
app.get("/viewDoctors",requireAuth("Patient"), viewDoctors);
app.get("/getDoctorInfo",requireAuth("Patient"), getDoctorInfo);
app.get("/getSpecs",requireAuth("Patient"), getSpecs);
app.get("/filterSpecs/:spec",requireAuth("Patient"), filterSpecs);
app.get("/filterDate/:date",requireAuth("Patient"), filterByDate);
app.get("/filterDateSpecs",requireAuth("Patient"), filterDateSpecs);
app.put("/logout", requireAuth("ALL"),logout);
app.get("/viewAppointmentsOfDoctor/:docID", viewAppointmentsOfDoctor);
app.post( '/upload-document', upload.single('document'), requireAuth("Patient"),uploadMedicalDocument );
app.delete('/remove-document/:documentId',requireAuth("Patient"),  removeMedicalDocument);
app.get('/getUploaded', requireAuth("Patient"),getUploaded);
app.get("/serveFile/:id/:filePath/:fileName", servefiles);

// #Routing to userController here
///mohab

app.post("/admin/addPackage", requireAuth("Administrator"), adminAddPackage);
app.delete("/admin/deletePackage", requireAuth("Administrator"), adminDeletePackage);
app.put("/admin/updatePackage", requireAuth("Administrator"), adminUpdatePackage);
app.delete("/deleteUser/:username", requireAuth("Administrator"), deleteUser);
app.post("/createPatient",registerPatient);
app.get("/packs", getPacakges);
app.post("/addPrescription",createPres);
app.get("/viewPrescription/:username", viewPatientPrescriptions)
app.get("/filterPrescription", filterPrescriptions);
app.get("/getPrescription", getPrescription);
app.post("/login", login);
app.get("/getPatientById",findPatById);
////wael

app.post("/addRequest", requireAuth("Doctor"), addRequest);
app.get("/getRequests", requireAuth("Administrator"), getRequests);
app.get("/getARequest", getARequest);

//////////////////////////////////aseel/////////////////////////////
app.post("/addFamilyMember",requireAuth("Patient"),addFamilyMember); //no /:id(username) 3shan ana 7atah alreadyf body((or not?))
app.get("/viewRegFamilyMembers",requireAuth("Patient"),viewRegFamilyMembers);
app.get("/viewAppointments",requireAuth,viewAppointments);
app.get("/filterAppointmentsDate/:date",filterAppointmentsDate); 
app.get("/filterAppointmentsStatus/:status",filterAppointmentsStatus);
app.get("/getUserById/:id", getUserById);
app.get("/getUserByTokenId", getUserByTokenId);
app.post("/addAppointment",addAppointment);
app.get("/getAppointmentInfo",getAppointmentInfo) //query in frontenddd
app.get("/getWalletInfo",requireAuth("Patient"),getWalletInfo);
app.get("/getFamilyMemberData",requireAuth("Patient"),getFamilyMemberData);
app.post('/modifyAppointment', modifyAppointment);
app.get("/getUserById/:id", getUserById);
app.get("/getUserByEmail/:email",getUserByEmail);
app.get("/getUserByPhoneNumber/:phoneNumber",getUserByPhoneNumber);
app.get("/getUserByUsername/:username", getUserByUsername);
app.post("/modifyWallet", modifyWallet);
app.post("/modifyWalletDoctor", modifyWalletDoctor);


app.post("/createContract", requireAuth("Administrator"), createContract);
app.put("/acceptContract", requireAuth("Doctor"), acceptContract);
app.put("/rejectContract", requireAuth("Doctor"), rejectContract);
app.get("/getContract", requireAuth("Doctor"), getContract);

app.post("/createAppointment",createAppointment);

////////////////////////////////////////////////sherif and momen/////////////////////////////
app.post("/Addpatient", AddPatient);
app.post("/Adddoctor", AddDoctor);
app.post("/AddC", CreatAppoint);
app.get("/getC",ViewPatients);
app.get("/SearchP",SearchPatient);//Searchbyname
app.post("/Edit",EditMyInfo);
app.get("/UpcomingAppoint",filteredAppointments);
app.get("/GetFullData",GetPFullData);
app.put("/handleAccept/:requestId", requireAuth("Administrator"), handleAccept);
app.put("/handleReject/:requestId", requireAuth("Administrator"), handleReject);


app.get("/viewPackages",requireAuth("Patient"),viewPackages);
app.post("/subPackage",requireAuth("Patient"),subscribePackage);
app.get("/viewMyPackage",requireAuth("Patient"),viewMyPackage);
app.put("/cancelPackage",requireAuth("Patient"),cancelPackage);


app.post("/AddNewHR",AddNewHR);
app.get("/ViewUpdatedHRforD",ViewUpdatedHRforD);
app.post("/scheduleFollowUp", requireAuth("Doctor"),scheduleFollowUp);