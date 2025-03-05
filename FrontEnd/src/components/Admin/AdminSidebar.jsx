import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiUsers, FiCalendar, FiDollarSign, FiSettings, FiLogOut, FiX, FiBarChart2, FiUserCheck } from 'react-icons/fi';

function AdminSidebar({ isMobile, isOpen, onClose }) {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/admin/dashboard' },
    { name: 'Members', icon: FiUsers, path: '/admin/members' },
    { name: 'Classes', icon: FiCalendar, path: '/admin/classes' },
    { name: 'Subscriptions', icon: FiDollarSign, path: '/admin/subscriptions' },
    { name: 'Reports', icon: FiBarChart2, path: '/admin/reports' },
    { name: 'Instructors', icon: FiUserCheck, path: '/admin/instructors' },
    { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link to="/admin/dashboard" className="flex items-center">
          <span className="text-gradient font-bold text-xl">Fit</span>
          <span className="text-gradient-alt font-bold text-xl">Quest</span>
          <span className="ml-2 text-gray-600 font-medium">Admin</span>
        </Link>
        {isMobile && (
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
      
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="mr-3" size={20} />
              <span>{item.name}</span>
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200">
        <Link
          to="/"
          className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <FiLogOut className="mr-3" size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );
  
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
        )}
        <motion.div
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 flex flex-col"
          initial={{ x: '-100%' }}
          animate={{ x: isOpen ? 0 : '-100%' }}
          transition={{ duration: 0.3 }}
        >
          {sidebarContent}
        </motion.div>
      </>
    );
  }
  
  return (
    <div className="hidden md:flex md:w-64 bg-white shadow-lg flex-col">
      {sidebarContent}
    </div>
  );
}

export default AdminSidebar;
