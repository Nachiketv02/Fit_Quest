import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiUser, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

function UserClasses() {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Sample data - In a real app, this would come from an API
  const bookedClasses = {
    upcoming: [
      {
        id: 1,
        name: 'Power Cycling',
        date: '2024-03-25',
        time: '06:00 - 06:45',
        instructor: {
          name: 'Alex Rivera',
          image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop'
        },
        room: 'Studio A',
        status: 'confirmed',
        category: 'cardio',
        remainingSpots: 6,
        totalSpots: 24
      },
      {
        id: 2,
        name: 'Vinyasa Flow Yoga',
        date: '2024-03-26',
        time: '08:00 - 09:15',
        instructor: {
          name: 'Sophia Chen',
          image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=50&h=50&fit=crop'
        },
        room: 'Studio B',
        status: 'waitlist',
        category: 'yoga',
        remainingSpots: 0,
        totalSpots: 20
      },
      {
        id: 3,
        name: 'HIIT Circuit',
        date: '2024-03-27',
        time: '17:30 - 18:15',
        instructor: {
          name: 'James Wilson',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
        },
        room: 'Studio A',
        status: 'confirmed',
        category: 'hiit',
        remainingSpots: 3,
        totalSpots: 18
      }
    ],
    past: [
      {
        id: 4,
        name: 'Total Body Strength',
        date: '2024-03-20',
        time: '07:00 - 08:00',
        instructor: {
          name: 'Maya Johnson',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop'
        },
        room: 'Studio A',
        status: 'completed',
        category: 'strength',
        rating: 5
      },
      {
        id: 5,
        name: 'Zumba',
        date: '2024-03-19',
        time: '19:00 - 20:00',
        instructor: {
          name: 'Elena Rodriguez',
          image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop'
        },
        room: 'Studio B',
        status: 'completed',
        category: 'dance',
        rating: 4
      }
    ],
    cancelled: [
      {
        id: 6,
        name: 'Core & Abs',
        date: '2024-03-22',
        time: '12:15 - 12:45',
        instructor: {
          name: 'David Kim',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
        },
        room: 'Studio B',
        status: 'cancelled',
        category: 'strength',
        cancellationReason: 'Instructor unavailable'
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      waitlist: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category) => {
    const colors = {
      cardio: 'bg-red-500',
      strength: 'bg-blue-500',
      yoga: 'bg-green-500',
      hiit: 'bg-purple-500',
      dance: 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderStarRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Classes</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Track and manage your booked classes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Classes</p>
                  <h3 className="text-2xl font-bold text-gray-900">{bookedClasses.upcoming.length}</h3>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FiCalendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Classes</p>
                  <h3 className="text-2xl font-bold text-gray-900">{bookedClasses.past.length}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiCheck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cancelled Classes</p>
                  <h3 className="text-2xl font-bold text-gray-900">{bookedClasses.cancelled.length}</h3>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiX className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {['upcoming', 'past', 'cancelled'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Class Cards */}
          <div className="space-y-6">
            {bookedClasses[activeTab].map((classItem) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(classItem.category)} mr-3`}></div>
                        <h2 className="text-xl font-bold text-gray-900 truncate">{classItem.name}</h2>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <span>{formatDate(classItem.date)}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(classItem.status)}`}>
                        {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiClock className="mr-2" />
                          Time
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{classItem.time}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiMapPin className="mr-2" />
                          Location
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{classItem.room}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiUser className="mr-2" />
                          Instructor
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                          <img
                            src={classItem.instructor.image}
                            alt={classItem.instructor.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          {classItem.instructor.name}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {classItem.status === 'completed' && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 mr-2">Your Rating:</span>
                        <div className="flex">{renderStarRating(classItem.rating)}</div>
                      </div>
                    </div>
                  )}

                  {classItem.status === 'cancelled' && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="flex items-center text-red-600">
                        <FiAlertCircle className="mr-2" />
                        <span className="text-sm">Reason: {classItem.cancellationReason}</span>
                      </div>
                    </div>
                  )}

                  {classItem.status === 'confirmed' && (
                    <div className="mt-6 border-t border-gray-200 pt-6 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {classItem.remainingSpots} spots remaining
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cancel Booking
                      </motion.button>
                    </div>
                  )}

                  {classItem.status === 'waitlist' && (
                    <div className="mt-6 border-t border-gray-200 pt-6 flex justify-between items-center">
                      <div className="text-sm text-yellow-600">
                        You are on the waitlist
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Leave Waitlist
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {bookedClasses[activeTab].length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCalendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Found</h3>
                <p className="text-gray-500">You don't have any {activeTab} classes.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserClasses;