import React, {useState, useRef} from 'react';
import TaskForm from './TaskForm';

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
          console.log("should add task");
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
    <div>
    <TaskForm
      task={task}
      tasks={props.tasks}
      deleteTask={props.deleteTask}
      editTask={props.editTask}
      handleChange={handleChange}
    />
    <button className="button-primary" type="submit" onClick={handleSubmit} >Add task</button>
    </div>
  )
}

export default AddTaskForm;
