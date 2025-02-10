import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7094/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'bearer ' + localStorage.getItem('token'),
  },
});

export default api;
