import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';
import { ApiService } from '../services/api';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await ApiService.getPosts();

    dispatch({
      type: GET_POSTS,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await ApiService.addLike(id);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await ApiService.removeLike(id);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await ApiService.deletePost(id);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // };

  try {
    const res = await ApiService.addPost(formData);

    dispatch({
      type: ADD_POST,
      payload: res
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await ApiService.getPost(id);

    dispatch({
      type: GET_POST,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

  try {
    const res = await ApiService.addComment(postId, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await ApiService.deleteComment(postId, commentId);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};