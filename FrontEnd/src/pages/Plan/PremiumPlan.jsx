import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

function PremiumPlan() {
  const features = [
    { name: 'Access to gym facilities', included: true },
    { name: 'All gym equipment', included: true },
    { name: 'Locker room access', included: true },
    { name: 'Unlimited group classes', included: true },
    { name: 'Quarterly fitness assessment', included: true },
    { name: '1 personal training session/month', included: true },
    { name: 'Nutrition consultation', included: false },
    { name: 'Access to premium classes', included: false },
  ];

  const classes = [
    { name: 'Advanced HIIT', time: 'Mon, Wed, Fri 7:00 AM' },
    { name: 'Power Cycling', time: 'Tue, Thu 6:30 AM' },
    { name: 'Strength Training', time: 'Mon, Wed, Fri 6:00 PM' },
    { name: 'Yoga Flow', time: 'Tue, Thu 7:00 PM' },
  ];

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to Your Premium Membership</h1>
            <p className="text-xl opacity-90">Unlock enhanced features and exclusive benefits</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Your Premium Features</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3"
                >
                  {feature.included ? (
                    <FiCheck className="text-green-500 flex-shrink-0" />
                  ) : (
                    <FiX className="text-gray-400 flex-shrink-0" />
                  )}
                  <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Available Classes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Premium Classes</h2>
            <div className="space-y-4">
              {classes.map((classItem, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-lg">{classItem.name}</h3>
                  <p className="text-gray-600">{classItem.time}</p>
                  <button className="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Book Class
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <h3 className="font-bold text-lg mb-2">Personal Training</h3>
            <p className="text-gray-600 mb-4">Schedule your monthly session</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Book Session
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <h3 className="font-bold text-lg mb-2">Fitness Assessment</h3>
            <p className="text-gray-600 mb-4">Track your progress</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Schedule Now
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <h3 className="font-bold text-lg mb-2">Class Schedule</h3>
            <p className="text-gray-600 mb-4">Browse available classes</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              View Schedule
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <h3 className="font-bold text-lg mb-2">Upgrade to Elite</h3>
            <p className="text-gray-600 mb-4">Get more exclusive benefits</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PremiumPlan;