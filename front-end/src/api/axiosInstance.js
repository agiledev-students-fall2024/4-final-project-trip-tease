import axios from 'axios';
import { API_URL } from '../config.js';


// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: `${API_URL}`, // Backend API base URL
});

/* 
  Interceptor for attaching Authorization headers:
  - Includes JWT token for all requests.
*/
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
