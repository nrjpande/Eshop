const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderAmount: {
        type: Number
    },
    addressId: {
        type: String,
        require: true
    },
    userId: {
        type: String
    },

    orderDate: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model('order', orderSchema);