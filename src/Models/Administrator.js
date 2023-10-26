const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//username and password

const administratorSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  
  }, { timestamps: true });
                        
const Administrator = mongoose.model('Administrator', administratorSchema);
module.exports = Administrator;

