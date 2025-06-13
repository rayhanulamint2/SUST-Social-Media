const express = require('express');
const router = express.Router();
const {signup,login, updateUser, findUserDetails, addAchievement, addResearch, addWorkplace, addSociallink, editUser, findAllUser} = require('./user.service')

router.post('/signup', signup);

router.post('/login', login);

router.put('/update/:id', updateUser);

router.put('/edit', editUser);

router.get('/:id', findUserDetails);

router.post('/addAchievement', addAchievement);

router.post('/addResearch', addResearch);

router.post('/addWorkplace', addWorkplace);

router.post('/addSociallink', addSociallink);

router.get('/', findAllUser);


module.exports = router