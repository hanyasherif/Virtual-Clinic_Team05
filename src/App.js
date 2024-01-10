const express = require("express");
const mongoose = require('mongoose');
const upload = require('../src/MulterConfig');
const upload2 = require('../src/MulterConfig');
// from 'uuid';
mongoose.set('strictQuery', false);
require("dotenv").config();
const cookieParser = require('cookie-parser');
const path = require('path');
const { requireAuth } = require('./Middleware/authMiddleware');
const bodyParser = require("body-parser");
const app = express();
const http = require('http');


const { Server } = require("socket.io");
const { v4: uuidv4 } = require('uuid');
const SimplePeer =require('simple-peer');


const socketio =  require('socket.io');

//const server = http.createServer(app);



const uploadPh = require('./multerConfigV2');

const MongoURI = process.env.MONGO_URI ;



//const { default: test } = require("node:test");


app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})




app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});
app.use(bodyParser.json());
// #Routing to userController here
////////////////////////////////////////////////hanya//////////////////////////////////////////////////////////
app.use(express.static('public'));



const cors = require('cors');

const corsOptions = {
  origin:"http://localhost:3000",//included origin as true
  credentials: true, //included credentials as true
};

app.use(cors({
  origin:"http://localhost:3000",//included origin as true
  credentials: true, //included credentials as true
}));
app.use(cookieParser());
// Example route that uses multer for file uploads
app.post('/upload', uploadPh.single('picture'), (req, res) => {
  // Handle the uploaded file here and return the file path
  const filePath = req.file ? req.file.path : '';
  res.json({ message: 'File uploaded successfully!', filePath });
});

// chat

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on("join_room", (data) => {
    socket.join(data);
    socket.to(data).emit("joined_user",{socketId: socket.id});
    console.log("User with ID:"+socket.id +"joined room:" +data);
  });
  

	

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	
	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
  
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// configurations
// Mongo DB

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
  // Starting server
  server.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));

const {addAdministrator, removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, 
  viewDoctors, getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs  ,
   registerPatient, deleteUser, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,
   filterAppointmentsStatus, AddPatient,AddDoctor,CreatAppoint, logout, viewAppointmentsOfDoctor, 
   uploadMedicalDocument, findPatById,login, removeMedicalDocument, 
    servefiles ,getUploaded ,    getWalletInfo,getFamilyMemberData,getUserByEmail, getUserByPhoneNumber,
    getUserByUsername,modifyWallet,modifyWalletDoctor , getUserById,getUserByTokenId, phviewPatients,
     viewPharmacists, getWalletInfoDoc,searchByNamePatients,getMyId,payStripe} 
    = require("./Routes/userController");


const {sendEmail,getRoom} = require("./Routes/VideoChatController");
const {createPres , viewPatientPrescriptions , filterPrescriptions , getPrescription,getDoctorPresription,getPatientPresription,modifyDosage,
  addMedicine, deleteMedicine, modifyInstruction, generatePdf} = require("./Routes/PrescriptionController");
const {adminAddPackage , adminDeletePackage , adminUpdatePackage , getPacakges} = require("./Routes/AdminController");
const {addRequest, getRequests, getARequest,  handleReject, handleAccept } = require("./Routes/requestController");
const{viewPackages , subscribePackage , viewMyPackage , cancelPackage , CheckOTP , CEmail , GEmail ,changePassword , ViewPackage} = require("./Routes/PatientController");
// const {addAdministrator, removeUser, checkUsername, getUsers, searchByName, searchBySpec, searchByNameSpec, viewDoctors, getDoctorInfo, getSpecs, filterSpecs, filterByDate, filterDateSpecs  ,
//    registerPatient, deleteUser, addFamilyMember,viewRegFamilyMembers,viewAppointments,filterAppointmentsDate,filterAppointmentsStatus,getUserById , AddPatient,AddDoctor,CreatAppoint, logout, viewAppointmentsOfDoctor,
//    getWalletInfo,getFamilyMemberData,getUserByEmail, getUserByPhoneNumber,getUserByUsername,modifyWallet,modifyWalletDoctor} = require("./Routes/userController");
const{addAppointment,getAppointmentInfo,modifyAppointment,createAppointment,getDoctorAppointments,AppointmentCompleted,CancelAppointment,rescheduleAppointmentForP,requestFollowUpAppointment,acceptFollowUpRequest,rejectFollowUpRequest,viewFollowUpRequests
,getDoctorAppointmentWithPatient} = require("./Routes/appointmentController");
const{ ViewPatients, EditMyInfo,SearchPatient,filteredAppointments,GetPFullData , AddNewHR , ViewUpdatedHRforD ,scheduleFollowUp}=require("./Routes/DrController");
const {createContract, acceptContract,   rejectContract,   getContract}= require("./Routes/employmentController");

