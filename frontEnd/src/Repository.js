import axios from 'axios'

const TASK_URL = 'http://localhost:8080/task/';
const FOLDER_URL = 'http://localhost:8080/folder';

class Repository {
  async getTasks() {
    const response = fetch(`http://localhost:8080/folder/all`);
    return response.json();
  }
}
