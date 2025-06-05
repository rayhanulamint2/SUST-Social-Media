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
module.exports = {newPostCreation, findPost, deleteByID}