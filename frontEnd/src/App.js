import React, { useState, useEffect } from 'react'
import TaskTable from './tables/TaskTable';
import FolderTable from './tables/FolderTable';
import AddTaskForm from './forms/AddTaskForm';
import EditTaskForm from './forms/EditTaskForm';
import AddFolderForm from './forms/AddFolderForm';
import EditFolderForm from './forms/EditFolderForm';
var aux = null;

const App = () => {
  // Refactoring

  const [dataTasksV2, loadingTasksV2] = useState(true);
  //const [dataFolders, loadingFolders] = useState(true);

  // useState returns a pair: the current state value and a function that lets you update it.
  const [tasksV2, setTasksV2] = useState([]);
  //const [folders, setFolders] = useState([]);

  // Old code
  const requestOptionsGet = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': 'secret'
    }
  };
  const [tasksInFolder, setTasksInFolser] = useState(null);
  const showTasksInFolder = (id, name) => {
    tasks = aux;
    setTasks(tasks.filter((task) => task.folderId == id));
    setTasksInFolser(name);
  };
  function showAllTasks() {
    setTasksInFolser(false);
    setTasks(aux);
  }
  async function reFetchTasks() {
    const response = await fetch(`http://localhost:8080/task/all`, requestOptionsGet);
    const tareas = await response.clone().json();
    const formattedTasks = tareas.map((obj, i) => {
      console.log("checkingggg");
      return {
        id: obj.id,
        description: obj.description ,
        state: obj.state || '',
        folderName: obj.folderName || '',
        folderId: obj.folderId || ''
      };
    });
    setTasks(formattedTasks);
    aux = formattedTasks;
  }
  async function reFetchFolders() {
    const response = await fetch(`http://localhost:8080/folder/all`);
    const folders = await response.clone().json();
    const formattedFolders = folders.map((obj, i) => {
      console.log("checkingggg");
      return {
        id: obj.id,
        name: obj.name
      };
    });
    setFolders(formattedFolders);
  }
  const useAsyncRequestFolder = amount => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
          const fetchData = async () => {
              try {
                  setLoading(true);
                  const response = await fetch(`http://localhost:8080/folder/all`, requestOptionsGet);
                  const json = await response.json();
                  setData(json, setLoading(false));
                  console.log(JSON.stringify(json));
              } catch (err) {
                  console.warn("Something went wrong fetching the API...", err);
                  setLoading(false);
              }
          }

          if (amount) {
           fetchData(amount);
          }
      }, [amount]);

      return [data, loading]
  }
  const useAsyncRequestTask = amount => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      return [data, loading]
  }
  const test = 1;
  var [dataTasks, loadingTasks] = useAsyncRequestTask(test);
  var [dataFolders, loadingFolders] = useAsyncRequestFolder(test);
  // Fixed array of users:
  // const [users, setUsers] = userList;
  var [tasks, setTasks] = useState([]);
  var [folders, setFolders] = useState([]);

  useEffect(() => {
    if (dataTasks) {
      const formattedTasks = dataTasks.map((obj, i) => {
        return {
          id: obj.id,
          description: obj.description ,
          state: obj.state || '',
          folderName: obj.folderName || '',
          folderId: obj.folderId || ''
        };
      });
      aux = formattedTasks;
      setTasks(formattedTasks);
    }
  }, [dataTasks]);

  useEffect(() => {
    if (dataFolders) {
      const formattedFolders = dataFolders.map((obj, i) => {
        console.log(i);
        return {
          id: obj.id,
          name: obj.name
        };
      });
      setFolders(formattedFolders);
    }
  }, [dataFolders]);

  const addTask = (task) => {
    reFetchTasks();
    setTasks([...tasks, task]);
    setTasksInFolser(false);
  };

  const addFolder = (folder) => {
    reFetchFolders();
    setFolders([...folders, folder]);
  };

  const deleteTask = (id) => {
    const requestOptions = {
      method: 'DELETE'
    };
    
    fetch('http://localhost:8080/task/' + id, requestOptions)
    .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      } else {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    })
    .catch(error => {
      //this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
    });
  };

  const deleteFolder = (id) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch('http://localhost:8080/folder/' + id, requestOptions)
    .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      } else {
        setFolders(folders.filter((folder) => folder.id !== id));
        reFetchTasks();
      }
    })
    .catch(error => {
      //this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
    });
  };

  const [editing, setEditing] = useState(false);
  const [editingFolder, setEditingFolder] = useState(false);

  const initialTask = { id: null, description: "", state: "" };
  const initialFolder = { id: null, name: ""};

  const [currentTask, setCurrentTask] = useState(initialTask);
  const [currentFolder, setCurrentFolder] = useState(initialFolder);

  const editTask = (id, task) => {
    setEditing(true);
    setCurrentTask(task);
  };
  const editFolder = (id, folder) => {
    setEditingFolder(true);
    setCurrentFolder(folder);
  };

  const updateTask = (newTask) => {
    reFetchTasks();
    setTasks();
    setCurrentTask(initialTask);
    setEditing(false);
    setTasksInFolser(false);
  };

  const updateFolder = (newFolder) => {
    reFetchFolders();
    reFetchTasks();
    setCurrentFolder(initialFolder);
    setEditingFolder(false);
    setFolders();
  };

  return (
    <div className="container">
      <h1>Task manager app</h1>
      <div className="row">
  <div className="five columns">
    {editingFolder ? (
      <div>
        <h2>Edit user</h2>
        <EditFolderForm
          currentFolder={currentFolder}
          setEditingFolder={setEditingFolder}
          updateFolder={updateFolder}
        />
      </div>
    ) : (
      <div>
        <h2>Add Folder</h2>
        <AddFolderForm addFolder={addFolder} />
      </div>
    )}
    {loadingFolders || !folders ? (
      <p>Loading...</p>
    ) : (
      <div>
      <h2>Folders List</h2>
      <FolderTable
        folders={folders}
        deleteFolder={deleteFolder}
        editFolder={editFolder}
        showTasksInFolder={showTasksInFolder}/>
      </div>
      )}
    </div>
  </div>
        <div className="five columns">
          { editing ? (
            <div>
              <h2>Edit task</h2>
              <EditTaskForm
                currentTask={currentTask}
                setEditing={setEditing}
                updateTask={updateTask}
                folders={folders}
              />
            </div>
          ) : (
            <div className="five columns">
              <h2>Add task</h2>
              <AddTaskForm addTask={addTask} folders={folders} />
            </div>
          )}
        </div>
        <div className="seven columns">
        { loadingTasks || (!tasks) ? (
          <p>Loading tasks</p>
        ) : (
          <div className="seven columns">
            { tasksInFolder ? (
            <div>
            <h2>Tasks in {tasksInFolder}</h2>
              <button onClick={() => showAllTasks()} > Show all tasks</button>
              </div>
            ): (
                <h2>Tasks list</h2>
              )}
            <TaskTable
              tasks={tasks}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </div>
        )}
        </div>
      </div>
  )
}

export default App
