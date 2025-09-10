import axios from 'axios';

// Prefer env-configured base URL; fallback to localhost API
const baseURL = process.env.REACT_APP_API_BASE || 'http://localhost:5000/fullstack';

const api = axios.create({ baseURL });

// Attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


