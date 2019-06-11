import {
    AUTH_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
  } from '../actions/types';

const initialState = {
    // isAuthenticated: localStorage.getItem('token') ? true : false,
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    loading: false,
    user: null
}

export default function authStoreState (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true,
                }
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
                     localStorage.setItem('token', payload.token);
            return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false
                }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
                 localStorage.removeItem('token');
            return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false
                    }
     
        default:
            return state
    }
}