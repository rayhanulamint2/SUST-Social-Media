// database query
const mongoose = require('mongoose')
const userSchema = require('./user.model')
const User = new mongoose.model('User',userSchema);

const newUserCreation = async(userData) => {
    const newUser = new User(userData);
    try{
        await newUser.save();
        console.log('user created successfully')
    } catch(error){
        console.log('there are an error in server end')
    }
}
const findUser = async(email)=>{
    try{
        const user = await User.find({email: email})
        return user
    }
    catch(error){
        console.log('there are an error in server end')
    }
}

const userUpdate = async(id, updateData) => {
    try {
        console.log('Updating user with ID:', id);
        console.log('Update data:', updateData);
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (error) {
        console.log('there are an error in server end');
    }
};

const findUserById = async(id) => {
    try {
        const user = await User.findById(id).populate({
            path: 'posts',
            populate:({
                path: 'creator', select: 'name avatar'

            }),
            // populate:[({
            //     path: 'comment.userId', select: 'name avater'
            // })]
        }).populate({
            path: 'posts',
            populate:({
                path: 'comment.userId',select: 'name avater'
            })
        }).populate({
            path: 'saved',
            populate:({
                path: 'creator', select: 'name avatar'

            }),
            // populate:[({
            //     path: 'comment.userId', select: 'name avater'
            // })]
        }).populate({
            path: 'saved',
            populate:({
                path: 'comment.userId',select: 'name avater'
            })
        });
        return user;
    } catch (error) {
        console.log('there are an error in server end');
    }
};

module.exports = {newUserCreation, findUser, userUpdate, findUserById}