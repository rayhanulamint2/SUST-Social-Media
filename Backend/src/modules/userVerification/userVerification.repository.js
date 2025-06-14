// database query
const mongoose = require('mongoose')
const userVerificationSchema = require('./userVerification.model');
const { updateUser } = require('../user/user.service');
const UserVerification = new mongoose.model('UserVerification', userVerificationSchema);
const {signup} = require('../user/user.service')

const newUserCreation = async (userData) => {
    const newUser = new UserVerification(userData);
    try {
        const newUser2 = await newUser.save();

        console.log('user created successfully', newUser2)
        return newUser2;
    } catch (error) {
        console.log(error);
        console.log('there are an error in server end')
    }
}

const findUsersVerification = async () => {
    try {
        const allUsers = await UserVerification.find({
            verified: { $in: [null, undefined] }
        });
        console.log("allusers = ", allUsers);

        return allUsers;
    }
    catch {
        console.log("there is an errordfa");
    }
}


const userUpdate = async (payload) => {
    try {
        const updatedUser = await UserVerification.findById(payload.id);
        if (payload.verified) {
            updatedUser.verified = true;
            await updatedUser.save();
            const newUser = await signup(updatedUser);
            // return newUser;
        }
        else {
            updateUser.verified = false;
            const user = await UserVerification.findByIdAndDelete(payload.id);
            return user;
        }

    } catch (error) {
        console.log('there are an error in server end', error);
    }
}


module.exports = { newUserCreation, findUsersVerification, userUpdate }