//////PHARMA OLAYAN
const { createMedicine, getMedicine, updateMedicine, searchMedicine, filterMedicine, prescriptionMedicine, findAlternativeMedicines, getSales,getMedIdName } = require("./RoutesPh/MedicineController");
const { addRequestPH, getRequestsPH, getARequestPH, handleAcceptPH, handleRejectPH } = require("./RoutesPh/requestController");
//const { loginPH, CEmailPH,GEmailPH,CheckOTPPH, changePasswordPH } = require("./RoutesPh/userController");

const { addAdministratorPH, removeUserPH, checkUsernamePH, getUsersPH, registerPatientPH,
   deleteUserPH, adminViewPharmacists, adminViewPatients, logoutPH } = require("./RoutesPh/userController");

const { addAddress, searchAddress } = require("./RoutesPh/AddressController");

const {addToCart, viewCart, removeFromCart, 
  changeCartItemQuantity, 
  checkout, createPaymentIntent, getCartTotalAmount } = require("./RoutesPh/cartController");

const {viewOrders, cancelOrder} = require("./RoutesPh/orderController");

const {uploadDoctorDocument} = require("./Routes/userController");
//App variables

//const cors = require('cors');
//const { default: test } = require("node:test");
const port = process.env.PORT || "8000";

app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})

// configurations
// Mongo DB






app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });
app.use(bodyParser.json());
// #Routing to userController here
////////////////////////////////////////////////hanya//////////////////////////////////////////////////////////
app.use(express.static('public'));

// const corsOptions = {
//    origin:"http://localhost:3000",//included origin as true
//   credentials: true, //included credentials as true
// };

app.use(cors({
  origin:"http://localhost:3000",//included origin as true
 credentials: true, //included credentials as true
}));
app.use(cookieParser());
 // Example route that uses multer for file uploads
app.post('/upload', uploadPh.single('picture'), (req, res) => {
  // Handle the uploaded file here and return the file path
  const filePath = req.file ? req.file.path : '';
  res.json({ message: 'File uploaded successfully!', filePath });
});

//video




///
app.post("/ChangeEmailPassword",GEmail);
app.post("/otpChecker",CheckOTP);
app.get("/CheckEmail",CEmail);
app.post("/ChangePassword",requireAuth("ALL"),changePassword);

app.post("/addAdministrator", requireAuth("Administrator"),addAdministrator);
app.delete("/removeUser", requireAuth("Administrator"),removeUser);
app.post("/checkUsername", requireAuth,checkUsername);
app.get("/getAllUsers", getUsers);
app.get("/searchByName",requireAuth("Patient"),searchByName);
app.get("/searchBySpec",requireAuth("Patient"),searchBySpec);
app.get("/searchByNameSpec",requireAuth("Patient"),searchByNameSpec);
app.get("/viewDoctors",requireAuth("Patient"), viewDoctors);
app.get("/pharmacistviewDoctors",requireAuth("Pharmacist"), viewDoctors); //chat
app.get("/pharmacistViewPatients",requireAuth("Pharmacist"), phviewPatients); //chat
app.get("/viewPharmacists",requireAuth("Patient"), viewPharmacists); //chat
app.get("/docviewPharmacists",requireAuth("Doctor"), viewPharmacists); //chat
app.get("/getDoctorInfo",requireAuth("Patient"), getDoctorInfo);
app.get("/getSpecs",requireAuth("Patient"), getSpecs);
app.get("/filterSpecs/:spec",requireAuth("Patient"), filterSpecs);
app.get("/filterDate/:date",requireAuth("Patient"), filterByDate);
app.get("/filterDateSpecs",requireAuth("Patient"), filterDateSpecs);
app.put("/logout", requireAuth("ALL"),logout);
app.get("/viewAppointmentsOfDoctor/:docID", viewAppointmentsOfDoctor);
app.post( '/upload-document', upload.single('document'), requireAuth("Patient"),uploadMedicalDocument );
app.post( '/upload-doc', upload2.single('document'),uploadDoctorDocument );


