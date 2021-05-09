import React, { useState, useEffect } from 'react'

const TaskTable = (props) => {

    const [tasks, setTasks] = useState(props.tasks);
    useEffect(() => {
       if (props.tasksInFolder) {
         setTasks(props.tasks.filter((task) => task.folderId == props.tasksInFolder));
       } else {
         setTasks(props.tasks);
       }
     }, [props.tasksInFolder, props.tasks]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Description</th>
                    <th>State</th>
                    <th>Folder Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { tasks.length > 0 ? (
                    tasks.map(task => {
                        const {id, description, state, folderName, folderId} = task;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{description}</td>
                                <td>{state}</td>
                                <td>{folderName}</td>
                                <td>
                                    <button onClick={() => props.deleteTask(id)}>Delete</button>
                                    <button onClick={() => props.editTask(id, task)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No tasks found</td>
                    </tr>
                )
                }
            </tbody>
        </table>
    )
}

export default TaskTable;
