import React, { useState, useEffect } from 'react'
import FolderForm from '../forms/FolderForm';
import FolderTable from '../tables/FolderTable';
import { serviceGetFolder, serviceDeleteFolder, serviceAddFolder, serviceUpdateFolder } from '../services/FolderService';

const FoldersComponent = (props) => {

  const initialFolder = { id: null, name: "" };

  const [editing, setEditing] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(initialFolder);

  const [folders, setFolders] = useState({});
  const [loadingFolder, setLoadingFolder] = useState(true);

  useEffect(() => {
    if (loadingFolder) {
      serviceGetFolder().then((data) => updateFolders(data))
      setLoadingFolder(false);
    }
  }, [loadingFolder]);

  const addFolder = (details) => {
    serviceAddFolder(details).then((response) => {
      if (response) {
        setLoadingFolder(true);
      }
    })
    setCurrentFolder(initialFolder);
    //setFoldersInFolser(false);
  };

  const deleteFolder = (id) => {
    serviceDeleteFolder(id).then((response) => {
      if (response) {
        setFolders(folders.filter((folder) => folder.id !== id));
      }
    })
  };

  const editFolder = (id, folder) => {
    setEditing(true);
    setCurrentFolder(folder);
  };

  const updateFolder = (details, id) => {
    serviceUpdateFolder(details, id).then((response) => {
      if (response) {
        setLoadingFolder(true);
      }
    })
    setCurrentFolder(initialFolder);
    setEditing(false);
  };

  const updateFolders = (data) => {
    const formattedFolders = data.map((obj, i) => {
      return {
        id: obj.id,
        name: obj.name
      };
    });
    setFolders(formattedFolders);
  }

  return (
    <div class="tasks">
      <div class="editTaskForm">
        { editing ? (
          <h2>Edit task</h2>
          ) : (
          <h2>Add Folder</h2>
          )}
          <FolderForm
            editing={editing}
            currentFolder={currentFolder} //
            setEditing={setEditing} //cancel button
            updateFolder={updateFolder} // update folder (uses service and updates gui)
            addFolder={addFolder}/>
          </div>
       { loadingFolder ? (
       <div>Loading folders...</div>
       ) : (
       <div class="taskTable">
          <FolderTable
             folders={folders}
             deleteFolder={deleteFolder}
             editFolder={editFolder}/>
       </div>
       )}
    </div>
  )
}

export default FoldersComponent;
