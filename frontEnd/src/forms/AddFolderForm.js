import React, {useState} from 'react';

const AddFolderForm = (props) => {

    const initFolder = {id: null, name: ''};

    const [folder, setFolder] = useState(initFolder);

    const handleChange = e => {
      const {name, value} = e.target;
      setFolder({...folder, [name]: value});
    }

    const handleSubmit = e => {
      if (folder.name) {
        //  handleChange(e, props.addTask(task));
        e.preventDefault();
        var details = 'name=' + folder.name;

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: details
        };

        fetch('http://localhost:8080/folder/add', requestOptions)
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
            console.log("data " + JSON.stringify(data));
            props.addFolder(folder);
          }
        })
        .catch(error => {
          //this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
        });
        setFolder(initFolder);
      }
    }

    return (
      <form>
          <label>Name</label>
          <input className="u-full-width" type="text" value={folder.name} name="name" onChange={handleChange} />
          <button className="button-primary" type="submit" onClick={handleSubmit} >Add folder</button>
      </form>
    )
}

export default AddFolderForm;
