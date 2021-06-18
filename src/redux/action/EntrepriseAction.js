import { useNavigation } from "@react-navigation/native";
import { api } from "../../Api/Api";

export const GET_ENTREPRISE_USER = "GET_ENTREPRISE_USER";
export const EDIT_ENTREPRISE = "EDIT_ENTREPRISE";
export const ADD_ENTREPRISE = "ADD_ENTREPRISE";
export const DELETE_ENTREPRISE = "DELETE_ENTREPRISE";
export const GET_ENTREPRISE_CHECKED = "GET_ENTREPRISE_CHECKED";
export const GET_ENTREPRISE_UNCHECKED = "GET_ENTREPRISE_UNCHECKED";
export const CHECK_ENTREPRISE = "CHECK_ENTREPRISE";
export const UNCHECK_ENTREPRISE = "CHECK_ENTREPRISE";
export const UPDATE_CHECK = "UPDATE_CHECK";
export const UPDATE_UNCHECK = "UPDATE_UNCHECK";

export const get_entreprise = (token) => {
  return (dispatch) => {
    try {
      api({
        url: "/entreprises/?order[updateAt]=desc",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) =>
          dispatch({ type: GET_ENTREPRISE_USER, payload: res.data })
        )
        .catch((error) => console.log(error.response.data));
    } catch (e) {}
  };
};

export const get_entreprise_unCheck = (token) => {
  return async (dispatch) => {
    try {
      await api
        .get("/entreprises?checked=false&order[updateAt]=desc", {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) =>
          dispatch({ type: GET_ENTREPRISE_UNCHECKED, payload: res.data })
        )
        .catch((error) => console.log(error));
    } catch (e) {}
  };
};

export const get_entreprise_check = (token) => {
  return async (dispatch) => {
    try {
      await api
        .get("/entreprises?checked=true&order[updateAt]=desc", {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) =>
          dispatch({ type: GET_ENTREPRISE_CHECKED, payload: res.data })
        )
        .catch((error) => console.log(error));
    } catch (e) {}
  };
};

//Fonction Ajout d'entreprise
export const add_entreprise = (token, data) => {
  return async (dispatch) => {
    try {
      await api
        .post("/entreprises", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          dispatch({ type: GET_ENTREPRISE_USER, payload: token });
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
        });
    } catch (error) {}
  };
};

//Fonction suppression d'entreprise
export const delete_entreprise = (token, id) => {
  return async (dispatch) => {
    try {
      await api
        .delete(`/entreprises/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          dispatch({ type: DELETE_ENTREPRISE, payload: id });
        })
        .catch((error) => console.log(error.response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//Fonction cocher

export const checkUpdate = (token, id, data) => {
  return async (dispatch) => {
    try {
      await api
        .put(`/entreprises/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          dispatch({ type: UPDATE_CHECK, payload: res.data });
        })
        .catch((error) => console.log(error.response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const unCheckUpdate = (token, id, data) => {
  return async (dispatch) => {
    try {
      await api
        .put(`/entreprises/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          dispatch({ type: UPDATE_UNCHECK, payload: res.data });
        })
        .catch((error) => console.log(error.response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
