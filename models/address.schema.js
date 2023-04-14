const mongoose = require("mongoose");

const addSchema = new mongoose.Schema({

    city: {
        type: String,
        require: true,
        lowercase: true
    },
    landmark: {
        type: String,
        lowercase: true
    },
    name: {
        type: String,
        require: true,
        lowercase: true
    },
    state: {
        type: String,
        require: true,
        lowercase: true
    },
    contactNumber: {
        type: String,
        require: true
    },
    street: {
        type: String,
        require: true
    },
    zipCode: {
        type: Number,
        require: true
    },
    userId: {
        type: String
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model('address', addSchema);