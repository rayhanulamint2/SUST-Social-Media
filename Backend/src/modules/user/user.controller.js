const express = require('express');
const router = express.Router();
const {signup,login, updateUser} = require('./user.service')

router.post('/signup', signup);

router.post('/login', login);

router.post('/update/:id', updateUser);


module.exports = router