import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import alert from "./alert";
import profile from "./profile";
import vape from "./vape";
import filter from "./filter";
import cartReducer from "./cart";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const rootReduser = combineReducers({
  auth: authReducer,
  alert,
  profile,
  vape,
  filter,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReduser);
