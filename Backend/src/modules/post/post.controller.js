const express = require('express');
const router = express.Router();
const {createPost,deletePost, updatePost, findingPost} = require('./post.service')

// Route to create a new post
router.post('/create', createPost);
// Route to delete a post by ID
router.post('/delete/:id', deletePost);
// Route to update a post by ID
router.post('/update/:id', updatePost);
// Route to find a post by ID
router.get('/:id', findingPost);



module.exports = router