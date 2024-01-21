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
    },status:{
      type: String
    },
    doc: {type:[String]}


  }, { timestamps: true });
  
  const Request = mongoose.model('Request', requestSchema);
  module.exports = Request;