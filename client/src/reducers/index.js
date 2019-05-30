import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alert from './alert';

export default combineReducers({
  auth: authReducer,
  alert
});
