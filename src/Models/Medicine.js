const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//view a list of all available medicines (including picture of medicine, price, description)
//view the available quantity, and sales of each medicine
//add a medicine with its details (active ingredients) , price and available quantity 

const medicineSchema = new Schema({
  name: {
    type: String,

  },
   picture: {
    type: Object,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,

  },
  availableQuantity: {
    type: Number,
    default: 0
    
  },
  sales: {
    type: Number,
    
  },
  activeIngredients: {
    type: String,
    required: true
  },
  medicinalUse: {
    type: String,
    required: true
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;