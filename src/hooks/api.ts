import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add JWT token from localStorage to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('hotelToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
