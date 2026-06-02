import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const TOKEN_KEY = 'authToken';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const getAuthToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore storage errors
  }
};

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

const normalizeError = (error) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    if (error.response?.status === 401) {
      setAuthToken(null);
    }
    return responseData || { message: error.message, status: error.response?.status };
  }
  return { message: error?.message || 'Unknown error' };
};

export const handleLogin = async ({ email, password }) => {
  try {
    const res = await api.post('login', { email, password });
    if (res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const handleLogout = async () => {
  try {
    setAuthToken(null);
    const response = await api.post('logout');
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const handleSignup = async ({ firstName, lastName, age, gender, email, password }) => {
  try {
    const response = await api.post('signup', { firstName, lastName, age, gender, email, password });
    if (response.data?.token) {
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get('profile/view');
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const fetchFeeds = async () => {
  try {
    const response = await api.get('feeds');
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.patch('profile/edit', profileData);
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const userConnections = async () => {
  try {
    const response = await api.get('user/connections');
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const userRequests = async () => {
  try {
    const response = await api.get('user/requests');
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const reviewConnectionRequest = async (status, toUserId) => {
  try {
    const response = await api.post(`request/review/${status}/${toUserId}`);
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const sendConnectionRequest = async (status, toUserId) => {
  try {
    const response = await api.post(`request/send/${status}/${toUserId}`);
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};

export const respondToConnectionRequest = async (requestId, action) => {
  try {
    const response = await api.post('connections/respond', { requestId, action });
    return response.data;
  } catch (error) {
    return normalizeError(error);
  }
};
