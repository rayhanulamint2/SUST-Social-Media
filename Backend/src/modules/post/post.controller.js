const express = require('express');
const router = express.Router();
const {createPost,deletePost} = require('./post.service')

router.post('/create', createPost);

router.post('/delete/:id', deletePost)


module.exports = router