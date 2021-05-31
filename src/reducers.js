import { LOGIN } from "./actions";
import { LOGOUT } from "./actions";

const initialState = {
  text: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        text: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        text: action.payload
      };
    default:
      return state;
  }
};

export default reducer;