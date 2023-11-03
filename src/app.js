// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
// const {createMedicine, getMedicine, updateMedicine} = require("./Routes/MedicineController");
const {addAdminstrator, getUsers , registerPatient, deleteUser  } = require("./Routes/userController");
const {createPres , viewPatientPrescriptions , filterPrescriptions} = require("./Routes/PrescriptionController");
const {adminAddPackage , adminDeletePackage , adminUpdatePackage} = require("./Routes/AdminController");

const MongoURI = process.env.MONGO_URI ;

//THIS IS THE TASK CODE TO GUIDE YOUUU






//App variables
const app = express();
const port = process.env.PORT || "8000";
app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})
// const medicine = require('./Models/Medicine');
// #Importing the userController


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

app.use(express.json())
app.post("/addAdminstrator", addAdminstrator);
app.post("/admin/addPackage", adminAddPackage);
app.delete("/admin/deletePackage", adminDeletePackage);
app.put("/admin/updatePackage", adminUpdatePackage);
app.delete("/deleteUser/:username", deleteUser);
app.post("/registerPatient",registerPatient);
app.get("/users", getUsers);
app.delete("/deleteUser/:username", deleteUser);
//app.put("/addFamMem/:username", addFamMem);

// app.put("/updateMedicine/:id", updateMedicine);

//// Prescription routes
app.post("/addPrescription",createPres);
app.get("/viewPrescription", viewPatientPrescriptions);
app.get("/filterPrescription", filterPrescriptions);
/*
                                                    End of your code
*/