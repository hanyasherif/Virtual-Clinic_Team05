const mongoose = require('mongoose');
const Schema = mongoose.Schema;

                        
const appointmentSchema = new Schema({
    date: {
      type: Date,
      required: true
    },
    doctor: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    status: {
        type: String,
        required: true
    }
  }, { timestamps: true });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  module.exports = Appointment;