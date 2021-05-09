import React, { useState, useEffect } from 'react'
import FoldersComponent from './FoldersComponent';
import TasksComponent from './TasksComponent';
import { serviceGetFolder, serviceDeleteFolder, serviceAddFolder, serviceUpdateFolder } from '../services/FolderService';
import { serviceGetTask, serviceDeleteTask, serviceAddTask, serviceUpdateTask } from '../services/TaskService';

const MainComponent = (props) => {
  // Folders
  const [folders, setFolders] = useState({});
  const [loadingFolder, setLoadingFolder] = useState(true);

  useEffect(() => {
    if (loadingFolder) {
      serviceGetFolder().then((data) => setFolders(data))
      setLoadingFolder(false);
    }
  }, [loadingFolder]);

  // Tasks
  const [tasks, setTasks] = useState({});
  const [loadingTask, setLoadingTask] = useState(true);

  useEffect(() => {
    if (loadingTask) {
      serviceGetTask().then((data) => setTasks(data))
      setLoadingTask(false);
    }
  }, [loadingTask]);

  return (
    <div className="container">
      <div className="folders">
        <FoldersComponent
          tasks={tasks}
          setTasks={setTasks}
          folders={folders}
          setFolders={setFolders}
          setLoadingFolder={setLoadingFolder}
          loadingFolder={loadingFolder}
        />
        </div>
      <div className="tasks">
        <TasksComponent
          tasks={tasks}
          folders={folders}
          setTasks={setTasks}
          setLoadingTask={setLoadingTask}
          loadingTask={loadingTask}
        />
      </div>
    </div>
  )
}

export default MainComponent;
