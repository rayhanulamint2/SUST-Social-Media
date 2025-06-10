const mongoose = require('mongoose')
const postSchema = require('./post.model')
const Post = new mongoose.model('Post',postSchema);

const newPostCreation = async(postData) => {
    const newPost = new Post(postData);
    try{
        await newPost.save();
        console.log('post created successfully')
        return newPost;
    } catch(error){
        console.log('there are an error in server end')
    }
}
const findPost = async(id)=>{
    try{
        const post = await Post.findById(id)
        return post
    }
    catch(error){
        console.log('there are an error in server end')
    }
}

const deleteByID = async(id) => {
    try {
        await Post.findByIdAndDelete(id);
        console.log('Post deleted successfully');
    } catch (error) {
        console.log('there are an error in server end');
    }
}

const postUpdate = async(id, updateData) => {
    try {
        console.log('Updating post with ID:', id);
        console.log('Update data:', updateData);
        const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedPost) {
            throw new Error('Post not found');
        }
        console.log('Post updated successfully');
        console.log(updatedPost);
        return updatedPost;
    } catch (error) {
        console.log('there are an error in server end');
        console.error(error);
    }
}

const findAllPosts = async () => {
  try {
    const posts = await Post.find()
      .populate({ path: 'creator', select: 'name avatar' })
      .populate({ path: 'comment.userId', select: 'name avatar' })
      .sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.error('Server error:', error);
    return [];
  }
};



module.exports = {newPostCreation, findPost, deleteByID, postUpdate, findAllPosts}