import React, {useState, useRef} from 'react';

const TaskForm = (props) => {

  return (
    <form>

    <label>Description</label>
    <input className="u-full-width" type="text" value={task.description} name="description" onChange={handleChange} />

    <label>State</label>
    <select className="u-full-width" type="text" value={task.state} name="state" onChange={handleChange}>
    <option type="text" value="NOCOMPLETADA" onChange={handleChange}>Not completed</option>
    <option type="text" value="COMPLETADA" name="state" onChange={handleChange}>Completed</option>
    </select>

    <label>Folder</label>
    <select className="u-full-width" type="text" value={task.folderId} name="folderId" onChange={handleChange}>
    <option value="" onChange={handleChange} name="folderId"> - </option>
    { props.folders && props.folders.length > 0 ? (
        props.folders.map(folder => {
            const {id, name} = folder;
            return (
              <option value={id} onChange={handleChange} name="folderId">{name}</option>
            )
        })
    ) : (
        <option defaultValue="" value="" onChange={handleChange} name="folderId"> - </option>
    )
    }
    </select>
    <button className="button-primary" type="submit" onClick={handleSubmit} >Add task</button>
    </form>
  )
}

export default TaskForm;
