import { motion } from "framer-motion";
import {
  FiCheck,
  FiAward,
  FiUsers,
  FiHeart,
  FiClock,
  FiSmile,
} from "react-icons/fi";

function LearnMore() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const testimonials = [
    {
      name: "Nachiket Vaddoriya",
      role: "Member for 2 years",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQFp0Zvb0eyt6A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677232297720?e=1746057600&v=beta&t=H7iB-EwChd7zHX5LTql_noEHTBaEcuUOBW0IBYdKZX4",
      quote:
        "Fit Quest transformed my life. I've lost 30 pounds and gained so much confidence. The trainers are amazing and the community keeps me motivated every day.",
    },
    {
      name: "Aastha chaudhari",
      role: "Member for 3 years",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQEmJyAnhNZvFw/profile-displayphoto-shrink_800_800/B56ZPenK_JHoAc-/0/1734606631525?e=1746057600&v=beta&t=ZLB9_CjsudBH1TJYeZzp4AJtLZNnLDxOHr6CqOkb7rc",
      quote:
        "The personal training at Fit Quest is top-notch. My trainer understands my goals and pushes me just the right amount. I've never been stronger!",
    },
    {
      name: "Yash Gondaliya",
      role: "Member for 1 year",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGKL8TKT-o5Cg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1694844114789?e=1746057600&v=beta&t=HSxsflNLaXdYpmtRV3R-V41RgJTLCicyy5qUGEXDPKE",
      quote:
        "As a busy professional, I needed a gym that could accommodate my schedule. Fit Quest's 24/7 access and variety of classes have been perfect for my lifestyle.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                About <span className="text-gradient">Fit Quest</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Founded in 2022, Fit Quest has been on a mission to transform
                lives through fitness, wellness, and community. We believe that
                everyone deserves access to high-quality fitness facilities and
                expert guidance.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCheck className="text-primary mt-1 mr-3 text-xl" />
                  <p className="text-gray-300">
                    State-of-the-art facilities across 15 locations
                  </p>
                </div>
                <div className="flex items-start">
                  <FiCheck className="text-primary mt-1 mr-3 text-xl" />
                  <p className="text-gray-300">
                    Over 50 certified trainers with specialized expertise
                  </p>
                </div>
                <div className="flex items-start">
                  <FiCheck className="text-primary mt-1 mr-3 text-xl" />
                  <p className="text-gray-300">
                    More than 10,000 success stories and transformations
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="md:w-5/12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77"
                  alt="Fit Quest Gym"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <p className="text-white font-semibold">
                    Our flagship location in New York City
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Mission</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              At Fit Quest, we're committed to helping you achieve your fitness
              goals through personalized training, cutting-edge equipment, and a
              supportive community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FiHeart className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Holistic Wellness</h3>
              <p className="text-gray-600">
                We believe fitness is more than physical—it's mental and
                emotional too. Our approach integrates all aspects of wellness
                for complete transformation.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FiUsers className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Inclusive Community</h3>
              <p className="text-gray-600">
                Everyone is welcome at Fit Quest, regardless of fitness level or
                background. Our community supports and motivates each other on
                their fitness journeys.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FiAward className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence in Training</h3>
              <p className="text-gray-600">
                Our certified trainers stay at the forefront of fitness science,
                bringing you the most effective and safe training methods
                available.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits of Gym */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="text-4xl font-bold mb-4">
              Benefits of{" "}
              <span className="text-gradient">Regular Exercise</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Consistent training at Fit Quest delivers transformative benefits
              for your body and mind.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Increased Energy Levels",
                description:
                  "Regular exercise boosts your overall energy and reduces fatigue, helping you stay active throughout the day.",
                icon: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&h=350&fit=crop",
              },
              {
                title: "Improved Mental Health",
                description:
                  "Exercise releases endorphins that reduce stress, anxiety, and depression while improving overall mood.",
                icon: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=500&h=350&fit=crop",
              },
              {
                title: "Weight Management",
                description:
                  "Regular workouts help maintain a healthy weight by burning calories and building metabolism-boosting muscle.",
                icon: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=350&fit=crop",
              },
              {
                title: "Stronger Immune System",
                description:
                  "Consistent exercise strengthens your immune system, helping your body fight off illnesses more effectively.",
                icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=350&fit=crop",
              },
              {
                title: "Better Sleep Quality",
                description:
                  "Regular physical activity helps you fall asleep faster and enjoy deeper, more restful sleep.",
                icon: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=350&fit=crop",
              },
              {
                title: "Increased Strength & Endurance",
                description:
                  "Progressive training builds muscle strength and cardiovascular endurance for everyday activities.",
                icon: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=350&fit=crop",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={benefit.icon}
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="text-4xl font-bold mb-4">
              Success <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Hear from our members who have transformed their lives with Fit
              Quest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-8 shadow-md relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="h-full pt-10 text-center flex flex-col justify-between">
                  <p className="text-gray-600 italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
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

export default LearnMore;
