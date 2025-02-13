import axios from 'axios';

const userAxiosInstance = axios.create({
  baseURL: 'https://backend-template-six.vercel.app/app',
  withCredentials: true, 
});

export {userAxiosInstance};
