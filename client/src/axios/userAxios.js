import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API = axios.create({ baseURL: 'http://localhost:8000' });

export const authenticate = createAsyncThunk(
  'authenticate',
  async (username) => {
    try {
      const response = await API.post('/api/authenticate', username);
      console.log(response.data, 'authenticated successfully');
      return response.status;
    } catch (error) {
      console.log({ error: error.message });
      return { error: "username doesn't exist" };
    }
  }
);

export const registerApi = createAsyncThunk('registerApi', async (post) => {
  try {
    const response = await API.post('/api/register', post);
    console.log(response.data.result);
    return response.data;
  } catch (error) {
    if (error.response.status === 409) {
      console.log('you are already registered');
    } else {
      console.log('error occurred while registering');
    }
  }
});

export const getUserDetails = createAsyncThunk(
  'getUserDetails',
  async (username) => {
    try {
      const response = await API.get(`/api/user/${username}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return { error: 'User Data Is Not In Data Collection' };
    }
  }
);

export const loginApi = createAsyncThunk(
  'loginApi',
  async ({ username, password }) => {
    console.log(username, password);
    try {
      const response = await API.post('/api/login', { username, password });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateUserToken = createAsyncThunk(
  'updateUserToken',
  async (updateCredentials) => {
    console.log(updateCredentials);
    try {
      let token = await JSON.parse(localStorage.getItem('token')).token;
      console.log(token, 'axios to server');
      const response = await API.put('/api/updateuser', updateCredentials, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const generateOTP = createAsyncThunk('generateOTP', async (username) => {
  console.log(username, 'axis');
  try {
    const {
      data: { code },
      status,
    } = await API.get('/api/generateOTP', {
      params: { username },
    });
    console.log(code, status);
    if (status === 200) {
      const {
        data: {
          data: { email },
        },
      } = await API.get(`/api/user/${username}`);
      console.log(email);
      let text = `Hi this is marudhupandiyan from your one of the buddyz list This is your ${code}`;
      let subject = 'marudhupandiyan sent to mail for OTP';
      const verifyResponse = await API.post('/api/registerEmail', {
        username,
        userEmail: email,
        text,
        subject,
      });
      console.log(verifyResponse);
      return { code: code, data: { username } };
    }
  } catch (error) {
    console.log(error.message);
  }
});

export const verifyOTP = createAsyncThunk(
  'verifyOTP',
  async (username, { code }) => {
    const response = await API.get('/api/verifyOTP', {
      params: username,
      code,
    });
    console.log(response.data);
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (username, password) => {
    console.log(username, password);
    try {
      const response = await API.put('/api/resetPassword', username, password);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);
