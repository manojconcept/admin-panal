import axios from 'axios';

const userAxiosInstance = axios.create({
  baseURL: 'https://manoj-backend-tem.onrender.com/',
  withCredentials: true, 
});

export {userAxiosInstance};

