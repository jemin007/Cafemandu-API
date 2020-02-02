
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
  
  
    description: {
        type: String
    },
});

module.exports = mongoose.model('contact', contactSchema);