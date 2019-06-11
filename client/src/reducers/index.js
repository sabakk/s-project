import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alert from './alert'
import profile from './profile'
import vape from './vape'


export default combineReducers({
  auth: authReducer,
  alert,
  profile,
  vape
});
