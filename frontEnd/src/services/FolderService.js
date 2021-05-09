import { serviceGetAll, serviceDelete, serviceAdd, serviceUpdate } from './GenericService';

const FOLDER_PATH = 'http://localhost:8080/folder/';

export async function getAllFolders() {
  var response = await serviceGetAll(FOLDER_PATH);
  return response
}

export async function sDeleteFolder(id) {
  var response = await serviceDelete(FOLDER_PATH, id);
  return response
}

export async function sUpdateFolder(id, details) {
  var response = await serviceUpdate(FOLDER_PATH, details, id);
  return response
}

export async function sAddFolder(details) {
  var response = await serviceAdd(FOLDER_PATH, details);
  return response
}
