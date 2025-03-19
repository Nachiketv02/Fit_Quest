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
    return response.data.instructor;
  } catch (error) {
    console.error('Error adding instructor:', error.response?.data || error.message);
    throw error;
  }
};

export const updateInstructor = async (id, instructorData) => {
  try {
    const response = await api.put(`/instructors/${id}`, instructorData);
    return response.data.instructor;
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

export const createTrainerRequest = async (trainerRequestData) => {
  try {
    const response = await api.post('/instructors/requests', trainerRequestData);
    return response.data.trainerRequest;
  } catch (error) {
    console.error('Error creating trainer request:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllTrainerRequests = async () => {
  try {
    const response = await api.get('/instructors/requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching trainer requests:', error.response?.data || error.message);
    throw error;
  }
};

export const approveTrainerRequest = async (id) => {
  try {
    const response = await api.post(`/instructors/requests/${id}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving trainer request:', error.response?.data || error.message);
    throw error;
  }
};

export const rejectTrainerRequest = async (id) => {
  try {
    const response = await api.post(`/instructors/requests/${id}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting trainer request:', error.response?.data || error.message);
    throw error;
  }
};

//classes

export const getAllInstructors = async () => {
  try {
    const response = await api.get('/instructors/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching instructors:', error);
    throw error;
  }
};

export const getClasses = async () => {
  try{
    const response = await api.get('/classes'); 
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch classes');
    }
  } catch(error){
    console.error('Error fetching classes:', error.response?.data || error.message);
    throw error;
  }
};

export const addClass = async (classData) => {
  try {
    const response = await api.post('/classes', classData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to add class');
    }
  } catch (error) {
    console.error('Error adding class:', error.response?.data || error.message);
    throw error;
  }
};

export const updateClass = async (id, classData) => {
  try {
    const response = await api.put(`/classes/${id}`, classData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update class');
    }
  } catch (error) {
    console.error('Error updating class:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteClass = async (id) => {
  try {
    await api.delete(`/classes/${id}`);
  } catch (error) {
    console.error('Error deleting class:', error.response?.data || error.message);
    throw error;
  }
};

//members

export const getAllMembers = async () => {
  try {
    const response = await api.get('/members');
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch members');
    }
  } catch (error) {
    console.error('Error fetching members:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteMember = async (id) => {
  try {
    await api.delete(`/members/${id}`);
  } catch (error) {
    console.error('Error deleting member:', error.response?.data || error.message);
    throw error;
  }
};
