import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/fit-quest/admin`;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // For sending cookies (if using authentication)
});

// Fetch all instructors
// api.js
export const getInstructors = async () => {
    try {
      const response = await api.get('/instructors');
      return response.data.instructors;
    } catch (error) {
      console.error('Error fetching instructors:', error);
      throw error;
    }
  };

// Add a new instructor
export const addInstructor = async (instructorData) => {
  try {
    const response = await api.post('/instructors', instructorData);
    return response.data; // Ensure backend response contains `instructor`
  } catch (error) {
    console.error('Error adding instructor:', error.response?.data || error.message);
    throw error;
  }
};

// Update an instructor
export const updateInstructor = async (id, instructorData) => {
  try {
    const response = await api.put(`/instructors/${id}`, instructorData);
    return response.data;
  } catch (error) {
    console.error('Error updating instructor:', error);
    throw error;
  }
};

// Delete an instructor
export const deleteInstructor = async (id) => {
  try {
    await api.delete(`/instructors/${id}`);
  } catch (error) {
    console.error('Error deleting instructor:', error);
    throw error;
  }
};
