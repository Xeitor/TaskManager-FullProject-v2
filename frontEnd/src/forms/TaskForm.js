import React, { useState, useEffect } from 'react'

const TaskForm = (props) => {

  const initTask = { id: null, description: "", state: "" };
  const [task, setTask] = useState(initTask);

  useEffect(() => {
    if (props.editing) {
      setTask(props.currentTask);
    } else {
      setTask(initTask);
    }
  }, [props.editing]);


  const handleChange = e => {
    const {name, value} = e.target;
    setTask({...task, [name]: value});
  }

  const handleSubmitAdd = e => {
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
  const handleSubmitUpdate = e => {
    e.preventDefault();
    if (props.currentTask != task) {
      if (!task.folderId) {task.folderId = ''};
      var details = {
        description: task.description,
        state: task.state,
        folderId: task.folderId
      };
      props.updateTask(details, task.id);
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
    { props.editing ? (
      <div>
        <button className="button-primary" type="submit" onClick={handleSubmitUpdate} >Edit Task</button>
        <button className="button-primary"type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
      </div>
    ) : (
      <button className="button-primary" type="submit" onClick={handleSubmitAdd} >Add Task</button>
    )}
    </form>

  )
}

export default TaskForm;
