import { useNavigation } from "@react-navigation/native";
import { api } from "../../Api/Api";

export const GET_ENTREPRISE_USER = "GET_ENTREPRISE_USER";
export const EDIT_ENTREPRISE = "EDIT_ENTREPRISE";
export const ADD_ENTREPRISE = "ADD_ENTREPRISE";
export const DELETE_ENTREPRISE = "DELETE_ENTREPRISE";
export const GET_ENTREPRISE_CHECKED = "GET_ENTREPRISE_CHECKED";
export const GET_ENTREPRISE_UNCHECKED = "GET_ENTREPRISE_UNCHECKED";

export const get_entreprise = (token) => {
  return (dispatch) => {
    return api({
      url: "/entreprises/?order[createAt]=desc",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => dispatch({ type: GET_ENTREPRISE_USER, payload: res.data }))
      .catch((error) => console.log(error.response.data));
  };
};

export const get_entreprise_unCheck = (token) => {
  return (dispatch) => {
    return api
      .get("/entreprises?checked=false&order[createAt]=desc", {
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
  };
};

export function add_entreprise(token, data) {
  return (dispatch) => {
    return api({
      method: "POST",
      url: "/entreprises",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify(data),
    })
      .then((res) => {
        dispatch({ type: GET_ENTREPRISE_USER, payload: token });
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
      });
  };
}
