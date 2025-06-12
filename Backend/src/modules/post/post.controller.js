const express = require('express');
const router = express.Router();
const {createPost,deletePost, updatePost, findingPost, findingAllPosts, editPost} = require('./post.service')

// Route to create a new post
router.post('/create', createPost);
// Route to delete a post by ID
router.delete('/delete/:id', deletePost);
// Route to update a post by ID
router.post('/update/:id', updatePost);
// Route to find a post by ID
router.get('/:id', findingPost);
// Route to find all posts
router.get('/', findingAllPosts);

router.put('/edit', editPost);


module.exports = router