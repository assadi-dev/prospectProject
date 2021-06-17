import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { api, host } from "../Api/Api";

const StorageKey = "@MyAppOAuthKey";

export async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

function checkIfTokenExpired({ token }) {
  let decodeToken = jwtDecode(token);
  let accessTokenExpirationDate = decodeToken.exp;

  return new Date(accessTokenExpirationDate * 1000) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  /*api.post("token/refresh", {
    data: { refresh_token: refreshToken },*/
  console.log("refresh");
}

//fonction qui permet de verifier la presence du token stocke dans la memoir local si il est present il recuperere la date d'expiration et rafraichir si c'est le cas
//Sinon retourn sa valeur

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  //console.log("getCachedAuthAsync", authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }

  return null;
}

// authentification services
export async function signInAsync(username, password) {
  await api
    .post("/login", { username, password })
    .then((res) => {
      let authState = res.data;
      cacheAuthAsync(authState);
    })
    .catch((e) => alert("Mot de passe Incorrect"));
}

export async function signOutAsync() {
  try {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);

    //console.log(authState);
    /* await AppAuth.revokeAsync(config, {
        token: authState.accessToken,
        isClientIdProvided: true,
      });*/
    await AsyncStorage.removeItem(StorageKey);
    return authState;
  } catch (e) {
    alert(`Failed to revoke token: ${e}`);
  }
}
