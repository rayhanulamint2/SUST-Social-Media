const express = require('express');
const router = express.Router();
const {signup,login, updateUser, findUserDetails} = require('./user.service')

router.post('/signup', signup);

router.post('/login', login);

router.post('/update/:id', updateUser);

router.get('/:id', findUserDetails);


module.exports = router