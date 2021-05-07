const requestOptionsGet = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
};
const requestOptionsDelete = {
  method: 'DELETE'
};
export async function serviceGetTask() {
  try {
      const response = await fetch(`http://localhost:8080/task/all`, requestOptionsGet);
      const json = await response.clone().json();
      return json
  } catch (err) {
      console.warn("Something went wrong fetching the API...", err);
      return []
  }
}

export async function serviceDeleteTask(id) {
  try {
      const response = await fetch('http://localhost:8080/task/' + id, requestOptionsDelete)
      const responseStatus = await response.clone().status;
      return responseStatus
  } catch (err) {
      console.warn("Error deliting task", err);
      return false
  }
};

export function getTaskSync() {
  return fetch(`http://localhost:8080/task/all`, requestOptionsGet)
    .then(data => data.json())
}
