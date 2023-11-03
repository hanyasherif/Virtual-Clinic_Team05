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
    filled: {
        type: Boolean,
        required: true
    }
  }, { timestamps: true });
  
  const Prescription = mongoose.model('Prescription', prescriptionSchema);
  module.exports = Prescription;