// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
// const {createMedicine, getMedicine, updateMedicine} = require("./Routes/MedicineController");
const {addAdminstrator, removeUser} = require("./Routes/userController");

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
app.delete("/removeUser", removeUser);
// app.post("/addMedicine",createMedicine);
// app.get("/medicines", getMedicine);
// app.put("/updateMedicine/:id", updateMedicine);


/*
                                                    End of your code
*/

