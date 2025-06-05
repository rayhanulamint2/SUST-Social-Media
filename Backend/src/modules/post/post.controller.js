const express = require('express');
const router = express.Router();
const {createPost,deletePost} = require('./post.service')

router.post('/create', signup);

router.post('/delete', login)


module.exports = router