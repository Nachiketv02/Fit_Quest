import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/fit-quest/users`;


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const updateSubscription = async (data) => {
  try {
    const response = await api.put('/subscription', data);
    return response.data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};
