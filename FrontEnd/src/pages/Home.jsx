import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiAward, FiClock, FiHeart, FiActivity } from 'react-icons/fi';

function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48')] bg-cover bg-fixed bg-center">
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">Transform Your</span><br />
              <span className="text-gradient">Body & Mind</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-200 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join the ultimate fitness experience at Fit Quest. Professional trainers, 
              state-of-the-art equipment, and a supportive community await you.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
              <motion.button 
                className="px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            {...fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">Fit Quest</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the perfect blend of professional guidance, cutting-edge equipment, 
              and a motivating atmosphere to achieve your fitness goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FiTarget,
                title: "Expert Training",
                description: "Personalized workout plans crafted by certified professionals"
              },
              {
                icon: FiHeart,
                title: "Supportive Community",
                description: "Join a family of motivated individuals on their fitness journey"
              },
              {
                icon: FiActivity,
                title: "Modern Equipment",
                description: "State-of-the-art facilities with the latest fitness technology"
              },
              {
                icon: FiUsers,
                title: "Group Classes",
                description: "Energetic group sessions for all fitness levels"
              },
              {
                icon: FiClock,
                title: "Flexible Hours",
                description: "Open 24/7 to fit your busy schedule"
              },
              {
                icon: FiAward,
                title: "Proven Results",
                description: "Thousands of success stories and transformations"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="text-primary text-4xl mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
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
              Join now and get 30% off your first month! Limited time offer.
            </p>
            <motion.button 
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Claim Your Offer
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;