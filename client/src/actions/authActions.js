import {
  AUTH_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  REMOVE_CART
} from "./types";
import { ApiService, setAuthToken } from "../services/api";
import { setAlert } from "./alert";

export const auth = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await ApiService.auth();

    dispatch({
      type: AUTH_SUCCESS,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = values => async dispatch => {
  try {
    const res = await ApiService.signup(values);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res
    });
    dispatch(setAlert("Registration success", "success"));
    dispatch(auth());
  } catch (err) {
    const errors = err.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = values => async dispatch => {
  dispatch({
    type: AUTH_LOADING
  });
  try {
    const res = await ApiService.login(values);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res
    });

    dispatch(auth());
  } catch (err) {
    const errors = err.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  dispatch({ type: REMOVE_CART });
};
