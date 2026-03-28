import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from '../components/StripeCheckoutForm';

// Replace with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subscription, loading, isActive, isTrialExpired } = useSubscription(); 
  
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

  const [selectedPlan, setSelectedPlan] = useState(() => {
    // Check if a plan was passed in the URL, otherwise default to Professional
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const planId = params.get('plan');
    if (planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) return plan;
    }
    return plans.find(p => p.id === 'professional');
  });

  const [billingCycle, setBillingCycle] = useState('annual'); // annual or monthly

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardHeader title="Subscription" />
        <div className="text-center py-12">Loading your subscription details...</div>
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isTrialExpired ? 'Your Free Trial Has Expired' : 'Complete Your Subscription'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isTrialExpired ? 'To continue using all premium features, please select a plan and subscribe.' : 'Choose a plan that works best for you'}
            </p>
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
                
                <Elements stripe={stripePromise}>
                  <StripeCheckoutForm selectedPlan={selectedPlan} billingCycle={billingCycle} />
                </Elements>
                
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