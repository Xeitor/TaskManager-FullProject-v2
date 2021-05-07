import React, {useState} from 'react';
import TaskForm from './TaskForm';

const EditTaskForm = (props) => {

    const initTask = {id: null, description: '', state: '', folderName: '', folderId:''};
    
    const [task, setTask] = useState(props.currentTask);

    const handleChange = e => {
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    }

    const handleSubmit = e => {
      if (!task.folderId) {task.folderId = ''};
      var details = {
        description: task.description,
        state: task.state,
        folderId: task.folderId
      };
      e.preventDefault();
      props.updateTask(details, task.id);
      setTask(initTask);
    }

    return (
      <div>
      <TaskForm
        task={task}
        handleChange={handleChange}
      />
      <button className="button-primary" type="submit" onClick={handleSubmit} >Edit task</button>
      <button type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
      </div>
    )
}

export default EditTaskForm;
