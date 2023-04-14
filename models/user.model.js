const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String,
        require: true,
        lowercase: true
    },
    lastName: {
        type: String,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    contactNumber: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "USER"
    },
    userName: {
        type: String,
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

module.exports = mongoose.model('user', userSchema);