const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employmentContractSchema = new Schema({

    doctorId: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },

termsAndConditions: {
    type: String,
    required: true    
},
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING','ACCEPTED','REJECTED']
    },
    markup: {
        type: Number,
        required: true
    },
});

const EmploymentContract = mongoose.model('EmploymentContract', employmentContractSchema);

module.exports = EmploymentContract;