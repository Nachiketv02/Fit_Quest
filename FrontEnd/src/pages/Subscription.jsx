import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiHelpCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateSubscription } from '../services/User/api';
import { UserDataContext } from "../context/UserContext"; 
import { useContext } from 'react';

function Subscription() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);

  const { userData , setUserData} = useContext(UserDataContext);

  const navigate = useNavigate();

  const handleConfirmPurchase = async () => {
    if (!selectedPlan) {
      toast.error('Please select a plan');
      return;
    }
    try {
      const response = await updateSubscription({ plan: selectedPlan, billingCycle });
      if (response.message === 'Subscription successful') {
        toast.success('Subscription successful!');
        const updatedUserData = {
          ...userData,
          subscription: response.subscription.plan,
          isSubscribed: response.subscription.isSubscribed,
          subscriptionStatus: response.subscription.status,
          subscriptionStartDate: response.subscription.startDate,
          subscriptionEndDate: response.subscription.endDate,
          billingCycle: response.subscription.billingCycle,
        };
        setUserData(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setCurrentPlan(response.subscription.plan);
        if(response.subscription.plan === 'basic'){
          navigate('/subscription/basic');
        }
        else if(response.subscription.plan === 'premium'){
          navigate('/subscription/premium');
        }
        else if(response.subscription.plan === 'elite'){
          navigate('/subscription/elite');
        }
      } else {
        toast.error('Failed to select subscription plan');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const plans = {
    monthly: [
      {
        id: 'basic',
        name: 'Basic',
        price: 499,
        description: 'Perfect for beginners starting their fitness journey',
        features: [
          { text: 'Access to gym facilities', included: true },
          { text: 'Standard gym equipment', included: true },
          { text: 'Locker room access', included: true },
          { text: '2 group classes per month', included: true },
          { text: 'Fitness assessment', included: false },
          { text: 'Personal training sessions', included: false },
          { text: 'Nutrition consultation', included: false },
          { text: 'Access to premium classes', included: false },
        ],
        popular: false,
        color: 'bg-blue-500',
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 999,
        description: 'Our most popular plan for fitness enthusiasts',
        features: [
          { text: 'Access to gym facilities', included: true },
          { text: 'All gym equipment', included: true },
          { text: 'Locker room access', included: true },
          { text: 'Unlimited group classes', included: true },
          { text: 'Quarterly fitness assessment', included: true },
          { text: '1 personal training session/month', included: true },
          { text: 'Nutrition consultation', included: false },
          { text: 'Access to premium classes', included: false },
        ],
        popular: true,
        color: 'bg-primary',
      },
      {
        id: 'elite',
        name: 'Elite',
        price: 1499,
        description: 'Comprehensive plan for serious fitness goals',
        features: [
          { text: 'Access to gym facilities', included: true },
          { text: 'All gym equipment', included: true },
          { text: 'Locker room access with towel service', included: true },
          { text: 'Unlimited group classes', included: true },
          { text: 'Monthly fitness assessment', included: true },
          { text: '4 personal training sessions/month', included: true },
          { text: 'Nutrition consultation', included: true },
          { text: 'Access to premium classes', included: true },
        ],
        popular: false,
        color: 'bg-purple-600',
      },
    ],
    annual: [
      {
        id: 'basic-annual',
        name: 'Basic',
        price: 399,
        description: 'Perfect for beginners starting their fitness journey',
        features: [
          { text: 'Access to gym facilities', included: true },
          { text: 'Standard gym equipment', included: true },
          { text: 'Locker room access', included: true },
          { text: '2 group classes per month', included: true },
          { text: 'Fitness assessment', included: false },
          { text: 'Personal training sessions', included: false },
          { text: 'Nutrition consultation', included: false },
          { text: 'Access to premium classes', included: false },
        ],
        popular: false,
        color: 'bg-blue-500',
        savings: '20%',
      },
      {
        id: 'premium-annual',
        name: 'Premium',
        price: 799,
        description: 'Our most popular plan for fitness enthusiasts',
        features: [
          { text: 'Access to gym facilities', included: true },
          { text: 'All gym equipment', included: true },
          { text: 'Locker room access', included: true },
          { text: 'Unlimited group classes', included: true },
          { text: 'Quarterly fitness assessment', included: true },
          { text: '1 personal training session/month', included: true },
          { text: 'Nutrition consultation', included: false },
          { text: 'Access to premium classes', included: false },
        ],
        popular: true,
        color: 'bg-primary',
        savings: '25%',
      },
      {
        id: 'elite-annual',
        name: 'Elite',
        price: 1299,
        description: 'Comprehensive plan for serious fitness goals',
        features: [
          { text: 'Access to gym facilities', included: true },
          { text: 'All gym equipment', included: true },
          { text: 'Locker room access with towel service', included: true },
          { text: 'Unlimited group classes', included: true },
          { text: 'Monthly fitness assessment', included: true },
          { text: '4 personal training sessions/month', included: true },
          { text: 'Nutrition consultation', included: true },
          { text: 'Access to premium classes', included: true },
        ],
        popular: false,
        color: 'bg-purple-600',
        savings: '25%',
      },
    ],
  };

  const currentPlans = plans[billingCycle];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('checkout-section').offsetTop - 100,
        behavior: 'smooth',
      });
    }, 100);
  };

  const toggleTooltip = (featureIndex) => {
    if (showTooltip === featureIndex) {
      setShowTooltip(null);
    } else {
      setShowTooltip(featureIndex);
    }
  };

  const featureTooltips = [
    'Access to our state-of-the-art gym facilities during all operating hours.',
    'Use of standard cardio and strength training equipment.',
    'Access to locker rooms, showers, and changing facilities.',
    'Participation in select group fitness classes with expert instructors.',
    'Professional evaluation of your fitness level, body composition, and goals.',
    'One-on-one sessions with certified personal trainers.',
    'Personalized nutrition advice from our registered dietitians.',
    'Access to specialized premium classes like HIIT, Pilates Reformer, and more.',
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Membership <span className="text-gradient">Plans</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose the perfect membership plan to achieve your fitness goals. 
              Join our community and transform your body and mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 shadow-md inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Annual <span className="text-xs font-bold text-green-500 ml-1">Save 20-25%</span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {currentPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`bg-white rounded-xl overflow-hidden shadow-lg ${
                  plan.popular ? 'ring-4 ring-primary/30 transform md:-translate-y-4' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-2 font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ month</span>
                    {plan.savings && (
                      <div className="mt-2">
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          Save {plan.savings}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${plan.color} hover:opacity-90`}
                  >
                    Choose Plan
                  </motion.button>
                </div>
                
                <div className="bg-gray-50 p-8">
                  <h4 className="font-semibold mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        ) : (
                          <FiX className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                        <div className="relative ml-2">
                          <button
                            onClick={() => toggleTooltip(featureIndex)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <FiHelpCircle size={14} />
                          </button>
                          {showTooltip === featureIndex && (
                            <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded py-2 px-3 shadow-lg">
                              {featureTooltips[featureIndex]}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section id="checkout-section" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedPlan ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-xl p-8 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Complete Your Membership</h2>
              
              <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      {currentPlans.find(p => p.id === selectedPlan)?.name} Plan
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {billingCycle === 'monthly' ? 'Monthly' : 'Annual'} billing
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${currentPlans.find(p => p.id === selectedPlan)?.price}/mo
                    </p>
                    {billingCycle === 'annual' && (
                      <p className="text-green-600 text-sm font-medium">
                        {currentPlans.find(p => p.id === selectedPlan)?.savings} savings
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmPurchase}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Confirm Purchase
                </motion.button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-6">
                Select a plan above to begin your fitness journey with Fit Quest.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Find answers to common questions about our membership plans.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {[
              {
                question: "Can I cancel my membership at any time?",
                answer: "Yes, you can cancel your monthly membership at any time with 30 days' notice. Annual memberships can be canceled with a cancellation fee if terminated before the 12-month period."
              },
              {
                question: "Are there any joining fees?",
                answer: "No, we don't charge any joining or enrollment fees. The price you see is the price you pay."
              },
              {
                question: "Can I freeze my membership temporarily?",
                answer: "Yes, you can freeze your membership for up to 3 months per year for medical reasons or extended travel at no additional cost."
              },
              {
                question: "Can I upgrade my membership plan later?",
                answer: "Absolutely! You can upgrade your membership plan at any time. The new rate will be prorated for the remainder of your billing cycle."
              },
              {
                question: "Do you offer family or corporate discounts?",
                answer: "Yes, we offer family plans with discounted rates for additional family members. We also have corporate partnership programs for businesses. Contact our sales team for more information."
              },
              {
                question: "What happens after my annual membership ends?",
                answer: "Your annual membership will automatically renew at the current rate unless you notify us that you wish to cancel or change your plan."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">
              What Our <span className="text-gradient">Members</span> Say
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Hear from our members who have transformed their lives with our fitness programs.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Nachiket Vaddoriya",
                plan: "Premium Member",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQFp0Zvb0eyt6A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677232297720?e=1746057600&v=beta&t=H7iB-EwChd7zHX5LTql_noEHTBaEcuUOBW0IBYdKZX4",
                quote: "The Premium plan has been perfect for me. Unlimited classes and the quarterly assessments keep me on track with my fitness goals. Worth every penny!"
              },
              {
                name: "Aastha chaudhari",
                plan: "Elite Member",
                image: "https://media.licdn.com/dms/image/v2/D5603AQEmJyAnhNZvFw/profile-displayphoto-shrink_800_800/B56ZPenK_JHoAc-/0/1734606631525?e=1746057600&v=beta&t=ZLB9_CjsudBH1TJYeZzp4AJtLZNnLDxOHr6CqOkb7rc",
                quote: "As an Elite member, the personal training sessions have completely transformed my approach to fitness. The nutrition consultation was a game-changer for my diet."
              },
              {
                name: "Yash Gondaliya",
                plan: "Basic Member",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQGKL8TKT-o5Cg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1694844114789?e=1746057600&v=beta&t=HSxsflNLaXdYpmtRV3R-V41RgJTLCicyy5qUGEXDPKE",
                quote: "I started with the Basic plan to test the waters, and I've been so impressed with the quality of the facilities and classes. Planning to upgrade to Premium soon!"
              }
            ].map((testimonial, index) => (
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
                <div className="pt-10 text-center">
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-primary">{testimonial.plan}</p>
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Choose Your Plan
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Subscription;