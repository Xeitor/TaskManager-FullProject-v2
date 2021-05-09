//Aux
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

const requestOptionsGet = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
};

export async function serviceGetAll(url) {
  try {
      const response = await fetch(url + '/all', requestOptionsGet);
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

export async function serviceDelete(url, id) {
  try {
    let response = await fetch(url + id, {
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

export async function serviceAdd(url, details) {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: dataToRequestDetails(details)
  };

  try {
    let response = await fetch(url + '/add', requestOptions);
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

export async function serviceUpdate(url, details, id) {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: dataToRequestDetails(details)
  };

  try {
    let response = await fetch(url + id, requestOptions);
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
