import React, {useState} from 'react';
import TaskForm from './TaskForm';

const EditTaskForm = (props) => {

    const [task, setTask] = useState(props.currentTask);

    const handleChange = e => {
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    }

    const handleSubmit = e => {
      if (!task.folderId) {task.folderId = ''};
      console.log("testeando " + task.description);
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
        method: 'PATCH',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      };

      fetch('http://localhost:8080/task/' + task.id, requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          props.updateTask(task);
        }
      })
      .catch(error => {
        //this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
    }

    return (
      <div>
      <TaskForm
        task={task}
        tasks={props.tasks}
        deleteTask={props.deleteTask}
        editTask={props.editTask}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <button className="button-primary" type="submit" onClick={handleSubmit} >Edit task</button>
      <button type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
      </div>
    )
}

export default EditTaskForm;
