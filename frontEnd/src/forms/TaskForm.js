import React from 'react';

const TaskForm = (props) => {

  return (
    <form>
    <label>Description</label>
    <input className="u-full-width" type="text" value={props.task.description} name="description" onChange={props.handleChange} />

    <label>State</label>
    <select className="u-full-width" type="text" value={props.task.state} name="state" onChange={props.handleChange}>
    <option type="text" value="NOCOMPLETADA" onChange={props.handleChange}>Not completed</option>
    <option type="text" value="COMPLETADA" name="state" onChange={props.handleChange}>Completed</option>
    </select>

    <label>Folder</label>
    <select className="u-full-width" type="text" value={props.task.folderId} name="folderId" onChange={props.handleChange}>
    <option value="" onChange={props.handleChange} name="folderId"> - </option>
    { props.folders && props.folders.length > 0 ? (
        props.folders.map(folder => {
            const {id, name} = folder;
            return (
              <option value={id} onChange={props.handleChange} name="folderId">{name}</option>
            )
        })
    ) : (
        <option defaultValue="" value="" onChange={props.handleChange} name="folderId"> - </option>
    )
    }
    </select>
    </form>
  )
}

export default TaskForm;
