// src/utils/api.ts
import axios from 'axios';
// import {storage} from './storage';
import {storage} from '../utils/Storage';

const api = axios.create({
  baseURL: 'https://your-backend-api.com',
});

api.interceptors.request.use(config => {
  const token = storage.getString('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
