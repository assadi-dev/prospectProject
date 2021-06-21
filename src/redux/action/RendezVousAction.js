import { api } from "../../Api/Api";

export const GET_RENDEZ_VOUS_USER = "GET_RENDEZ_VOUS_USER";
export const EDIT_RENDEZ_VOUS = "EDIT_RENDEZ_VOUS";
export const ADD_RENDEZ_VOUS = "ADD_RENDEZ_VOUS";
export const DELETE_RENDEZ_VOUS = "DELETE_RENDEZ_VOUS";
export const GET_RENDEZ_VOUS_CHECKED = "GET_RENDEZ_VOUS_CHECKED";
export const GET_RENDEZ_VOUS_UNCHECKED = "GET_RENDEZ_VOUS_UNCHECKED";
export const CHECK_RENDEZ_VOUS = "CHECK_RENDEZ_VOUS";
export const UNCHECK_RENDEZ_VOUS = "CHECK_RENDEZ_VOUS";
export const UPDATE_CHECK_RDV = "UPDATE_CHECK_RDV";
export const UPDATE_UNCHECK_RDV = "UPDATE_UNCHECK_RDV";

export const get_rendez_vous = (token) => {
  let config = {
    headers: {
      Authorization: `Bearer${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return async (dispatch) => {
    try {
      await api
        .get("/rendez_vouses?order[updatedAt]=desc&order[date]=desc", config)
        .then((res) => {
          dispatch({ type: GET_RENDEZ_VOUS_USER, payload: res.data });
        })
        .catch((err) => console.log(err.response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const get_rendez_vous_uncheck = (token) => {
  let url =
    "/rendez_vouses?checked=false&order[updatedAt]=desc&order[date]=desc";
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return async (dispatch) => {
    try {
      await api
        .get(url, config)
        .then((res) => {
          dispatch({ type: GET_RENDEZ_VOUS_UNCHECKED, payload: res.data });
        })
        .catch((err) => console.log(err.response));
    } catch (error) {}
  };
};

export const get_rendez_vous_checked = (token) => {
  let url =
    "/rendez_vouses?checked=true&order[updatedAt]=desc&order[date]=desc";
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return async (dispatch) => {
    try {
      await api
        .get(url, config)
        .then((res) => {
          dispatch({ type: GET_RENDEZ_VOUS_CHECKED, payload: res.data });
        })
        .catch((err) => console.log(err.response));
    } catch (error) {}
  };
};

export const check_update_rendez_vous = (token, id, data) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return async (dispatch) => {
    try {
      await api
        .put(`/rendez_vouses/${id}`, data, config)
        .then((res) => {
          dispatch({ type: UPDATE_CHECK_RDV, payload: res.data });
        })
        .catch((err) => console.log(err.response.data));
    } catch (error) {}
  };
};

export const unCheck_update_rendez_vous = (token, id, data) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return async (dispatch) => {
    try {
      await api
        .put(`/rendez_vouses/${id}`, data, config)
        .then((res) => {
          dispatch({ type: UPDATE_UNCHECK_RDV, payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };
};

export const add_rendez_vous = (token, data) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return async (dispatch) => {
    try {
      await api
        .post("/rendez_vouses", data, config)
        .catch((error) => console.log(error.response.data));
    } catch (error) {}
  };
};

export const delete_rendez_vous = (token, id) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return async (dispatch) => {
    try {
      await api
        .delete(`/rendez_vouses/${id}`, config)
        .then((res) => dispatch({ type: DELETE_RENDEZ_VOUS, payload: id }))
        .catch((error) => console.log(err));
    } catch (error) {}
  };
};
