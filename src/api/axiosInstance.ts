import axios from 'axios';

const userAxiosInstance = axios.create({
  baseURL: 'https://admin-panal-manoj-checking.vercel.app/api',
  withCredentials: true, 
});

export {userAxiosInstance};
