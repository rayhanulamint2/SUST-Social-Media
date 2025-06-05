const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     fullname: {
//         type: String, 
//         require: true    
//     },
//     email: {
//         type: String,
//         require: true
//     },
//     workspacename: {
//         type: String,
//         require: true
//     },
//     password: {
//         type: String,
//         require: true
//     }
// })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regNo: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        default: ''
    },
    roles: {
        type: [String],
        enum: ['student', 'teacher', 'employee'],
        default: []
    }
})
module.exports = userSchema