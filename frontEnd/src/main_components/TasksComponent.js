import React, { useState, useEffect } from 'react'
import TaskForm from '../forms/TaskForm';
import TaskTable from '../tables/TaskTable';
import { serviceGetTask, serviceDeleteTask, serviceAddTask, serviceUpdateTask } from '../services/TaskService';

const TasksComponent = (props) => {
  // Tasks
  const initialTask = { id: null, description: "", state: "" };

  const [editing, setEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(initialTask);

  const [tasks, setTasks] = useState({});
  const [loadingTask, setLoadingTask] = useState(true);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const addTask = (details) => {
    serviceAddTask(details).then((response) => {
      if (response) {
        props.setLoadingTask(true);
      }
    })
    //setTasksInFolser(false);
  };

  const deleteTask = (id) => {
    serviceDeleteTask(id).then((response) => {
      if (response) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    })
  };

  const editTask = (id, task) => {
    setEditing(true);
    setCurrentTask(task);
  };

  const updateTask = (details, id) => {
    serviceUpdateTask(details, id).then((response) => {
      if (response) {
        props.setLoadingTask(true);
      }
    })
    setEditing(false);
  };

  return (
    <div class="tasks">
      <div class="editTaskForm">
        { editing ? (
          <h2>Edit task</h2>
          ) : (
          <h2>Add Task</h2>
          )}
          <TaskForm
            editing={editing}
            currentTask={currentTask} //
            setEditing={setEditing} //cancel button
            updateTask={updateTask} // update task (uses service and updates gui)
            addTask={addTask}/>
          </div>
       { props.loadingTask ? (
       <div>Loading tasks...</div>
       ) : (
       <div class="taskTable">
          <TaskTable
             tasks={tasks}
             deleteTask={deleteTask}
             editTask={editTask}/>
       </div>
       )}
    </div>
  )
}

export default TasksComponent;
