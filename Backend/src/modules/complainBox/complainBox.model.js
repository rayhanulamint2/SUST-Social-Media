const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    department: {
        type: String
    },
    solved: {
        type: Boolean,
        default: false
    },
})
module.exports = complainSchema