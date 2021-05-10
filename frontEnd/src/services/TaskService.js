import { serviceGetAll, serviceDelete, serviceAdd, serviceUpdate } from '../services/GenericService';

const TASK_PATH = 'http://localhost:8080/task/';

export async function getAllTasks() {
  return serviceGetAll(TASK_PATH);
}

export async function sDeleteTask(id) {
  return serviceDelete(TASK_PATH, id);
}

export async function sUpdateTask(id, details) {
  return serviceUpdate(TASK_PATH, details, id);
}

export async function sAddTask(details) {
  return serviceAdd(TASK_PATH, details);
}
