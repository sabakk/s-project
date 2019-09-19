import { SET_TEXT_FILTER, SET_SORT_VAPES } from "./types";

export const setTextFilter = text => ({
  type: SET_TEXT_FILTER,
  payload: text
});
export const setSortVapes = select => ({
  type: SET_SORT_VAPES,
  payload: select
});
