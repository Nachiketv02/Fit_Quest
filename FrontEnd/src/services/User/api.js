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
    console.error('Error updating subscription:', error.response?.data.message || error.message);
    throw error;
  }
};

export const bookClass = async (data) => {
  try {
    const response = await api.post('/book-class', data);
    return response.data;
  } catch (error) {
    console.error('Error booking class:', error.response?.data.message || error.message);
    throw error;
  }
};

export const cancelBooking = async (data) => {
  try {
    const response = await api.post('/cancel-class', data);
    return response.data;
  } catch (error) {
    console.error('Error canceling booking:', error.response?.data.message || error.message);
    throw error;
  }
};

export const cancelledclasses = async () => {
  try {
    const response = await api.get('/cancelled-classes');
    console.log(response.data);
    return response.data.classes;
  } catch (error) {
    console.error('Error getting cancelled classes:', error.response?.data.message || error.message);
    throw error;
  }
};

export const upcomingClasses = async () => {
  try {
    const response = await api.get('/upcoming-classes');
    return response.data.classes;
  } catch (error) {
    console.error('Error getting upcoming classes:', error.response?.data.message || error.message);
    throw error;
  }
};

export const pastClasses = async () => {
  try {
    const response = await api.get('/past-classes');
    return response.data.classes;
  } catch (error) {
    console.error('Error getting past classes:', error.response?.data.message || error.message);
    throw error;
  }
};