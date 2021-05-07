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
      const response = await fetch(`http://localhost:8080/taaask/all`, requestOptionsGet);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const json = response.json();
        return json
      }
  } catch (err) {
      console.warn("Something went wrong fetching the API...", err);
      return []
  }
}

export async function serviceDeleteTask(id) {
  try {
    let response = await fetch('http://localhost:8080/task/' + id, requestOptionsDelete);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return true
    }
  } catch (e) {
    console.log(e);
  }
};

export function getTaskSync() {
  return fetch(`http://localhost:8080/task/all`, requestOptionsGet)
    .then(data => data.json())
}
