import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiPlus, FiX, FiMapPin , FiCheck, FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

function AdminClasses() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    category: 'cardio',
    instructor: '',
    time: '',
    duration: '',
    capacity: '',
    room: '',
    description: ''
  });

  // Sample classes data
  const classesData = [
    {
      id: 1,
      name: 'Power Cycling',
      category: 'cardio',
      description: 'High-intensity indoor cycling class that simulates outdoor terrain with sprints, climbs, and intervals.',
      time: '06:00 - 06:45',
      days: ['Monday', 'Wednesday', 'Friday'],
      instructor: 'Alex Rivera',
      instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop',
      room: 'Studio A',
      capacity: 24,
      enrolled: 18
    },
    {
      id: 2,
      name: 'Total Body Strength',
      category: 'strength',
      description: 'Full-body workout using free weights, resistance bands, and bodyweight exercises to build strength and endurance.',
      time: '07:00 - 08:00',
      days: ['Tuesday', 'Thursday', 'Saturday'],
      instructor: 'Maya Johnson',
      instructorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop',
      room: 'Studio A',
      capacity: 20,
      enrolled: 16
    },
    {
      id: 3,
      name: 'Vinyasa Flow Yoga',
      category: 'yoga',
      description: 'Dynamic yoga practice that synchronizes breath with a flowing sequence of postures for strength, flexibility, and mindfulness.',
      time: '08:00 - 09:15',
      days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      instructor: 'Sophia Chen',
      instructorImage: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=50&h=50&fit=crop',
      room: 'Studio B',
      capacity: 20,
      enrolled: 15
    },
    {
      id: 4,
      name: 'HIIT Circuit',
      category: 'hiit',
      description: 'High-intensity interval training that alternates between intense bursts of activity and fixed periods of less-intense activity or rest.',
      time: '17:30 - 18:15',
      days: ['Tuesday', 'Thursday', 'Saturday'],
      instructor: 'James Wilson',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      room: 'Studio A',
      capacity: 18,
      enrolled: 12
    },
    {
      id: 5,
      name: 'Zumba',
      category: 'dance',
      description: 'Dance fitness program that combines Latin and international music with dance moves for a fun, calorie-burning workout.',
      time: '19:00 - 20:00',
      days: ['Monday', 'Wednesday', 'Saturday'],
      instructor: 'Elena Rodriguez',
      instructorImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop',
      room: 'Studio B',
      capacity: 30,
      enrolled: 25
    },
    {
      id: 6,
      name: 'Core & Abs',
      category: 'strength',
      description: 'Focused workout targeting the abdominal and back muscles to build core strength, stability, and definition.',
      time: '12:15 - 12:45',
      days: ['Tuesday', 'Thursday', 'Friday'],
      instructor: 'David Kim',
      instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
      room: 'Studio B',
      capacity: 25,
      enrolled: 15
    },
    {
      id: 7,
      name: 'Pilates Reformer',
      category: 'yoga',
      description: 'Equipment-based Pilates that uses the reformer machine to provide resistance for a full-body workout focusing on core strength and flexibility.',
      time: '09:00 - 09:55',
      days: ['Monday', 'Wednesday', 'Friday'],
      instructor: 'Olivia Martinez',
      instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      room: 'Studio C',
      capacity: 12,
      enrolled: 10
    },
    {
      id: 8,
      name: 'Kickboxing',
      category: 'cardio',
      description: 'High-energy workout combining martial arts techniques with fast-paced cardio for an intense full-body workout.',
      time: '18:30 - 19:30',
      days: ['Tuesday', 'Thursday', 'Saturday'],
      instructor: 'Michael Lee',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      room: 'Studio B',
      capacity: 20,
      enrolled: 15
    }
  ];

  // Filter and search classes
  const filteredClasses = classesData.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || classItem.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (classItem) => {
    setClassToDelete(classItem);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, you would delete the class from the database
    console.log(`Deleting class: ${classToDelete.id}`);
    setShowDeleteModal(false);
    setClassToDelete(null);
  };

  const handleAddClass = () => {
    // In a real app, you would add the class to the database
    console.log('Adding new class:', newClass);
    setShowAddModal(false);
    setNewClass({
      name: '',
      category: 'cardio',
      instructor: '',
      time: '',
      duration: '',
      capacity: '',
      room: '',
      description: ''
    });
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      cardio: 'bg-red-500',
      strength: 'bg-blue-500',
      yoga: 'bg-green-500',
      hiit: 'bg-purple-500',
      dance: 'bg-pink-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  // Get category text color
  const getCategoryTextColor = (category) => {
    const colors = {
      cardio: 'text-red-800 bg-red-100',
      strength: 'text-blue-800 bg-blue-100',
      yoga: 'text-green-800 bg-green-100',
      hiit: 'text-purple-800 bg-purple-100',
      dance: 'text-pink-800 bg-pink-100',
    };
    return colors[category] || 'text-gray-800 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for desktop */}
      <AdminSidebar isMobile={false} isOpen={true} />
      
      {/* Mobile Sidebar */}
      <AdminSidebar isMobile={true} isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Classes" 
          onMenuClick={() => setIsMobileSidebarOpen(true)} 
        />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
                  <p className="text-gray-600">Manage your gym classes</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <FiPlus className="mr-2" />
                  Add Class
                </motion.button>
              </div>
            </div>
            
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search classes..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFilter className="text-gray-400" />
                  </div>
                  <select
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="yoga">Yoga & Flexibility</option>
                    <option value="hiit">HIIT</option>
                    <option value="dance">Dance</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Classes Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrollment
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedClasses.map((classItem) => (
                      <tr key={classItem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div className={`w-3 h-3 rounded-full ${getCategoryColor(classItem.category)} mt-1.5 mr-3 flex-shrink-0`}></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{classItem.name}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span className={`px-2 py-0.5 rounded-full ${getCategoryTextColor(classItem.category)}`}>
                                  {classItem.category.charAt(0).toUpperCase() + classItem.category.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center">
                            <FiClock className="mr-1 text-gray-400" />
                            {classItem.time}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <FiCalendar className="mr-1 text-gray-400" />
                            {classItem.days.join(', ')}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <FiMapPin className="mr-1 text-gray-400" />
                            {classItem.room}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img 
                                className="h-8 w-8 rounded-full object-cover" 
                                src={classItem.instructorImage} 
                                alt={classItem.instructor} 
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{classItem.instructor}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900 mr-2">
                              {classItem.enrolled}/{classItem.capacity}
                            </span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`rounded-full h-2 ${
                                  (classItem.enrolled / classItem.capacity) > 0.8 
                                    ? 'bg-red-500' 
                                    : (classItem.enrolled / classItem.capacity) > 0.5 
                                      ? 'bg-yellow-500' 
                                      : 'bg-green-500'
                                }`} 
                                style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                            <FiEdit />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClick(classItem)}
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === totalPages 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(currentPage * itemsPerPage, filteredClasses.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredClasses.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <FiChevronLeft className="h-5 w-5" />
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border ${
                              currentPage === i + 1
                                ? 'z-10 bg-primary border-primary text-white'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            } text-sm font-medium`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <FiChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {classToDelete?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Class</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newClass.name}
                  onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter class name"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={newClass.category}
                  onChange={(e) => setNewClass({...newClass, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="yoga">Yoga & Flexibility</option>
                  <option value="hiit">HIIT</option>
                  <option value="dance">Dance</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor
                </label>
                <input
                  type="text"
                  id="instructor"
                  value={newClass.instructor}
                  onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter instructor name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    id="time"
                    value={newClass.time}
                    onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 06:00 - 06:45"
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={newClass.duration}
                    onChange={(e) => setNewClass({...newClass, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 45"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 20"
                  />
                </div>
                
                <div>
                  <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">
                    Room
                  </label>
                  <input
                    type="text"
                    id="room"
                    value={newClass.room}
                    onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Studio A"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  value={newClass.description}
                  onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter class description"
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleAddClass}
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <FiCheck className="mr-2" />
                  Add Class
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminClasses;