import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subscriptionService } from '../services/subscriptionService';
import PayPalSubscribeButton from '../components/PayPalSubscribeButton';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const PricingPage = () => {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTiers = async () => {
      const { data, error } = await subscriptionService.getSubscriptionTiers();
      if (error) {
        setError('Could not load pricing plans. Please try again later.');
        console.error(error);
      } else {
        setTiers(data);
      }
      setLoading(false);
    };
    fetchTiers();
  }, []);

  const handleSubscriptionSuccess = (data) => {
    alert(`Subscription successful! Your subscription ID is ${data.subscriptionID}`);
    navigate('/dashboard');
  };

  const handleSubscriptionError = (err) => {
    setError(`Subscription failed: ${err.message}`);
  };

  const handleChoosePlan = (tier) => {
    if (!user) {
      // Redirect to signup page with plan info
      navigate(`/signup?plan=${tier.id}`);
    }
    // If user is logged in, the PayPal button will handle the subscription.
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Find the perfect plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start for free, then grow with us. Our pricing is designed to scale with your business.
          </p>
        </div>

        {loading && <div className="text-center">Loading plans...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              className={`border rounded-lg p-8 flex flex-col ${
                tier.name === 'Pro' ? 'border-primary scale-105' : 'border-gray-200 dark:border-gray-700'
              } bg-white dark:bg-gray-800`}
              whileHover={{ y: -5 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{tier.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 flex-grow">{tier.description}</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">${tier.price}</span>
                <span className="text-lg text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="mt-8 space-y-4 text-gray-600 dark:text-gray-300">
                {tier.features && Object.entries(tier.features).map(([key, value]) => (
                  <li key={key} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{`${value} ${key.replace(/_/g, ' ')}`}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                {user ? (
                  <PayPalSubscribeButton
                    planId={tier.paypal_plan_id}
                    onSuccess={handleSubscriptionSuccess}
                    onError={handleSubscriptionError}
                  />
                ) : (
                  <button
                    onClick={() => handleChoosePlan(tier)}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Choose Plan
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Features page
export const FeaturesPage = () => (
  <PlaceholderPage 
    title="Product Features"
    description="Discover all the powerful features SaaSPro offers to streamline your workflow and boost productivity."
    icon={
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    }
  />
);

// Security page
export const SecurityPage = () => (
  <PlaceholderPage 
    title="Security"
    description="Learn about our robust security measures designed to keep your data safe and your business protected."
    icon={
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    }
  />
);

// Roadmap page
export const RoadmapPage = () => (
  <PlaceholderPage 
    title="Product Roadmap"
    description="See what's coming next in SaaSPro. Explore our development plans and upcoming features."
    icon={
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    }
  />
);
