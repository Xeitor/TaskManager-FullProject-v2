import React, {useState} from 'react';

const EditFolderForm = (props) => {

    const [folder, setFolder] = useState(props.currentFolder);

    const handleChange = e => {
        const {name, value} = e.target;
        setFolder({...folder, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (folder.name) {
          //  handleChange(e, props.addTask(task));
          e.preventDefault();
          var details = 'name=' + folder.name;

          const requestOptions = {
            method: 'PATCH',
            //headers: {'Access-Control-Allow-Methods ": "GET, POST,HEAD, OPTIONS,PUT, DELETE'},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: details
          };

          fetch('http://localhost:8080/folder/' + folder.id, requestOptions)
          .then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            var data = response;
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            } else {
              //var obj = JSON.parse(data);
              props.updateFolder(folder);
            }
          })
          .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
          });
        }
    }

    return (
        <form>
            <label>Name</label>
            <input className="u-full-width" type="text" value={folder.name} name="name" onChange={handleChange} />
            <button className="button-primary" type="submit" onClick={handleSubmit} >Edit folder</button>
            <button type="submit" onClick={() => props.setEditingFolder(false)} >Cancel</button>
        </form>
    )
}

export default EditFolderForm;
