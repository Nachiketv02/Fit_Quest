import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Lock, User, Globe, Palette } from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'language', name: 'Language', icon: Globe },
  ];

  const notifications = [
    { id: 1, title: 'Email Notifications', description: 'Receive email updates about your account activity' },
    { id: 2, title: 'Push Notifications', description: 'Get push notifications on your mobile device' },
    { id: 3, title: 'SMS Notifications', description: 'Receive text messages for important updates' },
    { id: 4, title: 'Marketing Communications', description: 'Receive marketing updates and newsletters' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-8">
            <SettingsIcon className="h-6 w-6 text-gray-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-4">
              {/* Sidebar */}
              <div className="p-6 border-r border-gray-200">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="col-span-3 p-6">
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-lg font-medium text-gray-800 mb-6">Profile Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Picture
                        </label>
                        <div className="flex items-center">
                          <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                            alt="Profile"
                            className="h-16 w-16 rounded-full"
                          />
                          <button className="ml-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Change Photo
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-lg font-medium text-gray-800 mb-6">Notification Preferences</h2>
                    <div className="space-y-6">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h3 className="text-sm font-medium text-gray-800">{notification.title}</h3>
                            <p className="text-sm text-gray-500">{notification.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;