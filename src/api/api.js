import axios from 'axios';
import { BASE_URL } from '../utils/constants';
export const handleLogin = async ({email, password}) => {
    try {
      const res = await axios.post(`${BASE_URL}login`, {email, password}, { withCredentials: true});
      return res.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
}

export const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}logout`, {}, { withCredentials: true });
      return response;
    } catch (error) {
      return error.response?.data || error.message;
    }
}

export const handleSignup = async ({firstName, lastName, age, gender, email, password}) => {
    try {
      const response = await axios.post(`${BASE_URL}signup`, {firstName, lastName, age, gender, email, password}, { withCredentials: true });
      return response.data;
    } catch (error) {      
      return error.response?.data || error.message;
    }
};

export const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}profile/view`, { withCredentials: true});
      return response;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export const fetchFeeds = async () => {
  try {
    const response = await axios.get(`${BASE_URL}feeds`, { withCredentials: true});
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.patch(`${BASE_URL}profile/edit`, profileData, { withCredentials: true});
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export const userConnections = async () => {
  try {
    const response = await axios.get(`${BASE_URL}user/connections`, { withCredentials: true});
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export const userRequests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}user/requests`, { withCredentials: true});
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export const reviewConnectionRequest = async (status, toUserId) => {
  try {    
    const response = await axios.post(`${BASE_URL}request/review/${status}/${toUserId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export const sendConnectionRequest = async (status, toUserId) => {
  try {
    const response = await axios.post(`${BASE_URL}request/send/${status}/${toUserId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export const respondToConnectionRequest = async (requestId, action) => {
  try {
    const response = await axios.post(`${BASE_URL}connections/respond`, { requestId, action }, { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}
