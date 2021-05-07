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
      setTasks(tasks.filter((task) => task.id !== id));
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
    <>
      { loadingTask ? (
        <div>Loading tasks...</div>
      ) : (
        <div>
          <br />
          <TaskTable
            tasks={tasks}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        </div>
      )}
    </>
  );
};

export default App
