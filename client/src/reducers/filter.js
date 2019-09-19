import { SET_TEXT_FILTER, SET_SORT_VAPES } from "../actions/types";

const initialState = {
  text: "",
  sortBy: "price"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.payload
      };
    case SET_SORT_VAPES:
      return {
        ...state,
        sortBy: action.payload
      };
    default:
      return state;
  }
}
