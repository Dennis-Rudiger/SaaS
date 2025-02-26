import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('annual'); // annual or monthly
  const [isLoading, setIsLoading] = useState(false);
  
  // Payment details
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    country: 'US',
    postalCode: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Plans data - in a real app, this would come from your backend
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        'Up to 5 team members',
        '5GB storage',
        'Basic analytics',
        'Email support',
        'API access',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        'Up to 20 team members',
        '50GB storage',
        'Advanced analytics',
        'Priority email support',
        'API access',
        'Custom integrations',
        'Team collaboration tools',
      ],
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 299,
      annualPrice: 2990,
      features: [
        'Unlimited team members',
        '500GB storage',
        'Custom reporting',
        '24/7 phone support',
        'Dedicated account manager',
        'Advanced security',
        'Custom training',
        'SLA guarantees',
      ],
    },
  ];
  
  useEffect(() => {
    // Check if a plan was passed in the URL
    const params = new URLSearchParams(location.search);
    const planId = params.get('plan');
    
    if (planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    } else {
      // Default to Professional plan if none specified
      setSelectedPlan(plans.find(p => p.id === 'professional'));
    }
  }, [location]);
  
  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };
  
  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation for payment fields
    if (!paymentInfo.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Please use MM/YY format';
    }
    
    if (!paymentInfo.cvc.trim()) {
      newErrors.cvc = 'CVC is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvc)) {
      newErrors.cvc = 'CVC must be 3 or 4 digits';
    }
    
    if (!paymentInfo.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Simulate API call for payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store subscription information
        localStorage.setItem('subscription', JSON.stringify({
          plan: selectedPlan.id,
          billingCycle: billingCycle,
          startDate: new Date().toISOString(),
          price: billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice
        }));
        
        // Redirect to the dashboard or a success page
        navigate('/dashboard');
      } catch (error) {
        console.error('Payment error:', error);
        setErrors({
          general: 'An error occurred while processing your payment. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  if (!selectedPlan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Subscription</h1>
            <p className="text-gray-600 dark:text-gray-400">Choose a plan that works best for you</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Plan Selection</h2>
                
                <div className="space-y-4 mb-6">
                  {plans.map(plan => (
                    <div 
                      key={plan.id}
                      onClick={() => handlePlanChange(plan)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPlan && selectedPlan.id === plan.id
                          ? 'border-primary bg-primary bg-opacity-5 dark:bg-opacity-10'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ${billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}
                            /{billingCycle === 'annual' ? 'year' : 'month'}
                          </p>
                        </div>
                        <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center 
                          ${selectedPlan && selectedPlan.id === plan.id
                            ? 'border-primary'
                            : 'border-gray-300 dark:border-gray-600'
                          }">
                          {selectedPlan && selectedPlan.id === plan.id && (
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Billing Frequency</h3>
                <div className="flex justify-between bg-gray-100 dark:bg-gray-700 p-1 rounded-md mb-6">
                  <button
                    onClick={() => handleBillingCycleChange('annual')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                      billingCycle === 'annual'
                        ? 'bg-white dark:bg-gray-600 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    Annual
                    <span className="ml-1 text-xs text-green-600 dark:text-green-400">Save 20%</span>
                  </button>
                  <button
                    onClick={() => handleBillingCycleChange('monthly')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                      billingCycle === 'monthly'
                        ? 'bg-white dark:bg-gray-600 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ${billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice}
                    </span>
                  </div>
                  
                  {billingCycle === 'annual' && (
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-green-600 dark:text-green-400">Annual discount</span>
                      <span className="text-green-600 dark:text-green-400">-${selectedPlan.monthlyPrice * 2}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice}
                      </span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400">
                        {billingCycle === 'annual' ? 'per year' : 'per month'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Information</h2>
                
                {errors.general && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md">
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="cardName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.cardName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="John Doe"
                      disabled={isLoading}
                    />
                    {errors.cardName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardName}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="1234 5678 9012 3456"
                      disabled={isLoading}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="expiryDate" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="MM/YY"
                        disabled={isLoading}
                      />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.expiryDate}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cvc" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        value={paymentInfo.cvc}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.cvc ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="123"
                        disabled={isLoading}
                      />
                      {errors.cvc && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cvc}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={paymentInfo.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        disabled={isLoading}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={paymentInfo.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.postalCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="12345"
                        disabled={isLoading}
                      />
                      {errors.postalCode && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.postalCode}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          id="saveCard"
                          className="h-4 w-4 border-gray-300 text-primary rounded focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="saveCard" className="text-sm text-gray-700 dark:text-gray-300">
                          Save this card for future payments
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Complete Subscription - $${billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice} ${billingCycle === 'annual' ? '/year' : '/month'}`
                    )}
                  </button>
                </form>
                
                <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Secure payment
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    100% secure transaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubscriptionPage;