import axios from "axios";
import createHeaders from "./token";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function postSignUp(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
  return promise;
}

function postLogin(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-in`, body);
  return promise;
}

function putLogout() {
  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/auth/sign-out`, {}, config);
  return promise;
}

export { postSignUp, postLogin, putLogout };
