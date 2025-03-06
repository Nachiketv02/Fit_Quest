import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/fit-quest/admin`;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getInstructors = async (page = 1, limit = 5) => {
  try {
    const response = await api.get(`/instructors?page=${page}&limit=${limit}`);
    return response.data; // Includes instructors and pagination details
  } catch (error) {
    console.error('Error fetching instructors:', error);
    throw error;
  }
};

export const addInstructor = async (instructorData) => {
  try {
    const response = await api.post('/instructors', instructorData);
    return response.data;
  } catch (error) {
    console.error('Error adding instructor:', error.response?.data || error.message);
    throw error;
  }
};

export const updateInstructor = async (id, instructorData) => {
  try {
    const response = await api.put(`/instructors/${id}`, instructorData);
    return response.data;
  } catch (error) {
    console.error('Error updating instructor:', error);
    throw error;
  }
};

export const deleteInstructor = async (id) => {
  try {
    await api.delete(`/instructors/${id}`);
  } catch (error) {
    console.error('Error deleting instructor:', error);
    throw error;
  }
};

export const searchInstructors = async (q, page, limit) => {
  try {
    const response = await api.get(`/instructors/search?q=${q}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error searching instructors:', error);
    throw error;
  }
};
