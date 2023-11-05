// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
// const {createMedicine, getMedicine, updateMedicine} = require("./Routes/MedicineController");
const {addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,filterAppointmentsStatus,getDoctorName} = require("./Routes/userController");
const{addAppointment} = require("./Routes/appointmentController");
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
app.post("/addFamilyMember/:id",addFamilyMember); //no /:id(username) 3shan ana 7atah alreadyf body((or not?))
app.get("/viewRegFamilyMembers/:id",viewRegFamilyMembers);
app.get("/viewAppointments",viewAppointments);
app.get("/filterAppointmentsDate/:date",filterAppointmentsDate); 
app.get("/filterAppointmentsStatus/:status",filterAppointmentsStatus);
app.get("/getDoctorName/:id", getDoctorName);
app.post("/addAppointment",addAppointment);

/*
                                                    End of your code
*/

