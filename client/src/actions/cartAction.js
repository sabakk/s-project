import { TOGGLE_CART, ADD_CART, DELETE_CART, CLEAR_CART } from "./types";

export const toggleCartHidden = () => ({
  type: TOGGLE_CART
});

export const addItem = item => ({
  type: ADD_CART,
  payload: item
});

export const deleteItem = item => ({
  type: DELETE_CART,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CLEAR_CART,
  payload: item
});
