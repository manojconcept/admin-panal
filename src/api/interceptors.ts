import { userAxiosInstance } from './axiosInstance';
import store from '../app/store';
import { refreshToken,logout } from '../app/features/auth/authThunks';

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

const setupInterceptors = () => {
  // Request interceptor to add the access token to headers
  userAxiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().auth.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token refresh
  userAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newAccessToken = await store.dispatch(refreshToken()).unwrap();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry all failed requests
          failedRequestsQueue.forEach((prom) => prom.resolve(userAxiosInstance(originalRequest)));
          return userAxiosInstance(originalRequest);
        } catch (refreshError) {
          failedRequestsQueue.forEach((prom) => prom.reject(refreshError));
          store.dispatch(logout());
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
          failedRequestsQueue = [];
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;