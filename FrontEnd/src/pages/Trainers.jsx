import { useState ,useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiInstagram, 
  FiLinkedin, 
  FiTwitter, 
  FiAward, 
  FiUsers, 
  FiClock,
  FiMail,
  FiPhone,
  FiActivity,
  FiStar,
  FiCalendar
} from 'react-icons/fi';
import { getAllInstructors } from '../services/Admin/api';

function Trainers() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trainers, setTrainers] = useState([]);

  const filters = [
    { id: 'all', name: 'All Trainers' },
    { id: 'strength', name: 'Strength & Conditioning' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'yoga & flexibility', name: 'Yoga & Flexibility' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'dance', name: 'Dance' },
  ];

  const fetchTrainers = async () => {
    try {
      const response = await getAllInstructors();
      console.log('Trainers response:', response.instructors);
      setTrainers(response.instructors);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []); 

  const filteredTrainers = activeFilter === 'all' 
    ? trainers 
    : trainers.filter(trainer => trainer.title.toLowerCase().includes(activeFilter));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const searchedTrainers = filteredTrainers.filter(trainer => 
    trainer.fullName.toLowerCase().includes(searchQuery) ||
    trainer.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery)) ||
    trainer.email.toLowerCase().includes(searchQuery) ||
    trainer.phone.toLowerCase().includes(searchQuery)
  );

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
              Meet Our <span className="text-gradient">Expert Trainers</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our certified professionals are dedicated to helping you achieve your fitness goals with personalized guidance and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search trainers..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeFilter === filter.id 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trainers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchedTrainers.map((trainer, index) => (
              <motion.div
                key={trainer._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Trainer Image */}
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={trainer.image} 
                    alt={trainer.fullName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{trainer.rating}</span>
                    <span className="text-sm text-gray-600 ml-1">({trainer.reviewCount})</span>
                  </div> */}
                </div>

                {/* Trainer Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{trainer.fullName}</h3>
                    <p className="text-primary font-medium">{trainer.title}</p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMail className="mr-2" />
                      {trainer.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiPhone className="mr-2" />
                      {trainer.phone}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trainer.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        <FiActivity className="mr-1" />
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Experience & Certifications */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiAward className="mr-1" />
                      {/* {trainer.experience} */}
                      8 Year
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiUsers className="mr-1" />
                      {/* {trainer.certifications.length} Certifications */}
                      3 Certifications
                    </div>
                  </div>

                  {/* Classes */}
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <FiCalendar className="mr-2" />
                      Available Classes
                    </h4>
                    {/* <div className="space-y-2">
                      {trainer.classes.map((classItem, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700">{classItem.name}</span>
                          <span className="text-gray-500">{classItem.time} ({classItem.days})</span>
                        </div>
                      ))}
                    </div> */}
                  </div>

                  {/* Next Available */}
                  <div className="flex items-center justify-between mb-6">
                    {/* <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="mr-2" />
                      Next Available:
                    </div> */}
                    <span className="text-sm font-medium text-primary">
                      {trainer.nextAvailable}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors"
                      >
                        <FiInstagram size={18} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors"
                      >
                        <FiTwitter size={18} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors"
                      >
                        <FiLinkedin size={18} />
                      </motion.a>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Book Session
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {searchedTrainers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No trainers found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team Section */}
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
                    Join Our <span className="text-gradient">Team</span>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Are you a certified fitness professional passionate about transforming lives? 
                    We're always looking for talented trainers to join our team.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full mt-1 mr-3">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Competitive compensation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full mt-1 mr-3">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Flexible scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full mt-1 mr-3">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Professional development opportunities</span>
                    </li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
                  >
                    Apply Now
                  </motion.button>
                </motion.div>
              </div>
              <div className="md:w-1/2 relative min-h-[300px]">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop" 
                  alt="Join our team" 
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
              Book a free consultation with one of our expert trainers today!
            </p>
            <motion.button 
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Trainers;