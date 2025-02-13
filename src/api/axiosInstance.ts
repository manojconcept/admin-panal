import axios from 'axios';

const userAxiosInstance = axios.create({
  baseURL: 'https://manoj-backend-tem.onrender.com/api',
  withCredentials: true, 
});

export {userAxiosInstance};

