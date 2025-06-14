const express = require('express');
const router = express.Router();

const {createVerification, findAllUserVerification, verifyUser} = require('./userVerification.service')

router.post('/createVerification', createVerification);

router.get('/',findAllUserVerification);

router.put('/verify', verifyUser);

module.exports = router;