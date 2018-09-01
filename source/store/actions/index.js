import { FETCH_POSTS, CREATE_POST, DELETE_POST, LIKE_POST } from './types';

// Action creator => return action FSA
export const fetchPosts = (posts) => ({
    type: FETCH_POSTS,
    payload: posts
});

export const createPost = (post) => ({
    type: CREATE_POST,
    payload: post
});

export const deletePost = (id) => ({
    type: DELETE_POST,
    payload: id
});

export const likePost = (post) => ({
    type: LIKE_POST,
    payload: post
});
