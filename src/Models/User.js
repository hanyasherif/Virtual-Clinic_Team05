const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const Schema = mongoose.Schema;

                        
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
    },
    famMemName: {
        type: String
      },
    famMemNatID: {
        type: Number
      },
      famMemAge: {
        type: Number
      },
      famMemGender:{
        type: String
      },
      famMemRelation: {
        type: String
      },
      docSpeciality:{
        type: String
      },
      HealthRecord:{
        type:[String]
      }
  }, { timestamps: true });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;