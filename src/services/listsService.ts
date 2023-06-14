import axios from "axios";
import createHeaders from "./headersConfig";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface PostListProps {
  title: string;
  order: number;
}

interface DeleteListProps {
  listId: number;
}

interface EditTitleListProps {
  listId: number;
  title: string;
}

interface EditOrderList {
  order: number;
  listId: number;
}

function postList(body: PostListProps) {
  const config = createHeaders();

  const promise = axios.post(`${BASE_URL}/lists/add`, body, config);
  return promise;
}

function getLists() {
  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/lists/all`, config);
  return promise;
}

function deleteList(params: DeleteListProps) {
  const { listId } = params;
  const config = createHeaders();

  const promise = axios.delete(`${BASE_URL}/lists/${listId}`, config);
  return promise;
}

function editTitleList(params: EditTitleListProps) {
  const { listId, title } = params;

  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/lists/${listId}`, { title }, config);
  return promise;
}

async function editOrderList(params: EditOrderList) {
  const { order, listId } = params;

  const config = createHeaders();

  const promise = await axios.put(`${BASE_URL}/lists/order/${listId}`, { order }, config);
  return promise;
}

export { postList, getLists, deleteList, editTitleList, editOrderList };
