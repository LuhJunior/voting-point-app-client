import axios from 'axios';
import { serverUrl } from '../utils/constants';

const api = axios.create({
  baseURL: serverUrl,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'X-Custom-Header',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE OPTIONS',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('@user_token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, err => Promise.reject(err));

export default api;