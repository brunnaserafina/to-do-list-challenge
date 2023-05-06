import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function createHeaders() {
  const token = JSON.parse(localStorage.getItem("to-do-list"))?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}

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

export { postTask, getTasksUnfinished, getTasksFinished, editTaskFinished };
