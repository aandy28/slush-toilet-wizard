import initialState from "./initialState";
import { FETCH_TOILETS, RECEIVE_TOILETS } from "../actions/allActions";

export default function stuff(state = initialState.toilets, action) {
  let newState;
  switch (action.type) {
    case FETCH_TOILETS:
      console.log("FETCH_TOILETS Action");
      return action;
    case RECEIVE_TOILETS:
      newState = action.toilets;
      console.log("RECEIVE_TOILETS Action");
      return newState;
    default:
      return state;
  }
}
