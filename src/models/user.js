const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    birthDate: {
        type: Date, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true
    },
    tel: {
        type: String, 
        required: true
    },
    gender: {
        type: String
    },
    profi: {
        type: String, 
        required: true
    },
    registerNumber: {
        type: String
    },
    specialty: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    maxDistance: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', Schema);