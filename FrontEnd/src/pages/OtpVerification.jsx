import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  
  // Get user data from location state
  const userData = location.state?.userData || {};
  const maskedEmail = userData.email ? 
    userData.email.replace(/(\w{3})[\w.-]+@([\w.]+)/, '$1***@$2') : 
    'your email';

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs[0].current?.focus();
    
    // Start countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (index, value) => {
    // Clear any previous errors
    setError('');
    
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty, focus previous input
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted content is a 4-digit number
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      
      // Focus last input
      inputRefs[3].current?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    
    // Validate OTP
    if (otpValue.length !== 4) {
      setError('Please enter all 4 digits');
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, any OTP is valid
      setIsVerified(true);
      
      // Redirect after successful verification
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Account created successfully! Please login with your credentials.' 
          } 
        });
      }, 1500);
      
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    // Reset timer
    setTimer(60);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear inputs
    setOtp(['', '', '', '']);
    setError('');
    
    // Focus first input
    inputRefs[0].current?.focus();
  };

  const handleGoBack = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
      >
        {isVerified ? (
          <motion.div 
            className="text-center py-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div 
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            >
              <FiCheck className="text-green-500 text-4xl" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Successful!</h2>
            <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
            <p className="text-gray-600">Redirecting to login page...</p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center">
              <button 
                onClick={handleGoBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiArrowLeft className="text-gray-600" />
              </button>
              <h2 className="text-center text-2xl font-bold text-gray-900 flex-1 pr-8">Verify Your Account</h2>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                We've sent a verification code to {maskedEmail}
              </p>
              
              <div className="mt-8">
                <div className="flex justify-center space-x-4">
                  {otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>
                
                {error && (
                  <motion.p 
                    className="mt-4 text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.p>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerify}
                  disabled={isVerifying || otp.some(digit => !digit)}
                  className={`mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                    ${isVerifying || otp.some(digit => !digit) ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'} 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors`}
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                </motion.button>
                
                <div className="mt-6 text-sm text-gray-600">
                  {timer > 0 ? (
                    <p>Resend code in <span className="font-medium">{timer}s</span></p>
                  ) : (
                    <button 
                      onClick={handleResendOtp}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Resend verification code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default OtpVerification;