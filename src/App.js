// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const {createMedicine, getMedicine, updateMedicine} = require("./Routes/MedicineController");
const MongoURI = process.env.MONGO_URI ;


//App variables
const app = express();
const port = process.env.PORT || "8000";
const medicine = require('./Models/Medicine');
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
app.post("/addMedicine",createMedicine);
app.get("/medicines", getMedicine);
app.put("/updateMedicine/:id", updateMedicine);
//app.delete("/deleteUser/:id", deleteUser);


/*
                                                    End of your code
*/

