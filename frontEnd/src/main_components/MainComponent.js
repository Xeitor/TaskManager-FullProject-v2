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
      serviceGetFolder().then((data) => updateFolders(data))
      setLoadingFolder(false);
    }
  }, [loadingFolder]);

  const updateFolders = (data) => {
    const formattedFolders = data.map((obj, i) => {
      return {
        id: obj.id,
        name: obj.name
      };
    });
    setFolders(formattedFolders);
  }

  // Tasks
  const [tasks, setTasks] = useState({});
  const [loadingTask, setLoadingTask] = useState(true);

  useEffect(() => {
    if (loadingTask) {
      serviceGetTask().then((data) => updateTasks(data))
      setLoadingTask(false);
    }
  }, [loadingTask]);

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
    <div className="container">
      <div className="folders">
        <FoldersComponent
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
