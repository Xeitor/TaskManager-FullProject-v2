import React, { useState, useEffect } from 'react'
import TaskTable from './tables/TaskTable';
import FolderTable from './tables/FolderTable';
import FoldersComponent from './main_components/FoldersComponent';
import TasksComponent from './main_components/TasksComponent';
import { serviceGetTask, serviceDeleteTask, serviceAddTask, serviceUpdateTask } from './services/TaskService';

var aux = null;

const App = () => {


  // folders

  const [folders, setFolders] = useState([]);

  return (
    <div className="container">
      <h1>Task manager app</h1>
      <div className="folders">
        <FoldersComponent />
        </div>
      <div className="tasks">
        <TasksComponent />
      </div>
    </div>
  )
}

export default App
