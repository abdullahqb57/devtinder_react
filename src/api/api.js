import axios from 'axios';
import { BASE_URL } from '../utils/constants';
export const handleLogin = async ({email, password}) => {
    try {
      const {data} = await axios.post(`${BASE_URL}login`, {email, password}, { withCredentials: true});
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Rethrow the error to be caught by onError in useMutation
    }
}

export const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}logout`, {}, { withCredentials: true});
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
}

export const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}profile/view`, { withCredentials: true});
      return response;
    } catch (error) {
        return error.response.data || error.message;
    }
}

export default { handleLogin, handleLogout, fetchUser };