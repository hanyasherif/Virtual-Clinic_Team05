const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const packageSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
        type: Number,
        required: true
    },
    doctorDiscount: {
        type: Number,
        required: true
    },
    pharmacyDiscount: {
        type: Number,
        required: true
    },
    famMemDiscount: {
        type: Number,
        required: true
    },
  }, { timestamps: true });
  


const Package = mongoose.model('Package', packageSchema);
  module.exports = Package;