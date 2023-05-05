import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function postSignUp(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
  return promise;
}

function postLogin(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-in`, body);
  return promise;
}

export { postSignUp, postLogin };
