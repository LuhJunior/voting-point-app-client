import axios from 'axios';

const api = axios.create({ 
  baseURL: 'localhost:8000',
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'X-Custom-Header',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE OPTIONS',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, err => Promise.reject(err));

return api;