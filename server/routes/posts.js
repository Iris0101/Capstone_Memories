// add all routes that have to do sth with posts
import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

// when somebody visit this route
// Here you will get "THIS WORKS!" by going to localhost:5000/posts
router.get('/', getPosts);
router.post('/', createPost);
// patch is for updating existing documents, we need to know id of the existing post
router.patch('/:id', updatePost);
// delete a post
router.delete('/:id', deletePost);
// like
router.patch('/:id/likePost', likePost);


export default router;