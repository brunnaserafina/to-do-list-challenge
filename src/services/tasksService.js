import axios from "axios";
import createHeaders from "./headersConfig";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function postTask(body) {
  const { name, listId, order } = body;
  const config = createHeaders();

  const promise = axios.post(
    `${BASE_URL}/tasks/add/${listId}`,
    { name, order },
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
  const { taskId, order } = params;

  const config = createHeaders();

  const promise = axios.put(
    `${BASE_URL}/tasks/edit/${taskId}`,
    { order },
    config
  );
  return promise;
}

function editTaskUnfinished(params) {
  const { taskId, order } = params;

  const config = createHeaders();

  const promise = axios.put(
    `${BASE_URL}/tasks/edit/unfinished/${taskId}`,
    { order },
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

function putAnnotationTask(taskId, annotation, date) {
  const config = createHeaders();

  const promise = axios.put(
    `${BASE_URL}/tasks/anotation/${taskId}`,
    { annotation, date },
    config
  );

  return promise;
}

function deleteTask(taskId) {
  const config = createHeaders();

  const promise = axios.delete(`${BASE_URL}/tasks/${taskId}`, config);

  return promise;
}

function editTaskName(params) {
  const { taskId, name } = params;

  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/tasks/${taskId}`, { name }, config);

  return promise;
}

function editOrderTasks(params) {
  const { taskId, order } = params;

  const config = createHeaders();

  const promise = axios.put(
    `${BASE_URL}/tasks/order/${taskId}`,
    { order },
    config
  );

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
  putAnnotationTask,
  deleteTask,
  editTaskName,
  editOrderTasks,
};
