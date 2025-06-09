// core business logic define
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {newAdminCreation, findAdmin} = require('./admin.repository')

const signup = async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const adminData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };
        console.log(adminData)
        // repository 
        newAdminCreation(adminData)
        // const newUser = new User(userData);
        // await newUser.save();
        res.status(200).json({
            message: 'successfull'
        })
    } catch{
        res.status(500).json({
            error: 'serverside error'
        })
    }
}
const login = async(req,res) => {
    try{
        const admin = await findAdmin(req.body.email);
        console.log(" = ", admin)
        if(admin && admin.length>0){
            const isValidePassword = await bcrypt.compare(req.body.password,admin[0].password)

            if(isValidePassword){
                // console.log(process.env.JWT_SECRET)
                // generate token
                const token = jwt.sign({
                    fullname: admin[0].fullname,
                    id: admin[0]._id
                }, "sfdjlajdlkfasjdfskljfjksjdfljskdf", // process.env.JWT_SECRET is not working
                {
                    expiresIn: '1h'
                });
                console.log(token)
                res.status(200).json({
                    "access_token": token,
                    "message": 'login successful',
                    "admin": admin
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
    } catch(err){
        console.log(err);
        res.status(500).json({
            "error": 'Authentication failed'
        })
    }
}
module.exports = {signup,login}


