import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Fit Quest</h3>
            <p className="text-gray-300">Transform your body and mind with our expert training programs.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary">Home</Link></li>
              <li><Link to="/classes" className="text-gray-300 hover:text-primary">Classes</Link></li>
              <li><Link to="/trainers" className="text-gray-300 hover:text-primary">Trainers</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>123 Fitness Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@fitquest.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary"
              >
                <FiFacebook size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary"
              >
                <FiInstagram size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary"
              >
                <FiTwitter size={24} />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Fit Quest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;