app.delete('/remove-document/:documentId',requireAuth("Patient"),  removeMedicalDocument);
app.get('/getUploaded', requireAuth("Patient"),getUploaded);
app.get("/serveFile/:filePath/:fileName", servefiles);
app.get("/getDoctorAppointmentWithPatient",requireAuth("Doctor"), getDoctorAppointmentWithPatient);

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

app.post("/addRequest", addRequest);
app.get("/getRequests", requireAuth("Administrator"), getRequests);
app.get("/getARequest", getARequest);

//////////////////////////////////aseel/////////////////////////////
app.post("/addFamilyMember",requireAuth("Patient"),addFamilyMember); //no /:id(username) 3shan ana 7atah alreadyf body((or not?))
app.get("/viewRegFamilyMembers",requireAuth("Patient"),viewRegFamilyMembers);
app.get("/viewAppointments",requireAuth("Patient"),viewAppointments);
app.get("/filterAppointmentsDate/:date",filterAppointmentsDate); 
app.get("/filterAppointmentsStatus/:status",requireAuth("Patient"),filterAppointmentsStatus);
app.get("/getUserById/:id", getUserById);
app.get("/getUserByTokenId", getUserByTokenId);
app.post("/addAppointment",addAppointment);
app.get("/getAppointmentInfo",getAppointmentInfo) //query in frontenddd
app.get("/getWalletInfo",requireAuth("Patient"),getWalletInfo);
app.get("/getWalletInfoDoc",requireAuth("Doctor"),getWalletInfoDoc);

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

app.get("/getDoctorAppointments", getDoctorAppointments); 
app.post("/AppointmentCompleted/:appointmentId",AppointmentCompleted);
app.get("/getDoctorPresription",getDoctorPresription);
app.get("/getPatientPresription/:id", getPatientPresription); //session // zyadaaa

app.post("/modifyDosage/:prescriptionId",modifyDosage);
app.post("/addMedicine/:prescriptionId",addMedicine);
app.post("/deleteMedicine/:prescriptionId",deleteMedicine);
app.post("/modifyInstruction/:prescriptionId",modifyInstruction);

app.get("/generatePdf/:prescriptionId" , generatePdf);

app.post("/searchByNamePatients", requireAuth("Doctor") , searchByNamePatients);
app.get("/getMyId",getMyId);
app.post("/payStripe",payStripe);
////////////////////////////////////////////////sherif and momen/////////////////////////////
app.post("/Addpatient", AddPatient);
app.post("/Adddoctor", AddDoctor);
app.post("/AddC", CreatAppoint);
app.get("/getC",ViewPatients);
app.get("/SearchP",SearchPatient);//Searchbyname
app.post("/Edit", requireAuth("Doctor"),EditMyInfo);
app.get("/UpcomingAppoint",filteredAppointments);
app.get("/GetFullData",GetPFullData);
app.put("/handleAccept/:requestId", requireAuth("Administrator"), handleAccept);
app.put("/handleReject/:requestId", requireAuth("Administrator"), handleReject);
app.post("/CancelAppointment",requireAuth("ALL"),CancelAppointment);
app.post("/ReschedulePatient",requireAuth("ALL"),rescheduleAppointmentForP);
app.post("/requestFollowUp",requireAuth("Patient"),requestFollowUpAppointment);
app.post("/acceptFollowUpRequest",requireAuth("Doctor"),acceptFollowUpRequest);
app.post("/rejectFollowUpRequest",requireAuth("Doctor"),rejectFollowUpRequest);
app.get("/viewFollowUpRequests",requireAuth("Doctor"),viewFollowUpRequests);
app.get("/viewPackage",requireAuth("Patient"),ViewPackage);

