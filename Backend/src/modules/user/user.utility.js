
const mongoose = require('mongoose')
const userSchema = require('./user.model')
const User = new mongoose.model('User',userSchema);
const findUserByMail = async (email) => {
    const user = await User.find({ email: email });
    return user
};
module.exports = {findUserByMail};