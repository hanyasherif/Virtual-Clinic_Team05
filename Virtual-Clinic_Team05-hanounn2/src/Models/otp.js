const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const Schema = mongoose.Schema;
const OtpSchema = new Schema({
    number: {
      type: String,
      required: true
    },
    Useremail: {
        type: String,
        required: true
      }
  }, { timestamps: true });
  
  const otpS = mongoose.model('otp', OtpSchema);
  module.exports = otpS;