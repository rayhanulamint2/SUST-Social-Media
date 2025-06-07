const mongoose = require('mongoose')
const adminSchema = require('./admin.model')
const Admin = new mongoose.model('Admin',adminSchema);
const findAdminByMail = async (email) => {
    const admin = await Admin.find({ email: email });
    return admin
};
module.exports = {findAdminByMail};