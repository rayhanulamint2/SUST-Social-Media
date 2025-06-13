// core business logic define
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { newUserCreation, findUser, userUpdate, findUserById, achievementAdd, sociallinkAdd, researchAdd, workplaceAdd, userEdit} = require('./user.repository')

const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userData = {
            name: req.body.name,
            avatar: req.body.avatar || '',
            regNo: req.body.regNo,
            email: req.body.email,
            password: hashedPassword,
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
        newUserCreation(userData)
        // const newUser = new User(userData);
        // await newUser.save();
        res.status(200).json({
            message: 'successfull'
        })
    } catch {
        res.status(500).json({
            error: 'serverside error'
        })
    }
}
const login = async (req, res) => {
    try {
        const user = await findUser(req.body.email);
        console.log(" = ", user)
        if (user && user.length > 0) {
            const isValidePassword = await bcrypt.compare(req.body.password, user[0].password)

            if (isValidePassword) {
                // console.log(process.env.JWT_SECRET)
                // generate token
                const token = jwt.sign({
                    fullname: user[0].fullname,
                    id: user[0]._id
                }, "sfdjlajdlkfasjdfskljfjksjdfljskdf", // process.env.JWT_SECRET is not working 
                    {
                        expiresIn: '1h'
                    });
                console.log(token)
                res.status(200).json({
                    "access_token": token,
                    "message": 'login successful',
                    "user": user
                })
            } else {
                res.status(401).json({
                    "error": 'Authentication failed'
                })
            }
        } else {
            res.status(401).json({
                "error": 'Authentication failed'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "error": 'Authentication failed'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await findUser(req.params.id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        const updatedUser = await userUpdate(req.params.id, req.body);
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
};

const findUserDetails = async (req, res) => {
    try {
        const user = await findUserById(req.params.id)
        res.status(200).json({
            "user": user
        })
        return user
    }
    catch (error) {
        console.log('there are an error in server end')
    }
}

const addAchievement = async(req,res) =>  {
    try {
        const user = await achievementAdd(req.body)
        res.status(200).json({
            "user": user
        })
        return user
    }
    catch (error){
        console.log("there are an serverside error")
    }
}

const addResearch= async(req,res) =>  {
    try {
        const user = await researchAdd(req.body)
        res.status(200).json({
            "user": user
        })
        return user
    }
    catch (error){
        console.log("there are an serverside error")
    }
}

const addWorkplace = async(req,res) =>  {
    try {
        const user = await workplaceAdd(req.body)
        res.status(200).json({
            "user": user
        })
        return user
    }
    catch (error){
        console.log("there are an serverside error")
    }
}

const addSociallink = async(req,res) =>  {
    try {
        const user = await sociallinkAdd(req.body)
        res.status(200).json({
            "user": user
        })
        return user
    }
    catch (error){
        console.log("there are an serverside error")
    }
}

const editUser = async(req,res) => {
    try {
        const user = await userEdit(req.body)
        console.log("user", user);
        res.status(200).json({
            "user":user
        })
    }
    catch (error){
        console.log("there is an error in serverside")
    }
}

module.exports = { signup, login, updateUser, findUserDetails, addAchievement, addResearch, addSociallink, addWorkplace, editUser}