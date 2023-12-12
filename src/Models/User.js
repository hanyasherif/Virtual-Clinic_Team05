const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const Schema = mongoose.Schema;

const medicalDocumentSchema = new mongoose.Schema({
  name: String,
  path: String,
}); 

const userSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String
    },
    mobileNumber: {
      type: Number
    },
        emergencyContactFullname:
      {
          type: String
      },
    emergencyContactMobileNumber:
    {
        type: Number
    },
    hourlyRate: {
        type: Number
    },
    affiliation: {
        type: String
    },
    educationalBackground:{
        type: String
    },docSpeciality:{
        type: String
      },
     package: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      packageStatus: {
        type: String
      },
      HealthRecord:{
        type:[String]
      },
      medicalHistory: [medicalDocumentSchema],
      walletInfo:{
        type: Number,
        default: 0
      
      }
  }, { timestamps: true });
  
  const User = mongoose.model('User', userSchema);

  module.exports = User;