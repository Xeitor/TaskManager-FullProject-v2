import React, {useState} from 'react';
import TaskForm from './TaskForm';

const AddTaskForm = (props) => {

  const initTask = {id: null, description: '', state: '', folderName: '', folderId:''};

  const [task, setTask] = useState(props.currentTask);

  const handleChange = e => {
    const {name, value} = e.target;
    setTask({...task, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!task.folderId) {
      task.folderId = ''
    }
    if (!task.state) {task.state = 'NOCOMPLETADA'}; //comentar posiblemente
    if (task.description) {
      //  handleChange(e, props.addTask(task));
      var details = {
        description: task.description,
        state: task.state,
        folderId: task.folderId
      };
      props.addTask(details);
      setTask(initTask);
    }
  }

  return (
    <div>
    <TaskForm
      task={task}
      handleChange={handleChange}
    />
    <button className="button-primary" type="submit" onClick={handleSubmit} >Add task</button>
    </div>
  )
}

export default AddTaskForm;
