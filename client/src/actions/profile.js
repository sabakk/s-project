import { setAlert } from './alert';
import {ApiService} from '../services/api'
import {
  LOADING_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await ApiService.getCurrentProfile();

    dispatch({
      type: GET_PROFILE,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await ApiService.getProfiles();

    dispatch({
      type: GET_PROFILES,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await ApiService.getProfileById(userId);

    dispatch({
      type: GET_PROFILE,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await ApiService.getGithubRepos(username);

    dispatch({
      type: GET_REPOS,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
    dispatch({
      type: LOADING_PROFILE
    });
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };

    const res = await ApiService.createProfile(formData);

    dispatch({
      type: GET_PROFILE,
      payload: res
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };

    const res = await ApiService.addExperience(formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };

    const res = await ApiService.addEducation(formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await ApiService.deleteExperience(id);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await ApiService.deleteEducation(id);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await ApiService.deleteAccount();

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.statusText, status: err.status }
      });
    }
  }
};