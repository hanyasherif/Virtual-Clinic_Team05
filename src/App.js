// External variables
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
// const {createMedicine, getMedicine, updateMedicine} = require("./Routes/MedicineController");
const {addAdminstrator, removeUser,AddPatient,AddDoctor,CreatAppoint} = require("./Routes/userController.js");


//THIS IS THE TASK CODE TO GUIDE YOUUU
//Need to Check About requests
//const{RegisterAsDoc}=require("./Routes/userController")
const{ ViewPatients, EditMyInfo,SearchPatient,filteredAppointments,GetPFullData}=require("./Routes/DrController");


//App variables
const app = express();
app.use(cors());
const port = process.env.PORT || "3000";
app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})
// const medicine = require('./Models/Medicine');
// #Importing the userController

const MongoURI = process.env.MONGO_URI;

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

app.use(express.json());
app.post("/addAdminstrator", addAdminstrator);
app.delete("/removeUser", removeUser);
app.post("/Addpatient", AddPatient);
app.post("/Adddoctor", AddDoctor);
app.post("/AddC", CreatAppoint);
app.get("/getC",ViewPatients);
app.get("/SearchP",SearchPatient);//Searchbyname
app.post("/Edit",EditMyInfo);
app.get("/UpcomingAppoint",filteredAppointments);
app.get("/GetFullData",GetPFullData)
// app.post("/addMedicine",createMedicine);
// app.get("/medicines", getMedicine);
// app.put("/updateMedicine/:id", updateMedicine);


/*
                                                    End of your code
*/

