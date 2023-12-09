// External variables
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
mongoose.set('strictQuery', false);
require("dotenv").config();
const { requireAuth } = require('./Middleware/authMiddleware');
// const {createMedicine, getMedicine, updateMedicine} = require("./Routes/MedicineController");
const { findPatById,login, addAdministrator, removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, viewDoctors, getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs  ,
   registerPatient, deleteUser, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,filterAppointmentsStatus,getDoctorName , AddPatient,AddDoctor,CreatAppoint} = require("./Routes/userController");
const {createPres , viewPatientPrescriptions , filterPrescriptions , getPrescription} = require("./Routes/PrescriptionController");
const {adminAddPackage , adminDeletePackage , adminUpdatePackage , getPacakges} = require("./Routes/AdminController");
const {addRequest, getRequests, getARequest} = require("./Routes/requestController");
const{addAppointment} = require("./Routes/appointmentController");
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
/*
                                                    Start of your code
*/

app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });

// #Routing to userController here
///hanya
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
   //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
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
app.get("/filterDateSpecs", filterDateSpecs)


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
app.get("/getPatientById", requireAuth,findPatById);


/*
                                                  End of your code
*/


////wael

app.post("/addRequest", addRequest);
app.get("/getRequests", getRequests);
app.get("/getARequest", getARequest);

///// aseel

app.post("/addFamilyMember/:id",addFamilyMember); //no /:id(username) 3shan ana 7atah alreadyf body((or not?))
app.get("/viewRegFamilyMembers/:id",viewRegFamilyMembers);
app.get("/viewAppointments",viewAppointments);
app.get("/filterAppointmentsDate/:date",filterAppointmentsDate); 
app.get("/filterAppointmentsStatus/:status",filterAppointmentsStatus);
app.get("/getDoctorName/:id", getDoctorName);
app.post("/addAppointment",addAppointment);


/////////////////// sherif and momen
app.post("/Addpatient", AddPatient);
app.post("/Adddoctor", AddDoctor);
app.post("/AddC", CreatAppoint);
app.get("/getC",ViewPatients);
app.get("/SearchP",SearchPatient);//Searchbyname
app.post("/Edit",EditMyInfo);
app.get("/UpcomingAppoint",filteredAppointments);
app.get("/GetFullData",GetPFullData);