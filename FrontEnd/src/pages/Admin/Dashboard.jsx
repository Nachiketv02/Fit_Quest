import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Calendar, Activity,
  PieChart, Menu, Clock, Dumbbell
} from 'lucide-react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

function Dashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sample data for dashboard
  const stats = [
    { id: 1, name: 'Total Members', value: '1,248', icon: Users, change: '+12%', color: 'bg-blue-500' },
    { id: 2, name: 'Class Attendance', value: '3,879', icon: Calendar, change: '+15%', color: 'bg-purple-500' },
    { id: 3, name: 'New Signups', value: '89', icon: Activity, change: '+23%', color: 'bg-orange-500' },
  ];

  const recentMembers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', plan: 'Premium', joinDate: '2023-05-15', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@example.com', plan: 'Elite', joinDate: '2023-05-14', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@example.com', plan: 'Basic', joinDate: '2023-05-12', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop' },
  ];

  const popularClasses = [
    { id: 1, name: 'Power Yoga', attendees: 450, trend: '+15%', icon: '🧘‍♀️' },
    { id: 2, name: 'HIIT Training', attendees: 380, trend: '+12%', icon: '💪' },
    { id: 3, name: 'Spinning', attendees: 320, trend: '+8%', icon: '🚲' },
    { id: 4, name: 'Zumba', attendees: 290, trend: '+5%', icon: '💃' },
  ];

  const todaysSchedule = [
    { id: 1, time: '06:00', class: 'Morning Yoga', instructor: 'Sarah Lee', status: 'In Progress' },
    { id: 2, time: '08:00', class: 'CrossFit', instructor: 'Mike Johnson', status: 'Upcoming' },
    { id: 3, time: '10:00', class: 'Pilates', instructor: 'Emma Davis', status: 'Upcoming' },
    { id: 4, time: '12:00', class: 'Boxing', instructor: 'James Wilson', status: 'Upcoming' },
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Popular Classes */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Popular Classes</h2>
                  <Dumbbell className="text-gray-400" size={20} />
                </div>
                <div className="space-y-4">
                  {popularClasses.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">{item.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.attendees} members</p>
                        </div>
                      </div>
                      <span className="text-green-500 text-sm font-medium">{item.trend}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Today's Schedule */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
                  <Clock className="text-gray-400" size={20} />
                </div>
                <div className="space-y-4">
                  {todaysSchedule.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 text-sm font-medium text-gray-600">{item.time}</div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.class}</h3>
                          <p className="text-sm text-gray-500">{item.instructor}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'In Progress' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Members */}
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Members</h2>
                  <PieChart className="text-gray-400" size={20} />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full" src={member.image} alt="" />
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
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {member.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.joinDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;