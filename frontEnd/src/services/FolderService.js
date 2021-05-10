import { serviceGetAll, serviceDelete, serviceAdd, serviceUpdate } from './GenericService';

const FOLDER_PATH = 'http://localhost:8080/folder/';

export async function getAllFolders() {
  return await serviceGetAll(FOLDER_PATH);
}

export async function sDeleteFolder(id) {
  return await serviceDelete(FOLDER_PATH, id);
}

export async function sUpdateFolder(id, details) {
  return await serviceUpdate(FOLDER_PATH, details, id);
}

export async function sAddFolder(details) {
  return await serviceAdd(FOLDER_PATH, details);
}
