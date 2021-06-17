import axios from "axios";

const prod = "https://memo-prospection-api.herokuapp.com/api/";
const dev = "https://192.168.1.49:8000/api/";

export const host = prod;

export const api = axios.create({
  baseURL: host,
});
