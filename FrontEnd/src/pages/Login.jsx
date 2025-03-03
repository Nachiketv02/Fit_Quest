import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setUserData , setIsAuthenticated } = useContext(UserDataContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/fit-quest/users/login`, user , { headers: { "Content-Type": "application/json" } },{withCredentials:true});
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        setUserData(data);
        setIsAuthenticated(true);
        toast.success(response.data.message, { position: 'top-right' });
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          navigate('/learnmore');
        }, 2000);
      } else {
        toast.error(response.data.message, { position: 'top-right' });
      }
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Login failed! Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary/90">
              Sign up
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/90"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign in
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;