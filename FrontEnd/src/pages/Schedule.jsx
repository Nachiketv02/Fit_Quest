import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiCalendar, FiClock, FiMapPin, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function Schedule() {
  const [activeDay, setActiveDay] = useState(getToday());
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  function getToday() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getDayName(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  function getShortDayName(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function getWeekDates(weekOffset = 0) {
    const result = [];
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Calculate the start of the week (Sunday)
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - currentDay + (weekOffset * 7));
    
    // Generate 7 days starting from the start date
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      result.push(date.toISOString().split('T')[0]);
    }
    
    return result;
  }

  const weekDates = getWeekDates(currentWeek);
  const isCurrentWeek = currentWeek === 0;

  const filters = [
    { id: 'all', name: 'All Classes' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'strength', name: 'Strength' },
    { id: 'yoga', name: 'Yoga & Flexibility' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'dance', name: 'Dance' },
  ];

  // Sample class schedule data
  const classSchedule = {
    // Monday
    [weekDates[1]]: [
      {
        id: 1,
        name: 'Morning Power Cycling',
        time: '06:00 - 06:45',
        category: 'cardio',
        instructor: 'Alex Rivera',
        instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'All Levels',
        capacity: 24,
        available: 8,
      },
      {
        id: 2,
        name: 'Vinyasa Flow Yoga',
        time: '08:00 - 09:15',
        category: 'yoga',
        instructor: 'Sophia Chen',
        instructorImage: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 20,
        available: 5,
      },
      {
        id: 3,
        name: 'Lunch Express HIIT',
        time: '12:15 - 12:45',
        category: 'hiit',
        instructor: 'James Wilson',
        instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'Intermediate',
        capacity: 18,
        available: 0,
      },
      {
        id: 4,
        name: 'Evening Power Cycling',
        time: '17:30 - 18:15',
        category: 'cardio',
        instructor: 'Alex Rivera',
        instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'All Levels',
        capacity: 24,
        available: 12,
      },
      {
        id: 5,
        name: 'Zumba',
        time: '19:00 - 20:00',
        category: 'dance',
        instructor: 'Elena Rodriguez',
        instructorImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 30,
        available: 15,
      },
    ],
    // Tuesday
    [weekDates[2]]: [
      {
        id: 6,
        name: 'Total Body Strength',
        time: '07:00 - 08:00',
        category: 'strength',
        instructor: 'Maya Johnson',
        instructorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'Intermediate',
        capacity: 20,
        available: 7,
      },
      {
        id: 7,
        name: 'Core & Abs',
        time: '12:15 - 12:45',
        category: 'strength',
        instructor: 'David Kim',
        instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 25,
        available: 10,
      },
      {
        id: 8,
        name: 'HIIT Circuit',
        time: '17:30 - 18:15',
        category: 'hiit',
        instructor: 'James Wilson',
        instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'Intermediate/Advanced',
        capacity: 18,
        available: 3,
      },
      {
        id: 9,
        name: 'Kickboxing',
        time: '18:30 - 19:30',
        category: 'cardio',
        instructor: 'Michael Lee',
        instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 20,
        available: 8,
      },
    ],
    // Wednesday
    [weekDates[3]]: [
      {
        id: 10,
        name: 'Morning Power Cycling',
        time: '06:00 - 06:45',
        category: 'cardio',
        instructor: 'Alex Rivera',
        instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'All Levels',
        capacity: 24,
        available: 10,
      },
      {
        id: 11,
        name: 'Vinyasa Flow Yoga',
        time: '08:00 - 09:15',
        category: 'yoga',
        instructor: 'Sophia Chen',
        instructorImage: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 20,
        available: 7,
      },
      {
        id: 12,
        name: 'Pilates Reformer',
        time: '09:00 - 09:55',
        category: 'yoga',
        instructor: 'Olivia Martinez',
        instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
        room: 'Studio C',
        level: 'All Levels',
        capacity: 12,
        available: 2,
      },
      {
        id: 13,
        name: 'Lunch Express HIIT',
        time: '12:15 - 12:45',
        category: 'hiit',
        instructor: 'James Wilson',
        instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'Intermediate',
        capacity: 18,
        available: 5,
      },
      {
        id: 14,
        name: 'Evening Power Cycling',
        time: '17:30 - 18:15',
        category: 'cardio',
        instructor: 'Alex Rivera',
        instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'All Levels',
        capacity: 24,
        available: 15,
      },
      {
        id: 15,
        name: 'Zumba',
        time: '19:00 - 20:00',
        category: 'dance',
        instructor: 'Elena Rodriguez',
        instructorImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 30,
        available: 18,
      },
    ],
    // Thursday
    [weekDates[4]]: [
      {
        id: 16,
        name: 'Total Body Strength',
        time: '07:00 - 08:00',
        category: 'strength',
        instructor: 'Maya Johnson',
        instructorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'Intermediate',
        capacity: 20,
        available: 9,
      },
      {
        id: 17,
        name: 'Core & Abs',
        time: '12:15 - 12:45',
        category: 'strength',
        instructor: 'David Kim',
        instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 25,
        available: 12,
      },
      {
        id: 18,
        name: 'HIIT Circuit',
        time: '17:30 - 18:15',
        category: 'hiit',
        instructor: 'James Wilson',
        instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'Intermediate/Advanced',
        capacity: 18,
        available: 0,
      },
      {
        id: 19,
        name: 'Kickboxing',
        time: '18:30 - 19:30',
        category: 'cardio',
        instructor: 'Michael Lee',
        instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 20,
        available: 5,
      },
    ],
    // Friday
    [weekDates[5]]: [
      {
        id: 20,
        name: 'Morning Power Cycling',
        time: '06:00 - 06:45',
        category: 'cardio',
        instructor: 'Alex Rivera',
        instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'All Levels',
        capacity: 24,
        available: 14,
      },
      {
        id: 21,
        name: 'Vinyasa Flow Yoga',
        time: '08:00 - 09:15',
        category: 'yoga',
        instructor: 'Sophia Chen',
        instructorImage: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 20,
        available: 8,
      },
      {
        id: 22,
        name: 'Core & Abs',
        time: '12:15 - 12:45',
        category: 'strength',
        instructor: 'David Kim',
        instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 25,
        available: 15,
      },
      {
        id: 23,
        name: 'Evening Power Cycling',
        time: '17:30 - 18:15',
        category: 'cardio',
        instructor: 'Alex Rivera',
        instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'All Levels',
        capacity: 24,
        available: 10,
      },
    ],
    // Saturday
    [weekDates[6]]: [
      {
        id: 24,
        name: 'Total Body Strength',
        time: '09:00 - 10:00',
        category: 'strength',
        instructor: 'Maya Johnson',
        instructorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'All Levels',
        capacity: 20,
        available: 5,
      },
      {
        id: 25,
        name: 'HIIT Circuit',
        time: '10:30 - 11:15',
        category: 'hiit',
        instructor: 'James Wilson',
        instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        room: 'Studio A',
        level: 'Intermediate',
        capacity: 18,
        available: 3,
      },
      {
        id: 26,
        name: 'Zumba',
        time: '11:30 - 12:30',
        category: 'dance',
        instructor: 'Elena Rodriguez',
        instructorImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 30,
        available: 12,
      },
      {
        id: 27,
        name: 'Kickboxing',
        time: '13:00 - 14:00',
        category: 'cardio',
        instructor: 'Michael Lee',
        instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 20,
        available: 7,
      },
    ],
    // Sunday
    [weekDates[0]]: [
      {
        id: 28,
        name: 'Vinyasa Flow Yoga',
        time: '10:00 - 11:15',
        category: 'yoga',
        instructor: 'Sophia Chen',
        instructorImage: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=50&h=50&fit=crop',
        room: 'Studio B',
        level: 'All Levels',
        capacity: 20,
        available: 9,
      },
      {
        id: 29,
        name: 'Pilates Reformer',
        time: '11:30 - 12:25',
        category: 'yoga',
        instructor: 'Olivia Martinez',
        instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
        room: 'Studio C',
        level: 'All Levels',
        capacity: 12,
        available: 4,
      },
    ],
  };

  // Get classes for the selected day
  const dayClasses = classSchedule[activeDay] || [];
  
  // Filter classes based on selected category
  const filteredClasses = activeFilter === 'all' 
    ? dayClasses 
    : dayClasses.filter(c => c.category === activeFilter);

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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
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
              Class <span className="text-gradient">Schedule</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Plan your week with our comprehensive class schedule. Find the perfect class for your fitness goals and book your spot today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Calendar Navigation */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentWeek(currentWeek - 1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FiChevronLeft className="text-gray-700" />
              </motion.button>
              
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {new Date(weekDates[0]).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                {isCurrentWeek ? (
                  <span className="text-sm text-gray-500">Current Week</span>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentWeek(0)}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    Today
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentWeek(currentWeek + 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <FiChevronRight className="text-gray-700" />
                </motion.button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, index) => {
                const isToday = date === getToday();
                const isActive = date === activeDay;
                
                return (
                  <motion.button
                    key={date}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveDay(date)}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : isToday
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xs font-medium">{getShortDayName(date)}</span>
                    <span className={`text-lg font-bold ${isActive ? 'text-white' : ''}`}>
                      {getFormattedDate(date)}
                    </span>
                    {isToday && !isActive && (
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary"></span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-6">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-white py-3 px-4 rounded-lg shadow-md text-gray-700"
            >
              <FiFilter />
              <span>Filter Classes</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <motion.div 
              className="hidden md:block md:w-1/4 lg:w-1/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Class Categories</h3>
                <ul className="space-y-2">
                  {filters.map(filter => (
                    <li key={filter.id}>
                      <button
                        onClick={() => setActiveFilter(filter.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          activeFilter === filter.id 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {filter.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Filters - Mobile */}
            {showFilters && (
              <motion.div 
                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-white rounded-xl w-full max-w-sm p-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Class Categories</h3>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <FiX />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {filters.map(filter => (
                      <li key={filter.id}>
                        <button
                          onClick={() => {
                            setActiveFilter(filter.id);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeFilter === filter.id 
                              ? 'bg-primary text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {filter.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}

            {/* Classes List */}
            <div className="md:w-3/4 lg:w-4/5">
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {getDayName(activeDay)}
                  </h2>
                  <p className="text-gray-600">
                    {filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'} scheduled
                  </p>
                </div>
                
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((classItem) => (
                    <motion.div
                      key={classItem.id}
                      className="bg-white rounded-xl shadow-md mb-4 overflow-hidden"
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/4 bg-gray-50 p-6 flex flex-col justify-center items-center text-center">
                          <div className={`w-3 h-3 rounded-full ${getCategoryColor(classItem.category)} mb-2`}></div>
                          <h3 className="text-xl font-bold mb-1">{classItem.time}</h3>
                          <p className="text-gray-500 capitalize">{classItem.category}</p>
                        </div>
                        
                        <div className="md:w-3/4 p-6">
                          <div className="md:flex justify-between">
                            <div>
                              <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                              
                              <div className="flex flex-wrap gap-4 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                  <FiUser className="mr-1" />
                                  {classItem.instructor}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <FiMapPin className="mr-1" />
                                  {classItem.room}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <FiClock className="mr-1" />
                                  {classItem.level}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex flex-col items-end">
                              <div className="text-sm text-gray-600 mb-2">
                                {classItem.available} spots available
                              </div>
                              <div className="w-36 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${(classItem.available / classItem.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              classItem.available > 0
                                ? 'bg-primary text-white hover:bg-primary/90'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={classItem.available === 0}
                          >
                            {classItem.available > 0 ? 'Book Class' : 'Class Full'}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-xl shadow-md">
                    <p className="text-gray-500 text-lg">No classes found for this day and filter.</p>
                    <button 
                      onClick={() => setActiveFilter('all')}
                      className="mt-4 text-primary hover:text-primary/80 font-medium"
                    >
                      View all classes
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Schedule Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Get Our <span className="text-gradient">Schedule</span>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Download our complete class schedule to plan your workouts in advance. 
                    Never miss a class with our convenient calendar integration.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download PDF
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary/20 text-white border border-primary/40 px-6 py-3 rounded-full font-semibold hover:bg-primary/30 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Add to Calendar
                    </motion.button>
                  </div>
                </motion.div>
              </div>
              <div className="md:w-1/2 relative min-h-[300px]">
                <img 
                  src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&h=600&fit=crop" 
                  alt="Fitness schedule" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join now and get access to all our classes with our membership plans.
            </p>
            <motion.button 
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Membership Plans
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Schedule;