import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiDollarSign, FiActivity, FiBarChart2, FiPieChart, FiTrendingUp, FiMenu, FiX, FiLogOut, FiSettings, FiHome, FiUser, FiClock, FiClipboard } from 'react-icons/fi';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

function Dashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sample data for dashboard
  const stats = [
    { id: 1, name: 'Total Members', value: '1,248', icon: FiUsers, change: '+12%', color: 'bg-blue-500' },
    { id: 2, name: 'Monthly Revenue', value: '$48,295', icon: FiDollarSign, change: '+8%', color: 'bg-green-500' },
    { id: 3, name: 'Class Attendance', value: '3,879', icon: FiCalendar, change: '+15%', color: 'bg-purple-500' },
    { id: 4, name: 'New Signups', value: '89', icon: FiActivity, change: '+23%', color: 'bg-primary' },
  ];

  const recentMembers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', plan: 'Premium', joinDate: '2023-05-15', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@example.com', plan: 'Elite', joinDate: '2023-05-14', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@example.com', plan: 'Basic', joinDate: '2023-05-12', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop' },
    { id: 4, name: 'David Kim', email: 'david.k@example.com', plan: 'Premium', joinDate: '2023-05-10', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop' },
    { id: 5, name: 'Jessica Williams', email: 'jessica.w@example.com', plan: 'Basic', joinDate: '2023-05-08', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop' },
  ];

  const upcomingClasses = [
    { id: 1, name: 'Morning Power Cycling', time: '06:00 - 06:45', instructor: 'Alex Rivera', attendees: 18, capacity: 24 },
    { id: 2, name: 'Vinyasa Flow Yoga', time: '08:00 - 09:15', instructor: 'Sophia Chen', attendees: 15, capacity: 20 },
    { id: 3, name: 'Lunch Express HIIT', time: '12:15 - 12:45', instructor: 'James Wilson', attendees: 12, capacity: 18 },
    { id: 4, name: 'Total Body Strength', time: '17:30 - 18:30', instructor: 'Maya Johnson', attendees: 16, capacity: 20 },
    { id: 5, name: 'Zumba', time: '19:00 - 20:00', instructor: 'Elena Rodriguez', attendees: 25, capacity: 30 },
  ];

  // Monthly revenue data for chart
  const revenueData = [
    { month: 'Jan', amount: 38000 },
    { month: 'Feb', amount: 42000 },
    { month: 'Mar', amount: 45000 },
    { month: 'Apr', amount: 43000 },
    { month: 'May', amount: 48000 },
    { month: 'Jun', amount: 52000 },
  ];

  // Membership distribution data
  const membershipData = [
    { plan: 'Basic', percentage: 35, color: 'bg-blue-500' },
    { plan: 'Premium', percentage: 45, color: 'bg-primary' },
    { plan: 'Elite', percentage: 20, color: 'bg-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for desktop */}
      <AdminSidebar isMobile={false} isOpen={true} />
      
      {/* Mobile Sidebar */}
      <AdminSidebar isMobile={true} isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Dashboard" 
          onMenuClick={() => setIsMobileSidebarOpen(true)} 
        />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin</h1>
              <p className="text-gray-600">Here's what's happening with your gym today.</p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  className="bg-white rounded-xl shadow-md p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.id * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white`}>
                      <stat.icon size={20} />
                    </div>
                    <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-gray-600">{stat.name}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiBarChart2 className="mr-2" />
                    Last 6 months
                  </div>
                </div>
                
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {revenueData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center w-1/6">
                        <div 
                          className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                          style={{ height: `${(item.amount / 55000) * 100}%` }}
                        >
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-primary"
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-gray-600">{item.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                    <div className="text-xl font-bold text-gray-800">$268,000</div>
                  </div>
                  <div className="flex items-center text-green-500 text-sm font-medium">
                    <FiTrendingUp className="mr-1" />
                    +12.5% from last period
                  </div>
                </div>
              </motion.div>
              
              {/* Membership Distribution */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Membership Distribution</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiPieChart className="mr-2" />
                    Current period
                  </div>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <circle 
                        cx="18" cy="18" r="16" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        strokeWidth="4" 
                      />
                      
                      {/* Basic Plan - 35% */}
                      <motion.path
                        d="M18 2 A 16 16 0 0 1 33.8 20.1"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeDasharray="31.4 100"
                        strokeDashoffset="0"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1 }}
                      />
                      
                      {/* Premium Plan - 45% */}
                      <motion.path
                        d="M33.8 20.1 A 16 16 0 0 1 8.8 31.1"
                        fill="none"
                        stroke="#FF4C2B"
                        strokeWidth="4"
                        strokeDasharray="40.5 100"
                        strokeDashoffset="0"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                      
                      {/* Elite Plan - 20% */}
                      <motion.path
                        d="M8.8 31.1 A 16 16 0 0 1 18 2"
                        fill="none"
                        stroke="#9333ea"
                        strokeWidth="4"
                        strokeDasharray="18 100"
                        strokeDashoffset="0"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-gray-800">1,248</span>
                      <span className="text-sm text-gray-500">Total Members</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {membershipData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.plan}</span>
                          <span className="text-sm text-gray-500">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div 
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Members */}
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Members</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img 
                                  className="h-10 w-10 rounded-full object-cover" 
                                  src={member.image} 
                                  alt={member.name} 
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-500">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              member.plan === 'Elite' 
                                ? 'bg-purple-100 text-purple-800' 
                                : member.plan === 'Premium' 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'bg-blue-100 text-blue-800'
                            }`}>
                              {member.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(member.joinDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    View all members
                  </button>
                </div>
              </motion.div>
              
              {/* Upcoming Classes */}
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Today's Classes</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {upcomingClasses.map((classItem) => (
                        <tr key={classItem.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{classItem.name}</div>
                            <div className="text-sm text-gray-500">{classItem.instructor}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {classItem.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-900 mr-2">
                                {classItem.attendees}/{classItem.capacity}
                              </span>
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary rounded-full h-2" 
                                  style={{ width: `${(classItem.attendees / classItem.capacity) * 100}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    View full schedule
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;