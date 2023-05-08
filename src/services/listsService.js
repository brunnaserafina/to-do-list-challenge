import axios from "axios";
import createHeaders from "./token";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function postList(body) {
  const config = createHeaders();

  const promise = axios.post(`${BASE_URL}/lists/add`, body, config);
  return promise;
}

function getLists() {
  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/lists/all`, config);
  return promise;
}

function deleteList(params) {
  const { listId } = params;
  const config = createHeaders();

  const promise = axios.delete(`${BASE_URL}/lists/${listId}`, config);
  return promise;
}

export { postList, getLists, deleteList };
