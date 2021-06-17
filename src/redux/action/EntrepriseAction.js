import { useNavigation } from "@react-navigation/native";
import { api } from "../../Api/Api";

export const GET_ENTREPRISE_USER = "GET_ENTREPRISE_USER";
export const EDIT_ENTREPRISE = "EDIT_ENTREPRISE";
export const ADD_ENTREPRISE = "ADD_ENTREPRISE";
export const DELETE_ENTREPRISE = "DELETE_ENTREPRISE";

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

export function add_entreprise(token, data) {
  return (dispatch) => {
    return api({
      method: "POST",
      url: "/entreprises",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify(data),
    })
      .then((res) => {
        dispatch({ type: ADD_ENTREPRISE, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
      });
  };
}
