export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (authState) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: authState,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  };
};
