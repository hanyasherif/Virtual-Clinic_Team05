const mongoose = require('mongoose');
const Schema = mongoose.Schema;

                        
const payingSchema = new Schema({
    payWith: {
        type: boolean,
        required: true
      },
    cardNumber: {
        type: Number,
        required: true
      },
      CVV: {
        type: Number,
        required: true
      },
      walletInfo: {
        type: Number,
        required: true
      },
     /* famMemGender:{
        type: String,
        required: true
      },
      famMemRelation: {
        type: String,
        required: true
      },*/
      patient:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
      }
  }, { timestamps: true });
  
  const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
  module.exports = FamilyMember;