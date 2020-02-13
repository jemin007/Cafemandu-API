const mongoose = require('mongoose');
const orderschema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    foods: [{
        foodName: String,
        quantity: {
            type: Number,
            default: 1
        },
        price: Number
    }],
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Order", orderschema);