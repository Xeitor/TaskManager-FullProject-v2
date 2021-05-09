import React, { useState, useEffect } from 'react'
import TaskForm from '../forms/TaskForm';
import TaskTable from '../tables/TaskTable';
import {  sDeleteTask, sUpdateTask, sAddTask } from '../services/TaskService';

const TasksComponent = (props) => {
  // Tasks
  const initialTask = { id: null, description: "", state: "", folderId: null, folderName: ''};

  const [editing, setEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(initialTask);

  const [loadingTask, setLoadingTask] = useState(true);

  const addTask = (details) => {
    sAddTask(details).then((task) => {
      if (task) {
        props.setTasks([...props.tasks, task])
      }
    })
    //setTasksInFolser(false);
  };

  const deleteTask = (id) => {
    sDeleteTask(id).then((response) => {
      if (response) {
        props.setTasks(props.tasks.filter((task) => task.id !== id));
      }
    })
  };

  const editTask = (id, task) => {
    setCurrentTask(task);
    setEditing(true);
  };

  const updateTask = (details, id) => {
    sUpdateTask(id, details).then((newTask) => {
      if (newTask) {
        props.setTasks(props.tasks.map(task => (task.id === newTask.id ? newTask : task)))
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
            folders={props.folders}
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
       { props.tasksInFolder ? (
         <div>
            <h2>Tasks in #FolderName</h2>
            <button onClick={() => props.setTasksInFolder(false)} > Show all tasks</button>
         </div>
       ): (
         <h2>Tasks list</h2>
       )}
          <TaskTable
            tasksInFolder={props.tasksInFolder}
            tasks={props.tasks}
            deleteTask={deleteTask}
            editTask={editTask}/>
       </div>
       )}
    </div>
  )
}

export default TasksComponent;
