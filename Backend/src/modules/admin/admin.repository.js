// database query
const mongoose = require('mongoose')
const adminSchema = require('./admin.model')
const Admin = new mongoose.model('Admin',adminSchema);

const newAdminCreation = async(adminData) => {
    const newAdmin = new Admin(adminData);
    try{
        await newAdmin.save();
        console.log('admin created successfully')
    } catch(error){
        console.log('there are an error in server end')
    }
}
const findAdmin = async(email)=>{
    try{
        const admin = await Admin.find({email: email})
        return admin
    }
    catch(error){
        console.log('there are an error in server end')
    }
}

module.exports = {newAdminCreation, findAdmin}