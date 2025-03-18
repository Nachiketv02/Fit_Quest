import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiClock, FiCalendar, FiUser, FiAward, FiHeart, FiActivity } from 'react-icons/fi';

function BasicPlan() {
  const features = [
    { 
      name: 'Access to gym facilities',
      description: 'Access to our state-of-the-art equipment during all operating hours',
      included: true 
    },
    { 
      name: 'Standard gym equipment',
      description: 'Full access to cardio machines and basic weight training equipment',
      included: true 
    },
    { 
      name: 'Locker room access',
      description: 'Access to clean and well-maintained locker rooms and shower facilities',
      included: true 
    },
    { 
      name: '2 group classes per month',
      description: 'Choose from our selection of basic fitness classes',
      included: true 
    },
    { 
      name: 'Fitness assessment',
      description: 'Professional evaluation of your fitness level and goals',
      included: false 
    },
    { 
      name: 'Personal training sessions',
      description: 'One-on-one guidance from certified trainers',
      included: false 
    },
    { 
      name: 'Nutrition consultation',
      description: 'Personalized nutrition advice and meal planning',
      included: false 
    },
    { 
      name: 'Access to premium classes',
      description: 'Access to specialized and advanced fitness classes',
      included: false 
    },
  ];

  const stats = [
    {
      icon: FiUser,
      value: '500+',
      label: 'Active Members',
      color: 'bg-blue-500'
    },
    {
      icon: FiHeart,
      value: '98%',
      label: 'Satisfaction Rate',
      color: 'bg-primary'
    },
    {
      icon: FiActivity,
      value: '20+',
      label: 'Weekly Classes',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
            alt="Basic fitness"
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
              Welcome to <span className="text-gradient">Basic</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Start your fitness journey with our foundational membership package
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/classes"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                View Schedule
              </Link>
              <Link
                to="/trainers"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                Meet Trainers
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 bg-opacity-10`}>
                  <stat.icon className={`w-8 h-8 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Your Plan <span className="text-gradient">Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to start your fitness journey
            </p>
          </motion.div>

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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      feature.included ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {feature.included ? (
                        <FiCheck className="w-5 h-5 text-green-500" />
                      ) : (
                        <FiX className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-semibold ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                      {feature.name}
                    </h3>
                    <p className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready for More?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Upgrade to Premium or Elite for additional features and benefits
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/subscription"
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Upgrade to Premium
              </Link>
              <Link
                to="/subscription"
                className="bg-white/10 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
              >
                View Elite Plan
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default BasicPlan;