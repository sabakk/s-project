import { TOGGLE_CART, ADD_CART, CLEAR_CART } from "../actions/types";
const initialState = {
  hidden: true,
  cartItems: []
};

const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem._id === cartItemToAdd._id
  );
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CART:
      return {
        ...state,
        hidden: !state.hidden
      };
    case ADD_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem._id !== action.payload._id
        )
      };
    default:
      return state;
  }
};

export default cartReducer;
