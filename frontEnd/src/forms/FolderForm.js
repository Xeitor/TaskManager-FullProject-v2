import React, { useState, useEffect } from 'react'

const FolderForm = (props) => {

  const initFolder = {id: null, name: ''};

  const [folder, setFolder] = useState(initFolder);

  useEffect(() => {
    if (props.editing) {
      setFolder(props.currentFolder);
    } else {
      setFolder(initFolder);
    }
  }, [props.editing]);


  const handleChange = e => {
    const {name, value} = e.target;
    setFolder({...folder, [name]: value});
  }

  const handleSubmitAdd = e => {
    e.preventDefault();
    if (folder.name) {
      var details = {
        name: folder.name,
      };
      props.addFolder(details);
      setFolder(initFolder);
    }
  }
  const handleSubmitUpdate = e => {
    e.preventDefault();
    if (props.currentFolder.name != folder.name) {
      var details = {
        name: folder.name,
      };
      props.addFolder(details);
      setFolder(initFolder);
    }
  }


  return (
    <form>
        <label>Name</label>
        <input className="u-full-width" type="text" value={folder.name} name="name" onChange={handleChange} />
        { props.editing ? (
          <div>
            <button className="button-primary" type="submit" onClick={handleSubmitUpdate} >Edit folder</button>
            <button className="button-primary"type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
          </div>
        ) : (
          <button className="button-primary" type="submit" onClick={handleSubmitAdd} >Add folder</button>
        )}
    </form>
  )
}

export default FolderForm;
