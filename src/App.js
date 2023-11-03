// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
// const {createMedicine, getMedicine, updateMedicine} = require("./Routes/MedicineController");
const {addAdministrator, removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, viewDoctors, getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs} = require("./Routes/userController");

const MongoURI = process.env.MONGO_URI ;

//App variables
const app = express();
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
app.get("/filterDateSpecs", filterDateSpecs)

