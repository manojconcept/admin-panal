import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxiosInstance } from '../../../api/axiosInstance';
import { LoginPayload } from './types';
import jsVectorMap from 'jsvectormap';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await userAxiosInstance.post('/auth/login', payload);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAxiosInstance.post('/auth/refresh-token');
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await userAxiosInstance.post('/auth/logout');
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);


export const getCookie = createAsyncThunk(
  'auth/getcookie',
  async (_, { rejectWithValue }) => {
    try {
      await userAxiosInstance.post('/auth/getcookie');
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);