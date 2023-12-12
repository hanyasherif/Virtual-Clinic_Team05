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
   filterAppointmentsStatus,getDoctorName , AddPatient,AddDoctor,CreatAppoint, logout, viewAppointmentsOfDoctor, 
   uploadMedicalDocument, findPatById,login, removeMedicalDocument, 
    servefiles ,getUploaded} = require("./Routes/userController");

const {createPres , viewPatientPrescriptions , filterPrescriptions , getPrescription} = require("./Routes/PrescriptionController");
const {adminAddPackage , adminDeletePackage , adminUpdatePackage , getPacakges} = require("./Routes/AdminController");
const {addRequest, getRequests, getARequest,  handleReject, handleAccept } = require("./Routes/requestController");
const{addAppointment} = require("./Routes/appointmentController");
const{viewPackages , subscribePackage , viewMyPackage , cancelPackage} = require("./Routes/PatientController");
const{ ViewPatients, EditMyInfo,SearchPatient,filteredAppointments,GetPFullData}=require("./Routes/DrController");
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

app.post("/addAdministrator", addAdministrator);
app.delete("/removeUser", removeUser);
app.post("/checkUsername", checkUsername);
app.get("/getAllUsers", requireAuth, getUsers);
app.get("/searchByName",searchByName);
app.get("/searchBySpec",searchBySpec);
app.get("/searchByNameSpec",searchByNameSpec);
app.get("/viewDoctors",requireAuth, viewDoctors);
app.get("/getDoctorInfo", getDoctorInfo);
app.get("/getSpecs", getSpecs);
app.get("/filterSpecs/:spec", filterSpecs);
app.get("/filterDate/:date", filterByDate);
app.get("/filterDateSpecs", filterDateSpecs);
app.put("/logout", logout);
app.get("/viewAppointmentsOfDoctor/:docID", viewAppointmentsOfDoctor);
app.post( '/upload-document', upload.single('document'), requireAuth,uploadMedicalDocument );
app.delete('/remove-document/:documentId',requireAuth,  removeMedicalDocument);
app.get('/getUploaded', requireAuth,getUploaded);
app.get("/serveFile/:id/:filePath/:fileName", servefiles);

// #Routing to userController here
///mohab

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
app.post("/login", login);
app.get("/getPatientById",findPatById);
////wael

app.post("/addRequest", addRequest);
app.get("/getRequests", requireAuth, getRequests);
app.get("/getARequest", getARequest);

//////////////////////////////////aseel/////////////////////////////
app.post("/addFamilyMember/:id",addFamilyMember); //no /:id(username) 3shan ana 7atah alreadyf body((or not?))
app.get("/viewRegFamilyMembers/:id",viewRegFamilyMembers);
app.get("/viewAppointments",requireAuth,viewAppointments);
app.get("/filterAppointmentsDate/:date",filterAppointmentsDate); 
app.get("/filterAppointmentsStatus/:status",filterAppointmentsStatus);
app.get("/getDoctorName/:id", getDoctorName);
app.post("/addAppointment",addAppointment);


////////////////////////////////////////////////sherif and momen/////////////////////////////
app.post("/Addpatient", AddPatient);
app.post("/Adddoctor", AddDoctor);
app.post("/AddC", CreatAppoint);
app.get("/getC",ViewPatients);
app.get("/SearchP",SearchPatient);//Searchbyname
app.post("/Edit",EditMyInfo);
app.get("/UpcomingAppoint",filteredAppointments);
app.get("/GetFullData",GetPFullData);
app.put("/handleAccept/:requestId", handleAccept);
app.put("/handleReject/:requestId", handleReject);


app.get("/viewPackages",viewPackages);
app.post("/subPackage", subscribePackage);
app.get("/viewMyPackage",viewMyPackage);
app.put("/cancelPackage",cancelPackage);
