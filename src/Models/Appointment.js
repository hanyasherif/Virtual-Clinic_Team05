const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
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
        ref:'User'
    },
    status: {
        type: String,
        default:"free"
    },
    price: {
        type: Number,
        required: true
    },
    followUp:{
        type:Boolean
    },
    followUpDate:{
        type: Date,
    }
  }, { timestamps: true });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  module.exports = Appointment;