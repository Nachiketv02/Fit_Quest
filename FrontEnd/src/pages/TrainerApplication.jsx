import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiCalendar, 
  FiAward, 
  FiImage,
  FiArrowLeft,
  FiBriefcase
} from 'react-icons/fi';
import {createTrainerRequest} from '../services/Admin/api';
import { toast } from 'react-toastify';
import { UserDataContext } from "../context/UserContext";

function TrainerApplication() {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    title: '',
    email: userData.email,
    phone: userData.phone,
    specialties: [],
    image: '',
    experience: '',
    certifications: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transformedData = {
      ...formData,
      specialties: formData.specialties.split(',').map(s => s.trim())
    };
    try {
      await createTrainerRequest(transformedData);
      toast.success('Application submitted successfully!');
      navigate('/trainers');
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Take the first step towards an exciting career as a fitness professional. 
              Share your passion and expertise with our community.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-4xl md:text-4xl font-bold mb-6">
              <span className="text-gradient">Application Form</span>
            </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Shraddha Maheshwari"
                      disabled
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="" disabled>Select Title</option>
                      <option value="strength">Strength & Conditioning</option>
                      <option value="cardio">Cardio</option>
                      <option value="yoga & flexibility">Yoga & Flexibility</option>
                      <option value="hiit">HIIT</option>
                      <option value="dance">Dance</option>
                      <option value="nutrition">Nutrition</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="shradha.maheshwari@example.com"
                      disabled
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+91 9645873214"
                      disabled
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                  <div className="relative">
                    <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="specialties"
                      required
                      value={formData.specialties}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Yoga, Cardio, Nutrition"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                  <div className="relative">
                    <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      name="image"
                      required
                      value={formData.image}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="5 years of experience"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Certifications</label>
                  <div className="relative">
                    <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="certifications"
                      required
                      value={formData.certifications}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="2"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 mt-8">
                <motion.button
                  type="button"
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Submit Application
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default TrainerApplication;