app.get("/viewPackages",requireAuth("Patient"),viewPackages);
app.post("/subPackage",requireAuth("Patient"),subscribePackage);
app.get("/viewMyPackage",requireAuth("Patient"),viewMyPackage);
app.put("/cancelPackage",requireAuth("Patient"),cancelPackage);


app.post("/AddNewHR",AddNewHR);
app.get("/ViewUpdatedHRforD",ViewUpdatedHRforD);
app.post("/scheduleFollowUp", requireAuth("Doctor"),scheduleFollowUp);


app.post('/sendEmail',sendEmail);


///////PHARMA


app.post('/addMedicine', upload.single('picture'), createMedicine);





//mangOOOOOOO
// #Routing to userController here

//app.use(express.json())
// app.post("/addMedicine",createMedicine);
app.get("/medicines", getMedicine);
app.put("/updateMedicine/:id", updateMedicine);
app.get("/Search", searchMedicine);
app.get("/filterMedicine", filterMedicine);
//app.post("/addAdministrator", addAdministrator);
app.delete("/removeUser", removeUser);
app.post("/checkUsername", checkUsername);
app.get("/getAllUsers", getUsers);
app.post("/addRequest", addRequest);
app.get("/getRequests", getRequests);
app.get("/getARequest", getARequest);
app.post("/registerPatient",registerPatient);
app.delete("/deleteUser/:username", deleteUser);
app.get("/admin/pharmicsts", adminViewPharmacists)
app.get("/admin/patients", adminViewPatients)



//sp2 routes

// app.post("/addToCart", addToCart);
// app.get("/viewCart", viewCart);
// app.delete("/removeFromCart", removeFromCart);
// app.put("/changeCartItemQuantity", changeCartItemQuantity);
// app.post("/checkout", checkout);
// app.get("/orders", viewOrders);
// app.put("/cancelOrder", cancelOrder);

// app.post("/addAddress", addAddress);
// app.get("/searchAddress", searchAddress);

//const jwt = require('jsonwebtoken');

//const {requireAuth} = require('./Middleware/authMiddleware');
//Middleware for JWT authentication


app.get("/logout", logout);
app.post("/login", login);

// Apply JWT authentication middleware to protected routes
app.post("/addToCart", addToCart);
app.get("/viewCart", viewCart);
app.delete("/removeFromCart", removeFromCart);
app.put("/changeCartItemQuantity", requireAuth, changeCartItemQuantity);
app.post("/checkout", requireAuth("Patient"), checkout);
app.get("/orders", requireAuth("Patient"), viewOrders);
app.put("/cancelOrder", requireAuth("Patient"), cancelOrder);


app.post("/addAddress", requireAuth("Patient"), addAddress);
app.get("/searchAddress", requireAuth("Patient"), searchAddress);

app.put("/handleAccept/:requestId", handleAccept);
app.put("/handleReject/:requestId", handleReject);

app.post("/create-payment-intent", requireAuth, createPaymentIntent);
// app.post("/create-payment-intent", createPaymentIntent);


app.post('/addMedicine', upload.single('picture'), createMedicine);


app.post("/ChangeEmailPassword",requireAuth,GEmail);
app.post("/otpChecker",requireAuth,CheckOTP);
//app.get("/CheckEmail",requireAuth,CEmail);

app.post("/ChangePassword",requireAuth,changePassword);



app.get("/getRoom",getRoom)
//new sp3
app.get("/prescriptions",requireAuth("Patient"),  prescriptionMedicine);
app.get("/alternativeMedicines", findAlternativeMedicines);
app.get("/getSales", getSales);

app.get("/getCartTotalAmount", getCartTotalAmount);


///////Aseel
app.post("/getMedIdName",getMedIdName);

/*
                                                    End of your code
*/
