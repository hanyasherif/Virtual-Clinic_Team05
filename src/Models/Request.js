const mongoose = require('mongoose');
const Schema = mongoose.Schema;

                        
const requestSchema = new Schema({
    username: {
      type: String,
      required: true
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
        type: Date
    },
    hourlyRate: {
        type: Number
    },
    doctor: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    affiliation: {
        type: String
    },
    educationalBackground:{
        type: String
    },
    status: {
        type: String
    }
  }, { timestamps: true });
  
  const Request = mongoose.model('Request', requestSchema);
  module.exports = Request;