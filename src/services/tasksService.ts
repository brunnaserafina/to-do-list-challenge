import axios from "axios";
import createHeaders from "./headersConfig";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface PostTaskProps {
  name: string;
  listId: number;
  order: number;
}

interface GetTasks {
  listId: number;
}

interface EditTask {
  taskId: number;
  order?: number;
  name?: string;
}

function postTask(body: PostTaskProps) {
  const { name, listId, order } = body;
  const config = createHeaders();

  const promise = axios.post(`${BASE_URL}/tasks/add/${listId}`, { name, order }, config);
  return promise;
}

function getTasksUnfinished(params: GetTasks) {
  const { listId } = params;

  if (listId === null) return;

  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/tasks/unfinished/${listId}`, config);
  return promise;
}

function getTasksFinished(params: GetTasks) {
  const { listId } = params;

  if (listId === null) return;

  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/tasks/finished/${listId}`, config);
  return promise;
}

function editTaskFinished(params: EditTask) {
  const { taskId, order } = params;

  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/tasks/edit/${taskId}`, { order }, config);
  return promise;
}

function editTaskUnfinished(params: EditTask) {
  const { taskId, order } = params;

  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/tasks/edit/unfinished/${taskId}`, { order }, config);
  return promise;
}

function getTasksBySearch(search: string) {
  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/tasks/?search=${search.toLowerCase()}`, config);

  return promise;
}

function getTaskById(taskId: number) {
  const config = createHeaders();

  const promise = axios.get(`${BASE_URL}/tasks/${taskId}`, config);

  return promise;
}

function putAnnotationTask(taskId: number, annotation: string, date: string | null) {
  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/tasks/anotation/${taskId}`, { annotation, date }, config);

  return promise;
}

function deleteTask(taskId: number) {
  const config = createHeaders();

  const promise = axios.delete(`${BASE_URL}/tasks/${taskId}`, config);

  return promise;
}

function editTaskName(params: EditTask) {
  const { taskId, name } = params;

  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/tasks/${taskId}`, { name }, config);

  return promise;
}

function editOrderTasks(params: EditTask) {
  const { taskId, order } = params;

  const config = createHeaders();

  const promise = axios.put(`${BASE_URL}/tasks/order/${taskId}`, { order }, config);

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
