const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema for patients
    required: true
  },
  items: [
    {
      medicine: {
        type: Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
