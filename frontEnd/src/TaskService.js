const requestOptionsGet = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
};
export async function serviceGetTask() {
  try {
      const response = await fetch(`http://localhost:8080/task/all`, requestOptionsGet);
      let data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${data.message}`);
      } else {
        return data
      }
  } catch (err) {
      console.warn("Something went wrong fetching the API...", err);
      return []
  }
}

export async function serviceDeleteTask(id) {
  try {
    let response = await fetch('http://localhost:8080/task/' + id, {
      method: 'DELETE',
    });
    let data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${data.message}`);
    } else {
      return true
    }
  } catch (err) {
    console.warn("Something went wrong fetching the API...", err);
  }
};
