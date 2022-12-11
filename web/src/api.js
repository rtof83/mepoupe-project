import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://18.234.224.108:3001/'
  baseURL: 'http://localhost:3001/'
});

export default api;
