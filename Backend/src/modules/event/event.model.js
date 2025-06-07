const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
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
    tags: {
        type: [String],
        default: []
    },
    isDepartmentPost: {
        type: Boolean,
        required: true
    },
    department: {
        type: String
    }
})
module.exports = eventSchema