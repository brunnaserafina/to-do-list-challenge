import axios from "axios";
import createHeaders from "./token";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function postTask(body) {
  const { name, listId } = body;
  const config = createHeaders();

  const promise = axios.post(
    `${BASE_URL}/tasks/add/${listId}`,
    { name },
    config
  );
  return promise;
}

function getTasksUnfinished(params) {
  const { listId } = params;

  if (listId === null) return;

  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/tasks/unfinished/${listId}`, config);
  return promise;
}

function getTasksFinished(params) {
  const { listId } = params;

  if (listId === null) return;

  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/tasks/finished/${listId}`, config);
  return promise;
}

function editTaskFinished(params) {
  const { taskId } = params;

  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/tasks/edit/${taskId}`, {}, config);
  return promise;
}

function editTaskUnfinished(params) {
  const { taskId } = params;

  const config = createHeaders();

  const promise = axios.put(
    `${BASE_URL}/tasks/edit/unfinished/${taskId}`,
    {},
    config
  );
  return promise;
}

function getTasksBySearch(search) {
  const config = createHeaders();

  const promise = axios.get(
    `${BASE_URL}/tasks/?search=${search.toLowerCase()}`,
    config
  );

  return promise;
}

function getTaskById(taskId) {
  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/tasks/${taskId}`, config);

  return promise;
}

function putAnotationTask(taskId, anotation) {
  const config = createHeaders();

  const promise = axios.put(
    `${BASE_URL}/tasks/anotation/${taskId}`,
    { anotation },
    config
  );

  return promise;
}

function deleteTask(taskId) {
  const config = createHeaders();

  const promise = axios.delete(`${BASE_URL}/tasks/${taskId}`, config);

  return promise;
}

export {
  postTask,
  getTasksUnfinished,
  getTasksFinished,
  editTaskFinished,
  editTaskUnfinished,
  getTasksBySearch,
  getTaskById,
  putAnotationTask,
  deleteTask,
};
