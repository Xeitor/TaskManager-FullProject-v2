import React from 'react';

const FolderTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.folders.length > 0 ? (
                    props.folders.map(folder => {
                        const {id, name} = folder;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>
                                    <button class="buttonDelete" onClick={() => props.deleteFolder(id)}>Delete</button>
                                    <button class="buttonEdit" onClick={() => props.editFolder(id, folder)}>Edit</button>
                                    <button onClick={() => props.setTasksInFolder(id)} >Show Tasks</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No folders found</td>
                    </tr>
                )
                }
            </tbody>
        </table>
    )
}

export default FolderTable;
