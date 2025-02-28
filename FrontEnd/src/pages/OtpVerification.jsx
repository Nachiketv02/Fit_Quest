import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserDataContext } from '../context/UserContext';

function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const userData = location.state?.userData || {};
  const maskedEmail = userData.email ? userData.email.replace(/(\w{3})[\w.-]+@([\w.]+)/, '$1***@$2') : 'your email';

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const countdown = setInterval(() => setTimer((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleInputChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.join('').length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setIsVerifying(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/fit-quest/users/verify`, { email: userData, verificationCode: Number(otp.join('')) });
      if (response.status === 200) {
        setUserData(response.data.user);
        localStorage.setItem('token', response.data.token);
        setIsVerified(true);
        setTimeout(() => navigate('/classes'), 1500);
      } else {
        setError(response.data.message);
      }
    } catch {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setTimer(60);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/fit-quest/users/resend`, { email: userData });
      toast.success('OTP resend successfully!', { position: 'top-right' });
      setOtp(Array(6).fill(''));
      setError('');
      inputRefs.current[0]?.focus();
    } catch {
      toast.error('Failed to resend OTP. Try again later.', { position: 'top-right' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {isVerified ? (
          <motion.div className="text-center py-8" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <motion.div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <FiCheck className="text-green-500 text-4xl" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Successful!</h2>
            <p className="text-gray-600">Redirecting to destination...</p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center">
              <button onClick={() => navigate('/signup')} className="p-2 rounded-full hover:bg-gray-100">
                <FiArrowLeft className="text-gray-600" />
              </button>
              <h2 className="text-center text-2xl font-bold text-gray-900 flex-1 pr-8">Verify Your Account</h2>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600">We've sent a verification code to {maskedEmail}</p>
              <div className="mt-8 flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C2B]"
                  />
                ))}
              </div>
              {error && <motion.p className="mt-4 text-red-500">{error}</motion.p>}
              <motion.button onClick={handleVerify} disabled={isVerifying || otp.includes('')} className="mt-8 w-full py-3 text-white bg-primary hover:bg-primary/90">
                {isVerifying ? 'Verifying...' : 'Verify & Continue'}
              </motion.button>
              <div className="mt-6 text-sm text-gray-600">
                {timer > 0 ? <p>Resend code in {timer}s</p> : <button onClick={handleResendOtp} className="text-primary">Resend verification code</button>}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default OtpVerification;
