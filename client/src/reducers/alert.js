import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  //destructuring so you don't have to use action.type and action.payload everytime
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    //sets a new alert to the array
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
