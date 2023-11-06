const mongoose = require('mongoose');
const Schema = mongoose.Schema;

                        
const familyMemberSchema = new Schema({
    famMemName: {
        type: String,
        required: true
      },
    famMemNatID: {
        type: Number,
        required: true
      },
      famMemAge: {
        type: Number,
        required: true
      },
      famMemGender:{
        type: String,
        required: true
      },
      famMemRelation: {
        type: String,
        required: true
      },
      patient:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
      }
  }, { timestamps: true });
  
  const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
  module.exports = FamilyMember;