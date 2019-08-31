import { TOGGLE_CART, ADD_CART, REMOVE_CART, CLEAR_CART } from "./types";

export const toggleCartHidden = () => ({
  type: TOGGLE_CART
});

export const addItem = item => ({
  type: ADD_CART,
  payload: item
});

export const removeItem = item => ({
  type: REMOVE_CART,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CLEAR_CART,
  payload: item
});
