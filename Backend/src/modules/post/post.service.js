const {newPostCreation, findPost, deleteByID} = require('./post.repository')    

const createPost = async(req, res) => {
    try{
        const postData = {
            creator: req.body.creator,
            content: Array.isArray(req.body.content)
                ? req.body.content.join('\n')
                : req.body.content,
            image: req.body.image || '',
            tags: Array.isArray(req.body.tags)
                ? req.body.tags
                : [req.body.tags].filter(Boolean),
            isDepartmentPost: req.body.isDepartmentPost,
            upVotes: 0,
            downVotes: 0,
            comment: [],
            createdAt: new Date()
        };


        const newPost = await newPostCreation(postData);
        res.status(201).json({
            message: 'Post created successfully',
            post: {
                _id: newPost._id,
                creator: newPost.creator,
                content: newPost.content,
                image: newPost.image,
                tags: newPost.tags,
                isDepartmentPost: newPost.isDepartmentPost,
                upVotes: newPost.upVotes,
                downVotes: newPost.downVotes,
                comment: newPost.comment,
                createdAt: newPost.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to create post'
        });
    }
};

const deletePost = async(req, res) => {
    try {
        const post = await findPost(req.params.id);
        console.log(post)
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        deleteById = await deleteByID(req.params.id);
        res.status(200).json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to delete post'
        });
    }
};

module.exports = {createPost, deletePost}