const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//register as a patient using username, name, email, password, date of birth,
// gender, mobile number, emergency contact ( full name , mobile number, relation to the patient)

                        
const patientSchema = new Schema({
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
  gender: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  emergencyContact:
    {
        type: mongoose.Types.ObjectId,
        ref:'EmergencyContact',
        required: true
    }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;