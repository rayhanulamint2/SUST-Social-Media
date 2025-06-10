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
    comment: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            commentText: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
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
    feedType: {
        type: String,
        enum: ['university', 'department'],
        default: 'university'
    },
    department: {
        type: String
    },
    participationLink: {
        type: String,
        default: ''
    },
    place: {
        type: String,
        default: ''
    },
    interested: {
        type: Number,
        default: 0
    }
})
module.exports = eventSchema