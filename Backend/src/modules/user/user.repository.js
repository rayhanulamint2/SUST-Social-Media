// database query
const mongoose = require('mongoose')
const userSchema = require('./user.model')
const User = new mongoose.model('User', userSchema);

const newUserCreation = async (userData) => {
    const newUser = new User(userData);
    try {
        await newUser.save();
        console.log('user created successfully')
    } catch (error) {
        console.log('there are an error in server end')
    }
}
const findUser = async (email) => {
    try {
        const user = await User.find({ email: email })
        return user
    }
    catch (error) {
        console.log('there are an error in server end')
    }
}

const userUpdate = async (id, updateData) => {
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

const findUserById = async (id) => {
    try {
        const user = await User.findById(id).populate({
            path: 'posts',
            populate: ({
                path: 'creator', select: 'name avatar'

            }),
            // populate:[({
            //     path: 'comment.userId', select: 'name avater'
            // })]
        }).populate({
            path: 'posts',
            populate: ({
                path: 'comment.userId', select: 'name avater'
            })
        }).populate({
            path: 'saved',
            populate: ({
                path: 'creator', select: 'name avatar'

            }),
            // populate:[({
            //     path: 'comment.userId', select: 'name avater'
            // })]
        }).populate({
            path: 'saved',
            populate: ({
                path: 'comment.userId', select: 'name avater'
            })
        });
        return user;
    } catch (error) {
        console.log('there are an error in server end');
    }
};

const achievementAdd = async (payload) => {
    try {
        const user = await User.findById(payload.userId);
        if (!user) {
            console.log('Creator not found');
            return null;
        }
        console.log("user = ", user);
        console.log("payload = ", payload);
        // Step 3: Add the post ID to user's posts array
        user.achievements.push(payload.achievement);

        // Step 4: Save the updated user
        await user.save();
    }
    catch (error) {
        console.log('there are an error in server end123');
    }
}

const workplaceAdd = async (payload) => {
    try {
        const user = await User.findById(payload.userId);
        if (!user) {
            console.log('Creator not found');
            return null;
        }
        console.log("user = ", user);
        console.log("payload = ", payload);
        // Step 3: Add the post ID to user's posts array
        user.workplaces.push(payload.workplace);

        // Step 4: Save the updated user
        await user.save();
    }
    catch (error) {
        console.log('there are an error in server end123');
    }
}

const researchAdd = async (payload) => {
    try {
        const user = await User.findById(payload.userId);
        if (!user) {
            console.log('Creator not found');
            return null;
        }
        console.log("user = ", user);
        console.log("payload = ", payload);
        // Step 3: Add the post ID to user's posts array
        user.researchWorks.push(payload.researchWork);

        // Step 4: Save the updated user
        await user.save();
    }
    catch (error) {
        console.log('there are an error in server end123');
    }
}

const sociallinkAdd = async (payload) => {
    try {
        const user = await User.findById(payload.userId);
        if (!user) {
            console.log('Creator not found');
            return null;
        }
        console.log("user = ", user);
        console.log("payload = ", payload);
        // Step 3: Add the post ID to user's posts array
        user.socialLinks.push(payload.socialLink);

        // Step 4: Save the updated user
        await user.save();
    }
    catch (error) {
        console.log('there are an error in server end123');
    }
}

const userEdit = async (payload) => {
    try {
        const user = await User.findById(payload.userId);
        if (!user) {
            console.log('Creator not found');
            return null;
        }
        console.log("user = ", user);
        console.log("payload = ", payload);
        if (payload.about !== undefined) user.about = payload.about;
        if (payload.department !== undefined) user.department = payload.department;
        if (payload.name !== undefined) user.name = payload.name;
        if (payload.avatar !== undefined) user.avatar = payload.avatar;

        // Step 4: Save the updated user
        const newUser = await user.save();
        console.log("newUser = ", newUser);
        return newUser;
    }
    catch (error) {
        console.log('there is an error')
    }
}

const findUsers = async () => {
    try {
        const allUsers = await User.find({
            session: { $lt: "2020-21" },
        });
        console.log("allusers = ", allUsers);

        return allUsers;
    }
    catch {
        console.log("there is an errordfa");
    }

}
module.exports = { newUserCreation, findUser, userUpdate, findUserById, achievementAdd, sociallinkAdd, researchAdd, workplaceAdd, userEdit, findUsers }