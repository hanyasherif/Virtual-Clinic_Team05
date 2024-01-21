const mongoose = require('mongoose');
const Schema = mongoose.Schema;

                        
const payingSchema = new Schema({
    
    cardNumber: {
        type: Number,
        required: true
      },
      CVV: {
        type: Number,
        required: true
      },
      expiryDate: {
        type: Date
      },
      patientP:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
      }
  }, { timestamps: true });
  
  const Paying = mongoose.model('Paying', payingSchema);
  module.exports = Paying;