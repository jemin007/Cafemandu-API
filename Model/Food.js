const mongoose = require('mongoose');

const foodSchema = {
    name:{
        type: String,
        required:true
    },
    price: Number,
    image: String
};

module.exports = mongoose.model("Food", foodSchema);