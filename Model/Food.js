const mongoose = require('mongoose');

const foodSchema = {
    name: String,
    price: Number,
    image: String
};

module.exports = mongoose.model("Food", foodSchema);