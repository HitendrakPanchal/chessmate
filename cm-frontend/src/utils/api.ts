import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API base URL
  // timeout: 10000, // Optional: set a timeout for requests
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
