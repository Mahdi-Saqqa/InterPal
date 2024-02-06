import axios from 'axios';

// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',

    // You can include other headers here if needed
  },
});

// Set the JWT token in the Authorization header for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // Use encodeURIComponent to ensure the token is properly encoded
      const encodedToken = encodeURIComponent(token);
      config.headers.Authorization = `Bearer ${encodedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
