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
