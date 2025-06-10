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
    avatar: {
        type: String,
        default: ''
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
    },
    about: {
        type: String,
        default: ''
    },
    workplaces: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                designation: {
                    type: String,
                    required: true
                },
                start: {
                    type: String
                },
                end: {
                    type: String
                }
            }
        ],
        default: []
    },
    researchWorks: {
        type: [
            {
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                link: {
                    type: String,
                    required: true
                },
                date: {
                    type: String,
                }
            }
        ],
        default: []
    },
    achievements: {
        type: [
            {
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                link: {
                    type: String,
                },
                image: {
                    type: String,
                }
            }
        ],
        default: []
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        default: []
    }
})
module.exports = userSchema