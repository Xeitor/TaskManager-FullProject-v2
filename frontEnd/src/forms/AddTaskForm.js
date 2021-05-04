import React, {useState, useRef} from 'react';
const AddTaskForm = (props) => {

  const initTask = {id: null, description: '', state: '', folderName: '', folderId:''};

  const [task, setTask] = useState(initTask);

  const handleChange = e => {
    const {name, value} = e.target;
    setTask({...task, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!task.folderId) {
      task.folderId = ''
    }
    if (!task.state) {task.state = 'NOCOMPLETADA'};
    if (task.description) {
      //  handleChange(e, props.addTask(task));
      var details = {
        description: task.description,
        state: task.state,
        folderId: task.folderId
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      e.preventDefault();

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      };

      fetch('http://localhost:8080/task/add', requestOptions)
      .then(response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        var data = response;
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          //var obj = JSON.parse(data);
          console.log("data " + JSON.stringify(data));
          props.addTask(task);
        }
      })
      .catch(error => {
        //this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
      setTask(initTask);
    }
  }

  return (
    <form>

    <label>Description</label>
    <input className="u-full-width" type="text" value={task.description} name="description" onChange={handleChange} />

    <label>State</label>
    <select className="u-full-width" type="text" value={task.state} name="state" onChange={handleChange}>
    <option type="text" value="NOCOMPLETADA" onChange={handleChange}>Not completed</option>
    <option type="text" value="COMPLETADA" name="state" onChange={handleChange}>Completed</option>
    </select>

    <label>Folder</label>
    <select className="u-full-width" type="text" value={task.folderId} name="folderId" onChange={handleChange}>
    <option value="" onChange={handleChange} name="folderId"> - </option>
    { props.folders && props.folders.length > 0 ? (
        props.folders.map(folder => {
            const {id, name} = folder;
            return (
              <option value={id} onChange={handleChange} name="folderId">{name}</option>
            )
        })
    ) : (
        <option defaultValue="" value="" onChange={handleChange} name="folderId"> - </option>
    )
    }
    </select>
    <button className="button-primary" type="submit" onClick={handleSubmit} >Add task</button>
    </form>
  )
}

export default AddTaskForm;
