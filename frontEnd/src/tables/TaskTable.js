import React from 'react';

const TaskTable = (props) => {
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
                { props.tasks.length > 0 ? (
                    props.tasks.map(task => {
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
