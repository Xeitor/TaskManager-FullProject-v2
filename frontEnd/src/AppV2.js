import React, { useState, useEffect } from 'react'
import TaskTable from './tables/TaskTable';
import FolderTable from './tables/FolderTable';
import AddTaskForm from './forms/AddTaskForm';
import EditTaskForm from './forms/EditTaskForm';
import AddFolderForm from './forms/AddFolderForm';
import EditFolderForm from './forms/EditFolderForm';
import { serviceGetTask, serviceDeleteTask } from './TaskService';
var aux = null;

const App = () => {

  const [tasks, setTasks] = useState({});
  const [loadingTask, setLoadingTask] = useState(true);

  useEffect(() => {
    if (loadingTask) {
      console.log("wtffff");
      serviceGetTask().then((data) => updateTasks(data))
      setLoadingTask(false);
    }
  }, [loadingTask]);

  const addTask = (task) => {
    //reFetchTasks();
    //setTaskss([...tasks, task]);
    //setTaskssInFolser(false);
  };

  const deleteTask = (id) => {
    serviceDeleteTask(id).then((response) => {
      if (response) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    })
  };

  const editTask = (id, task) => {
    //setEditing(true);
    //setCurrentTask(task);
  };

  const updateTask = (newTask) => {
    //reFetchTasks();
    //setTaskss();
    //setCurrentTask(initialTask);
    //setEditing(false);
    //setTaskssInFolser(false);
  };

  const updateTasks = (data) => {
    const formattedTasks = data.map((obj, i) => {
      return {
        id: obj.id,
        description: obj.description ,
        state: obj.state || '',
        folderName: obj.folderName || '',
        folderId: obj.folderId || ''
      };
    });
    setTasks(formattedTasks);
  }
  return (
    <div class="rootDiv">
      <div class="tasks">
      <div className="editTaskForm">
        { editing ? (
          <div class="editTaskForm">
            <h2>Edit task</h2>
            <EditTaskForm
              currentTask={currentTask}
              setEditing={setEditing}
              updateTask={updateTask}
              folders={folders}
            />
          </div>
        ) : (
          <div className="addTaskForm">
            <h2>Add task</h2>
            <AddTaskForm addTask={addTask} folders={folders} />
          </div>
        )}
      </div>
        { loadingTask ? (
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
    </div>
  );
};

export default App
