// Here we handle all the logic in routes/posts,js
// Make everything clear

import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        // try to retrieve all the posts we currently have in our database
        const postMessages = await PostMessage.find();
        // an array of all messages we have (will see json format when go to 5000/posts)
        // if dont' add postMessages below, you won't get array of objects in view console.
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// implement the logic for adding different posts
// for post, you can access req.body
export const createPost = async (req, res) => {
    //req.body can access data in json format, receive data through POST and PUT
    const post = req.body;
    
    //update, insert
    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    // exact the id from req.params
    // Eg. Once we make a request, request will be made to /posts/123, 123 will fill id
    const { id: _id } = req.params;

    // receive update from req.body
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    // if valid, update post
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    // logic to delete
    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}