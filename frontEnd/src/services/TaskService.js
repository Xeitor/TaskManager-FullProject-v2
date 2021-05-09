import { serviceGetAll, serviceDelete, serviceAdd, serviceUpdate } from '../services/GenericService';

const TASK_PATH = 'http://localhost:8080/task/';

export async function getAllTasks() {
  var response = await serviceGetAll(TASK_PATH);
  return response
}

export async function sDeleteTask(id) {
  var response = await serviceDelete(TASK_PATH, id);
  return response
}

export async function sUpdateTask(id, details) {
  var response = await serviceUpdate(TASK_PATH, details, id);
  return response
}

export async function sAddTask(details) {
  var response = await serviceAdd(TASK_PATH, details);
  return response
}
