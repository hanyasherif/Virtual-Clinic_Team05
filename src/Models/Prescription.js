const mongoose = require('mongoose');
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
    medicine:{
        type:[String],
        required: true
    },
    dosage:{
      type:[String],
      required: true
  }
  }, { timestamps: true });
  
  const Prescription = mongoose.model('Prescription', prescriptionSchema);