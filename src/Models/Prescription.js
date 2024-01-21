const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const Schema = mongoose.Schema;

                        
const prescriptionSchema = new Schema({
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
    filled: {
        type: Boolean,
        required: true
    },
    medicines:{
        type:[String],
        required: true
    },
    dosage:{
      type:[String],
      required: true
  },
  instruction:{
    type: String
  },
  appointmentId: {
    type: mongoose.Types.ObjectId,
      ref:'Appointment',
      required: true
  },
  instruction:{
    type: String
  },
  appointmentId: {
    type: mongoose.Types.ObjectId,
      ref:'Appointment',
      required: true
  },
  patientName:{
    type: String,
    required: true
  },doctorName:{
    type: String,
    required: true
  }
  }, { timestamps: true });
  
  const Prescription = mongoose.model('Prescription', prescriptionSchema);

  module.exports = Prescription;