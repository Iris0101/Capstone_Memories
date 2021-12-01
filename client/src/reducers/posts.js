import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

// Reducers: a function that accept the state and the action
// Then, based on the action type, then we want to do some logic(return either action or state change by the action)

// as soon as we get the action dispatched in App.js, we immediately goes to reducer to get the payload dispatched by getPosts()

export default (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            // return all posts but filter out the one we deleted
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            // spread all posts and add a new post, new post stored in action.payload
            return [...posts, action.payload];
        default:
            return posts;
    }
};