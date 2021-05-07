const requestOptionsGet = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
};
function dataToRequestDetails(details){
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody
}
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

export async function serviceAddTask(details) {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: dataToRequestDetails(details)
  };

  try {
    let response = await fetch('http://localhost:8080/task/add', requestOptions);
    let data = await response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${data.message}`);
    } else {
      return true
    }
  } catch (err) {
    console.warn("Something went wrong fetching the API...", err);
  }
};

export async function serviceUpdateTask(details, id) {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: dataToRequestDetails(details)
  };

  try {
    let response = await fetch('http://localhost:8080/task/' + id, requestOptions);
    let data = await response.json()
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${data.message}`);
    } else {
      return true
    }
  } catch (err) {
    console.warn("Something went wrong fetching the API...", err);
  }
};
