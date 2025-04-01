import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, IndianRupee, Users } from 'lucide-react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminHeader from '../../components/Admin/AdminHeader';

function Subscriptions() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        'Access to basic gym equipment',
        '2 group classes per week',
        'Locker room access',
        'Basic fitness assessment',
      ],
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Premium',
      price: 49,
      period: 'month',
      description: 'Most popular choice',
      features: [
        'All Basic features',
        'Unlimited group classes',
        'Personal trainer consultation',
        'Access to premium equipment',
        'Nutrition planning',
      ],
      color: 'bg-primary',
      popular: true,
    },
    {
      id: 3,
      name: 'Elite',
      price: 99,
      period: 'month',
      description: 'For serious athletes',
      features: [
        'All Premium features',
        'Private training sessions',
        'Recovery facilities access',
        'Priority booking',
        'Guest passes',
        'Exclusive events access',
      ],
      color: 'bg-purple-600',
    },
  ];

  const activeSubscriptions = [
    {
      id: 1,
      name: 'Premium Plan',
      members: 248,
      revenue: 12152,
      growth: '+12%',
    },
    {
      id: 2,
      name: 'Basic Plan',
      members: 156,
      revenue: 4524,
      growth: '+8%',
    },
    {
      id: 3,
      name: 'Elite Plan',
      members: 92,
      revenue: 9108,
      growth: '+15%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for desktop */}
      <AdminSidebar isMobile={false} isOpen={true} />
      
      {/* Mobile Sidebar */}
      <AdminSidebar isMobile={true} isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Subscriptions" 
          onMenuClick={() => setIsMobileSidebarOpen(true)} 
        />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-8">
              <CreditCard className="h-6 w-6 text-gray-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Subscription Plans</h1>
            </div>

            {/* Active Subscriptions Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {activeSubscriptions.map((subscription) => (
                <motion.div
                  key={subscription.id}
                  className="bg-white rounded-xl shadow-md p-6 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: subscription.id * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{subscription.name}</h3>
                    <span className="text-green-500 text-sm font-medium">{subscription.growth}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Active Members</span>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="font-medium">{subscription.members}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monthly Revenue</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="font-medium">{subscription.revenue}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Subscription Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  className={`flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden ${
                    plan.popular ? 'ring-2 ring-primary' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: plan.id * 0.1 }}
                >
                  {plan.popular && (
                    <div className="bg-primary text-white text-center text-sm py-1">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-4xl font-bold text-gray-800">${plan.price}</span>
                        <span className="text-gray-500 ml-1">/{plan.period}</span>
                      </div>
                      <ul className="mt-6 space-y-4">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className={`mt-auto w-full py-3 px-4 rounded-lg text-white ${plan.color} hover:opacity-90 transition-opacity`}>
                      Edit Plan
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Subscriptions;