import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiTwitter, FiAward, FiUsers, FiClock } from 'react-icons/fi';

function Trainers() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Trainers' },
    { id: 'strength', name: 'Strength & Conditioning' },
    { id: 'cardio', name: 'Cardio & HIIT' },
    { id: 'yoga', name: 'Yoga & Flexibility' },
    { id: 'nutrition', name: 'Nutrition' },
  ];

  const trainers = [
    {
      id: 1,
      name: 'Alex Rivera',
      specialties: ['cardio', 'hiit'],
      title: 'Cardio & HIIT Specialist',
      bio: 'Former professional athlete with 10+ years of experience in high-intensity training. Alex specializes in cardio conditioning and HIIT workouts that maximize calorie burn and improve cardiovascular health.',
      experience: '10+ years',
      certifications: ['NASM Certified Personal Trainer', 'HIIT Specialist', 'TRX Certified'],
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop',
      social: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      },
      schedule: ['Monday', 'Wednesday', 'Friday'],
      rating: 4.9,
      reviewCount: 127
    },
    {
      id: 2,
      name: 'Maya Johnson',
      specialties: ['strength', 'nutrition'],
      title: 'Strength Coach & Nutritionist',
      bio: 'Maya combines strength training expertise with nutritional guidance to help clients achieve total body transformations. Her holistic approach focuses on sustainable lifestyle changes.',
      experience: '8 years',
      certifications: ['NSCA Strength & Conditioning Specialist', 'Precision Nutrition Level 2', 'Kettlebell Certification'],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
      social: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      },
      schedule: ['Tuesday', 'Thursday', 'Saturday'],
      rating: 4.8,
      reviewCount: 93
    },
    {
      id: 3,
      name: 'Sophia Chen',
      specialties: ['yoga', 'flexibility'],
      title: 'Yoga & Mindfulness Coach',
      bio: 'Sophia brings a decade of yoga practice and teaching to Fit Quest. Her classes focus on flexibility, balance, and mindfulness, helping clients reduce stress while improving physical strength.',
      experience: '10 years',
      certifications: ['500hr Registered Yoga Teacher', 'Meditation Instructor', 'Flexibility Specialist'],
      image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&h=500&fit=crop',
      social: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      },
      schedule: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      rating: 4.9,
      reviewCount: 156
    },
    {
      id: 4,
      name: 'James Wilson',
      specialties: ['strength', 'cardio'],
      title: 'Performance Coach',
      bio: 'With a background in competitive sports, James specializes in performance enhancement for athletes and fitness enthusiasts. His training combines strength, power, and conditioning elements.',
      experience: '12 years',
      certifications: ['CSCS Certified Strength & Conditioning Specialist', 'Performance Enhancement Specialist', 'Olympic Weightlifting Coach'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
      social: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      },
      schedule: ['Tuesday', 'Thursday', 'Saturday'],
      rating: 4.7,
      reviewCount: 88
    },
    {
      id: 5,
      name: 'Elena Rodriguez',
      specialties: ['cardio', 'dance'],
      title: 'Dance Fitness Instructor',
      bio: 'Elena brings energy and fun to every session with her background in professional dance. Her classes combine cardio, rhythm, and dance elements for an effective and enjoyable workout experience.',
      experience: '7 years',
      certifications: ['Zumba Certified Instructor', 'AFAA Group Fitness Instructor', 'Dance Fitness Specialist'],
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop',
      social: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      },
      schedule: ['Monday', 'Wednesday', 'Saturday'],
      rating: 4.9,
      reviewCount: 112
    },
    {
      id: 6,
      name: 'David Kim',
      specialties: ['strength', 'nutrition'],
      title: 'Body Transformation Specialist',
      bio: 'David specializes in complete body transformations through a combination of strategic strength training and personalized nutrition planning. His data-driven approach delivers consistent results.',
      experience: '9 years',
      certifications: ['NASM Certified Personal Trainer', 'Precision Nutrition Coach', 'Transformation Specialist'],
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
      social: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      },
      schedule: ['Tuesday', 'Thursday', 'Friday'],
      rating: 4.8,
      reviewCount: 76
    },
    {
      id: 7,
      name: 'Olivia Martinez',
      specialties: ['yoga', 'pilates'],
      title: 'Pilates & Core Specialist',
      bio: 'Olivia is an expert in Pilates and core conditioning. Her training focuses on building a strong foundation through proper alignment, breathing techniques, and controlled movements.',
      experience: '8 years',
      certifications: ['Comprehensive Pilates Certification', 'Core Specialist', 'Corrective Exercise Specialist'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
      social: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      },
      schedule: ['Monday', 'Wednesday', 'Friday'],
      rating: 4.9,
      reviewCount: 104
    },
    {
      id: 8,
      name: 'Michael Lee',
      specialties: ['cardio', 'martial-arts'],
      title: 'Martial Arts & Fitness Coach',
      bio: 'With a black belt in multiple martial arts disciplines, Michael combines combat sports with fitness training for a unique and effective workout experience that builds strength, agility, and confidence.',
      experience: '15 years',
      certifications: ['Multiple Black Belts', 'Kickboxing Instructor', 'Functional Training Specialist'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      social: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      },
      schedule: ['Tuesday', 'Thursday', 'Saturday'],
      rating: 4.8,
      reviewCount: 91
    }
  ];

  const filteredTrainers = activeFilter === 'all' 
    ? trainers 
    : trainers.filter(trainer => trainer.specialties.includes(activeFilter));

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
          {/* Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </motion.div>

          {/* Trainers Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredTrainers.map(trainer => (
              <motion.div
              key={trainer.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col" // Add flex and flex-col here
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex items-center">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mr-2">
                      {trainer.rating}★
                    </div>
                    <span className="text-white text-sm">({trainer.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow"> {/* Add flex, flex-col, and flex-grow here */}
                <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
                <p className="text-primary font-medium mb-3">{trainer.title}</p>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{trainer.bio}</p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiAward className="mr-1" />
                    {trainer.experience}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiUsers className="mr-1" />
                    {trainer.certifications.length} Certifications
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FiClock className="mr-2" />
                    Available Days
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.schedule.map((day, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto flex justify-between items-center"> {/* Add mt-auto here */}
                  <div className="flex space-x-3">
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={trainer.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      <FiInstagram size={18} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={trainer.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      <FiTwitter size={18} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={trainer.social.linkedin}
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
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Book Session
                  </motion.button>
                </div>
              </div>
            </motion.div>
            ))}
          </motion.div>
          
          {filteredTrainers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No trainers found in this category.</p>
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