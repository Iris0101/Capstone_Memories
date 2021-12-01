// axios is used to make api calls
import axios from 'axios';

// This is the url pointing to our backend route
const url = 'http://localhost:5000/posts';

// fetch from url
export const fetchPosts = () => axios.get(url);

// specify the url and the data we are sending
export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);