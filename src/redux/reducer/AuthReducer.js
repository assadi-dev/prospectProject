import jwtDecode from "jwt-decode";
import { LOGIN, LOGOUT } from "../action/AuthAction";

const initialState = {
  isLoading: true,
  accessToken: null,
  refresh_token: null,
  userId: null,
};

export default authenticateReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: false,
        accessToken: action.payload.token,
        refresh_token: action.payload.refresh_token,
        userId: jwtDecode(action.payload.token).id,
      };
      break;

    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        accessToken: null,
        refresh_token: null,
        userId: null,
      };

      break;

    default:
      return state;
      break;
  }
};
