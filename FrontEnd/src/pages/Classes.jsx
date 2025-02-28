import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiCalendar, FiFilter, FiX } from 'react-icons/fi';

function Classes() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Classes' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'strength', name: 'Strength' },
    { id: 'yoga', name: 'Yoga & Flexibility' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'dance', name: 'Dance' },
  ];

  const classes = [
    {
      id: 1,
      name: 'Power Cycling',
      category: 'cardio',
      description: 'High-intensity indoor cycling class that simulates outdoor terrain with sprints, climbs, and intervals.',
      duration: '45 min',
      level: 'All Levels',
      instructor: 'Alex Rivera',
      instructorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&h=500&fit=crop',
      schedule: [
        { day: 'Monday', time: '6:00 AM, 5:30 PM' },
        { day: 'Wednesday', time: '6:00 AM, 5:30 PM' },
        { day: 'Friday', time: '6:00 AM, 5:30 PM' },
      ]
    },
    {
      id: 2,
      name: 'Total Body Strength',
      category: 'strength',
      description: 'Full-body workout using free weights, resistance bands, and bodyweight exercises to build strength and endurance.',
      duration: '60 min',
      level: 'Intermediate',
      instructor: 'Maya Johnson',
      instructorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=500&fit=crop',
      schedule: [
        { day: 'Tuesday', time: '7:00 AM, 6:30 PM' },
        { day: 'Thursday', time: '7:00 AM, 6:30 PM' },
        { day: 'Saturday', time: '9:00 AM' },
      ]
    },
    {
      id: 3,
      name: 'Vinyasa Flow Yoga',
      category: 'yoga',
      description: 'Dynamic yoga practice that synchronizes breath with a flowing sequence of postures for strength, flexibility, and mindfulness.',
      duration: '75 min',
      level: 'All Levels',
      instructor: 'Sophia Chen',
      instructorImage: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=500&fit=crop',
      schedule: [
        { day: 'Monday', time: '8:00 AM, 7:00 PM' },
        { day: 'Wednesday', time: '8:00 AM, 7:00 PM' },
        { day: 'Friday', time: '8:00 AM, 7:00 PM' },
        { day: 'Sunday', time: '10:00 AM' },
      ]
    },
    {
      id: 4,
      name: 'HIIT Circuit',
      category: 'hiit',
      description: 'High-intensity interval training that alternates between intense bursts of activity and fixed periods of less-intense activity or rest.',
      duration: '45 min',
      level: 'Intermediate/Advanced',
      instructor: 'James Wilson',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=500&fit=crop',
      schedule: [
        { day: 'Tuesday', time: '6:00 AM, 5:30 PM' },
        { day: 'Thursday', time: '6:00 AM, 5:30 PM' },
        { day: 'Saturday', time: '8:00 AM' },
      ]
    },
    {
      id: 5,
      name: 'Zumba',
      category: 'dance',
      description: 'Dance fitness program that combines Latin and international music with dance moves for a fun, calorie-burning workout.',
      duration: '60 min',
      level: 'All Levels',
      instructor: 'Elena Rodriguez',
      instructorImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=800&h=500&fit=crop',
      schedule: [
        { day: 'Monday', time: '7:00 PM' },
        { day: 'Wednesday', time: '7:00 PM' },
        { day: 'Saturday', time: '10:00 AM' },
      ]
    },
    {
      id: 6,
      name: 'Core & Abs',
      category: 'strength',
      description: 'Focused workout targeting the abdominal and back muscles to build core strength, stability, and definition.',
      duration: '30 min',
      level: 'All Levels',
      instructor: 'David Kim',
      instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
      schedule: [
        { day: 'Tuesday', time: '12:15 PM' },
        { day: 'Thursday', time: '12:15 PM' },
        { day: 'Friday', time: '12:15 PM' },
      ]
    },
    {
      id: 7,
      name: 'Pilates Reformer',
      category: 'yoga',
      description: 'Equipment-based Pilates that uses the reformer machine to provide resistance for a full-body workout focusing on core strength and flexibility.',
      duration: '55 min',
      level: 'All Levels',
      instructor: 'Olivia Martinez',
      instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=500&fit=crop',
      schedule: [
        { day: 'Monday', time: '9:00 AM, 6:00 PM' },
        { day: 'Wednesday', time: '9:00 AM, 6:00 PM' },
        { day: 'Friday', time: '9:00 AM' },
      ]
    },
    {
      id: 8,
      name: 'Kickboxing',
      category: 'cardio',
      description: 'High-energy workout combining martial arts techniques with fast-paced cardio for an intense full-body workout.',
      duration: '60 min',
      level: 'All Levels',
      instructor: 'Michael Lee',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&h=500&fit=crop',
      schedule: [
        { day: 'Tuesday', time: '5:30 PM' },
        { day: 'Thursday', time: '5:30 PM' },
        { day: 'Saturday', time: '11:00 AM' },
      ]
    }
  ];

  const filteredClasses = activeCategory === 'all' 
    ? classes 
    : classes.filter(c => c.category === activeCategory);

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
              Our <span className="text-gradient">Classes</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover a wide range of fitness classes designed to challenge, motivate, and transform your body and mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          activeCategory === category.id 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
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
                    {categories.map(category => (
                      <li key={category.id}>
                        <button
                          onClick={() => {
                            setActiveCategory(category.id);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeCategory === category.id 
                              ? 'bg-primary text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}

            {/* Classes Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {filteredClasses.map(classItem => (
                  <motion.div
                  key={classItem.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  {/* Image Section */}
                  <div className="h-48 w-full overflow-hidden relative">
                    <img 
                      src={classItem.image} 
                      alt={classItem.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-3 rounded-full text-sm font-medium">
                      {classItem.category.charAt(0).toUpperCase() + classItem.category.slice(1)}
                    </div>
                  </div>
                
                  {/* Card Content */}
                  <div className="p-6 flex flex-col h-full">
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                
                    {/* Description (Limited to 2 lines) */}
                    <p className="text-gray-600 mb-4 line-clamp-2">{classItem.description}</p>
                
                    {/* Instructor Section */}
                    <div className="flex items-center mb-4">
                      <img 
                        src={classItem.instructorImage} 
                        alt={classItem.instructor} 
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{classItem.instructor}</p>
                        <p className="text-xs text-gray-500">Instructor</p>
                      </div>
                    </div>
                
                    {/* Class Details */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600 gap-1">
                        <FiClock />
                        {classItem.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 gap-1">
                        <FiUser />
                        {classItem.level}
                      </div>
                    </div>
                
                    {/* Schedule */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FiCalendar />
                        Schedule
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {classItem.schedule.map((slot, index) => (
                          <li key={index} className="flex">
                            <span className="font-medium w-24">{slot.day}:</span>
                            <span className="text-gray-600">{slot.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                
                    {/* Book Button (Pushed to Bottom) */}
                    <button className="mt-auto w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                      Book Class
                    </button>
                  </div>
                </motion.div>
                
                ))}
              </motion.div>
              
              {filteredClasses.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No classes found in this category.</p>
                </div>
              )}
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
              Ready to Join a Class?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get unlimited access to all classes with our membership plans.
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

export default Classes;