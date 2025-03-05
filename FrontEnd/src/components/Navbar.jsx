import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { UserDataContext } from "../context/UserContext"; 
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userData } = useContext(UserDataContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Classes", path: "/classes" },
    { name: "Trainers", path: "/trainers" },
    { name: "Membership", path: "/subscription" },
  ]; 

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/fit-quest/users/logout`, { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar-container ${scrolled ? "navbar-scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link to="/" className="navbar-brand">
                <span className="text-gradient">Fit</span>
                <span className="text-gradient-alt">Quest</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4 relative">
              {isAuthenticated ? (
                <div className="relative">
                  {/* Username Button */}
                  <motion.button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="auth-button login relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    Hi, {userData?.fullName || "User"}
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md border border-gray-200"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                      >
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiUser className="mr-2" />
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <FiLogOut className="mr-2" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link to="/login" className="auth-button login">
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link to="/signup" className="auth-button signup">
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden menu-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mobile-auth-buttons">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center auth-button login"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiUser className="mr-2" />
                      Profile
                    </Link>
                    <button
                      className="flex items-center auth-button login"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="auth-button login"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="auth-button signup"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
