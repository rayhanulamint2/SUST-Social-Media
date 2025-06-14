const {newPostCreation, findPost, deleteByID, postUpdate, findAllPosts, postEdit, addComment, addUpDownVote} = require('./post.repository')    

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
            feedType: req.body.feedType || 'university', // Default to 'university' if not provided
            department: req.body.department || '', // Ensure department is included
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
                createdAt: newPost.createdAt,
                department: newPost.department || '' // Ensure department is included
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

const updatePost = async(req, res) => {
    try {
        const post = await findPost(req.params.id);
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        // Update logic here
        // For example, updating content or tags
        const postData = {
            creator: req.body.creator,
            content: Array.isArray(req.body.content)
                ? req.body.content.join('\n')
                : req.body.content,
            image: req.body.image || '',
            tags: Array.isArray(req.body.tags)
                ? req.body.tags
                : [req.body.tags].filter(Boolean),
            feedType: req.body.feedType || post.feedType, // Use existing feedType if not provided
            upVotes: req.body.upVotes || 0,
            downVotes: req.body.downVotes || 0,
            comment: req.body.comment || [],
            // Ensure createdAt is not updated
            createdAt: post.createdAt,
            department: req.body.department || post.department // Ensure department is included
        };
        
        const updatedPost = await postUpdate(req.params.id, postData);
        // post updated
        res.status(200).json({
            message: 'Post updated successfully',
            post: updatedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to update post'
        });
    }
};

const findingPost = async(req, res) => {
    try {
        const post = await findPost(req.params.id);
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        res.status(200).json({
            post: post
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve post'
        });
    }
};

const findingAllPosts = async(req, res) => {
    try {
        const posts = await findAllPosts();
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                error: 'No posts found'
            });
        }
        res.status(200).json({
            posts: posts
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve posts'
        });
    }
};

const editPost = async(req,res) => {
    try{
        const post = await postEdit(req.body);
        if (!post) {
            return res.status(500).json({
                error: 'Post not found'
            });
        }
        res.status(200).json({
            post: post
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error: 'failed to retrieve posts'
        });
    }
}

const commentAdding = async(req,res) => {
    try {
        const post = await addComment(req.body);
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        res.status(200).json({
            post: post
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve post'
        });
    }

}

const changeVote = async(req, res) => {
    try{
        const post = await addUpDownVote(req.body);
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        res.status(200).json({
            post: post
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve post'
        });
    }

}

module.exports = {createPost, deletePost, updatePost, findingPost, findingAllPosts, editPost,commentAdding,changeVote};