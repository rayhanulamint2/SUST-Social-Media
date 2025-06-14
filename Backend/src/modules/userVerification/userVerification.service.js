const {newUserCreation, findUsersVerification, userUpdate} = require("./userVerification.repository")

const createVerification = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            avatar: req.body.avatar || '',
            regNo: req.body.regNo,
            email: req.body.email,
            password: req.body.password,
            department: req.body.department,
            session: req.body.session,
            filePath: req.file ? req.file.path : '',
            roles: Array.isArray(req.body.roles) ? req.body.roles : [],
            about: req.body.about || '',
            workplaces: req.body.workplaces || [],
            researchWorks: req.body.researchWorks || [],
            achievements: req.body.achievements || [],
            socialLinks: req.body.socialLinks || [],
            posts: [],   // Initialize empty; likely managed later
            saved: []    // Initialize empty; likely managed later
        };

        console.log(userData)
        // repository 
        const newUser1 = newUserCreation(userData)
        console.log("newuser jsdfljas;j", newUser1)
        // const newUser = new User(userData);
        // await newUser.save();
        res.status(200).json({
            message: 'successfull',
            newUser: newUser1
        })
    } catch {
        res.status(500).json({
            error: 'serverside error'
        })
    }
}

const findAllUserVerification = async(req, res)=>{
    try{
        const allUser = await findUsersVerification();
        res.status(200).json({
            "users": allUser
        })
    }
    catch (error){
        console.log(error);
        console.log("there is an error in serverside")
    }
}

const verifyUser = async(req,res) => {
    try {
        const updatedUser = await userUpdate(req.body);
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to update user'
        });
    }
}

module.exports = { createVerification, findAllUserVerification, verifyUser }