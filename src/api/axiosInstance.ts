import axios from 'axios';

const userAxiosInstance = axios.create({
  baseURL: 'https://backend-template-six.vercel.app',
  withCredentials: true, 
});

export {userAxiosInstance};
