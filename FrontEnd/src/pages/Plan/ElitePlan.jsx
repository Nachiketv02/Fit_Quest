import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

function ElitePlan() {
  const features = [
    { name: 'Access to gym facilities', included: true },
    { name: 'All gym equipment', included: true },
    { name: 'Locker room access with towel service', included: true },
    { name: 'Unlimited group classes', included: true },
    { name: 'Monthly fitness assessment', included: true },
    { name: '4 personal training sessions/month', included: true },
    { name: 'Nutrition consultation', included: true },
    { name: 'Access to premium classes', included: true },
  ];

  const classes = [
    { name: 'Elite HIIT', time: 'Daily 6:00 AM' },
    { name: 'Advanced Power Cycling', time: 'Mon, Wed, Fri 7:00 AM' },
    { name: 'Olympic Weightlifting', time: 'Tue, Thu 6:00 PM' },
    { name: 'Advanced Yoga', time: 'Mon, Wed, Fri 8:00 PM' },
    { name: 'Boxing', time: 'Tue, Thu 7:00 PM' },
    { name: 'CrossFit', time: 'Daily 5:00 PM' },
  ];

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <section className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to Elite Membership</h1>
            <p className="text-xl opacity-90">Experience the ultimate in fitness luxury and performance</p>
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
            <h2 className="text-2xl font-bold mb-6">Your Elite Features</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3"
                >
                  <FiCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-800">{feature.name}</span>
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
            <h2 className="text-2xl font-bold mb-6">Elite Classes</h2>
            <div className="space-y-4">
              {classes.map((classItem, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-lg">{classItem.name}</h3>
                  <p className="text-gray-600">{classItem.time}</p>
                  <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Book Class
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Elite Services */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Elite Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="font-bold text-lg mb-2">Personal Training</h3>
              <p className="text-gray-600 mb-4">
                Schedule your 4 monthly sessions with our elite trainers
              </p>
              <div className="space-y-2">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Book Session
                </button>
                <button className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                  View Schedule
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="font-bold text-lg mb-2">Nutrition Consultation</h3>
              <p className="text-gray-600 mb-4">
                Get personalized nutrition advice from our experts
              </p>
              <div className="space-y-2">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Schedule Consultation
                </button>
                <button className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                  View Meal Plans
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="font-bold text-lg mb-2">Fitness Assessment</h3>
              <p className="text-gray-600 mb-4">
                Track your progress with monthly assessments
              </p>
              <div className="space-y-2">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Book Assessment
                </button>
                <button className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                  View Progress
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Additional Elite Benefits</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Priority Booking</h3>
              <p className="text-gray-600">Early access to class registration</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Guest Passes</h3>
              <p className="text-gray-600">Bring friends monthly</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Retail Discount</h3>
              <p className="text-gray-600">20% off gym store</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Spa Access</h3>
              <p className="text-gray-600">Complimentary spa services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElitePlan;