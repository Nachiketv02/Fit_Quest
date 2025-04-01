import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiMail, FiPhone, FiCalendar, FiMapPin, FiUser, FiLock, FiActivity, FiAward } from 'react-icons/fi';

function Profile() {
  // Sample user data - In a real app, this would come from your backend
  const [userData, setUserData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    joinDate: '2024-01-15',
    address: '123 Fitness Street, New York, NY 10001',
    membershipType: 'Premium',
    membershipStatus: 'Active',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    stats: {
      classesAttended: 45,
      upcomingClasses: 3,
      achievements: 8
    },
    recentAchievements: [
      {
        id: 1,
        name: 'Consistency Champion',
        description: 'Attended 10 classes in a row',
        date: '2024-03-15',
        icon: '🏆'
      },
      {
        id: 2,
        name: 'Early Bird',
        description: 'Attended 5 morning classes',
        date: '2024-03-10',
        icon: '🌅'
      },
      {
        id: 3,
        name: 'Strength Master',
        description: 'Completed all strength training goals',
        date: '2024-03-05',
        icon: '💪'
      }
    ],
    fitnessGoals: [
      {
        id: 1,
        goal: 'Weight Loss',
        target: 'Lose 10 lbs',
        progress: 60,
        startDate: '2024-01-20',
        endDate: '2024-04-20'
      },
      {
        id: 2,
        goal: 'Strength Training',
        target: 'Increase bench press by 20 lbs',
        progress: 75,
        startDate: '2024-02-01',
        endDate: '2024-05-01'
      },
      {
        id: 3,
        goal: 'Cardio Endurance',
        target: 'Run 5k under 25 minutes',
        progress: 40,
        startDate: '2024-02-15',
        endDate: '2024-05-15'
      }
    ],
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsReminders: false,
      language: 'English',
      timezone: 'EST'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <motion.div 
              className="md:flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                My <span className="text-gradient">Profile</span>
              </h1>
              <p className="text-xl text-gray-300">
                Manage your account and track your fitness journey
              </p>
            </motion.div>
            <motion.div 
              className="mt-8 md:mt-0 md:ml-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src={userData.profileImage}
                  alt={userData.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg">
                  <FiEdit2 size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Information */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 mb-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary hover:text-primary/80"
                  >
                    <FiEdit2 size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-2" />
                        <span>{userData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-2" />
                        <span>{userData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedData.phone}
                        onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiPhone className="text-gray-400 mr-2" />
                        <span>{userData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.address}
                        onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiMapPin className="text-gray-400 mr-2" />
                        <span>{userData.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Membership Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 mb-8"
              >
                <h2 className="text-2xl font-bold mb-6">Membership Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Membership Type
                    </label>
                    <div className="flex items-center">
                      <FiAward className="text-primary mr-2" />
                      <span className="font-medium">{userData.membershipType}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {userData.membershipStatus}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Join Date
                    </label>
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-400 mr-2" />
                      <span>{formatDate(userData.joinDate)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fitness Goals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Fitness Goals</h2>
                <div className="space-y-6">
                  {userData.fitnessGoals.map((goal) => (
                    <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{goal.goal}</h3>
                          <p className="text-gray-600">{goal.target}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(goal.startDate)} - {formatDate(goal.endDate)}
                        </span>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-primary">
                              {goal.progress}% Complete
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                          <div
                            style={{ width: `${goal.progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Stats & Achievements */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FiActivity className="text-primary" />
                      </div>
                      <span className="ml-3">Classes Attended</span>
                    </div>
                    <span className="text-2xl font-bold">{userData.stats.classesAttended}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiCalendar className="text-blue-600" />
                      </div>
                      <span className="ml-3">Upcoming Classes</span>
                    </div>
                    <span className="text-2xl font-bold">{userData.stats.upcomingClasses}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <FiAward className="text-yellow-600" />
                      </div>
                      <span className="ml-3">Achievements</span>
                    </div>
                    <span className="text-2xl font-bold">{userData.stats.achievements}</span>
                  </div>
                </div>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
                <div className="space-y-4">
                  {userData.recentAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="text-2xl mr-4">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(achievement.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Account Settings */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Account Settings</h2>
                  <button className="text-primary hover:text-primary/80">
                    <FiLock size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userData.preferences.emailUpdates}
                        className="sr-only peer"
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS Reminders</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userData.preferences.smsReminders}
                        className="sr-only peer"
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;