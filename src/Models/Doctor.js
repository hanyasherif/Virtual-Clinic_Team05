const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//submit a request to register as doctor using username, name, email, 
//password, date of birth, hourly rate, affiliation (hospital), educational background

const doctorSchema = new Schema({   
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    educationalBackground:{
        type: String,
        required: true
    }
    }, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
