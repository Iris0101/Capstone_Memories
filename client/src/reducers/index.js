import { combineReducers } from 'redux';
import posts from './posts';

// we can use each individual reducers we have
export const reducers = combineReducers({ posts });