import React, { useState, useEffect } from 'react'
import FolderForm from '../forms/FolderForm';
import FolderTable from '../tables/FolderTable';
import {  sDeleteFolder, sUpdateFolder, sAddFolder } from '../services/FolderService';

const FoldersComponent = (props) => {

  const initialFolder = { id: null, name: "" };

  const [editing, setEditing] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(initialFolder);

  const addFolder = (details) => {
    sAddFolder(details).then((response) => {
      if (response) {
        props.setLoadingFolder(true);
      }
    })
    setCurrentFolder(initialFolder);
    //setFoldersInFolser(false);
  };

  const updateFolder = (details, id) => {
    sUpdateFolder(id, details).then((response) => {
      if (response) {
        console.log("should be executing");
        props.setLoadingFolder(true);
      }
    })
    setCurrentFolder(initialFolder);
    setEditing(false);
  };

  const deleteFolder = (id) => {
    sDeleteFolder(id).then((response) => {
      if (response) {
        props.setFolders(props.folders.filter((folder) => folder.id !== id));
        props.setTasks(props.tasks.filter((task) => task.folderId !== id))
      }
    })
  };

  const editFolder = (id, folder) => {
    setEditing(true);
    setCurrentFolder(folder);
  };

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
       { props.loadingFolder ? (
       <div>Loading folders...</div>
       ) : (
       <div class="taskTable">
          <FolderTable
             folders={props.folders}
             deleteFolder={deleteFolder}
             editFolder={editFolder}/>
       </div>
       )}
    </div>
  )
}

export default FoldersComponent;
