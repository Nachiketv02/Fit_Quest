import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiClock, FiCalendar, FiUser, FiAward, FiHeart, FiActivity, FiTarget } from 'react-icons/fi';

function ElitePlan() {
  const features = [
    { 
      name: 'Access to gym facilities',
      description: '24/7 access to all our premium equipment and facilities',
      included: true 
    },
    { 
      name: 'All gym equipment',
      description: 'Full access to our state-of-the-art equipment',
      included: true 
    },
    { 
      name: 'Locker room access with towel service',
      description: 'Premium locker room amenities with daily fresh towels',
      included: true 
    },
    { 
      name: 'Unlimited group classes',
      description: 'Join any class, anytime with priority booking',
      included: true 
    },
    { 
      name: 'Monthly fitness assessment',
      description: 'Regular progress tracking with expert trainers',
      included: true 
    },
    { 
      name: '4 personal training sessions/month',
      description: 'One-on-one guidance from elite trainers',
      included: true 
    },
    { 
      name: 'Nutrition consultation',
      description: 'Personalized meal plans and nutrition advice',
      included: true 
    },
    { 
      name: 'Access to premium classes',
      description: 'Exclusive access to specialized training sessions',
      included: true 
    },
  ];

  const elitePerks = [
    {
      icon: FiAward,
      title: 'Priority Access',
      description: 'Get first access to new classes and equipment'
    },
    {
      icon: FiHeart,
      title: 'Recovery Zone',
      description: 'Access to spa and recovery facilities'
    },
    {
      icon: FiActivity,
      title: 'Performance Tracking',
      description: 'Advanced fitness metrics and analysis'
    },
    {
      icon: FiTarget,
      title: 'Goal Setting',
      description: 'Personalized workout programming'
    }
  ];

  const classes = [
    {
      name: 'Elite HIIT',
      time: 'Daily 6:00 AM',
      instructor: 'Alex Rivera',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop'
    },
    {
      name: 'Advanced Power Cycling',
      time: 'Mon, Wed, Fri 7:00 AM',
      instructor: 'Maya Johnson',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300&h=200&fit=crop'
    },
    {
      name: 'Olympic Weightlifting',
      time: 'Tue, Thu 6:00 PM',
      instructor: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=200&fit=crop'
    },
    {
      name: 'Advanced Yoga',
      time: 'Mon, Wed, Fri 8:00 PM',
      instructor: 'Sophia Chen',
      image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
            alt="Elite fitness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black/70" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-gradient">Elite</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience fitness excellence with our most comprehensive membership package
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/schedule"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                View Schedule
              </Link>
              <Link
                to="/subscription/elite/meal-plan"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                View Meal Plan
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Elite Perks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Elite Member Perks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enjoy exclusive benefits designed for peak performance and luxury comfort
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {elitePerks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <perk.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{perk.title}</h3>
                <p className="text-gray-600">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Elite Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for your fitness journey, and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <FiCheck className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">{feature.name}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Classes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Elite Classes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Exclusive access to our most advanced training sessions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((classItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={classItem.image} 
                    alt={classItem.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{classItem.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiClock className="mr-2" />
                      {classItem.time}
                    </div>
                    <div className="flex items-center">
                      <FiUser className="mr-2" />
                      {classItem.instructor}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Begin your elite fitness journey today and transform your life
            </p>
            <motion.button 
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Tour
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ElitePlan;