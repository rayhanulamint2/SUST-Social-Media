const express = require('express');
const router = express.Router();
const {createPost,deletePost, updatePost, findingPost} = require('./post.service')

router.post('/create', createPost);

router.post('/delete/:id', deletePost);

router.post('/update/:id', updatePost);

router.get('/:id', findingPost);



module.exports = router