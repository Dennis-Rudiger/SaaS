import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams or individuals just getting started.',
      monthlyPrice: 29,
      annualPrice: 290, // 2 months free
      features: [
        'Up to 5 team members',
        '5GB storage',
        'Basic analytics',
        'Email support',
        'API access',
      ],
      highlightFeature: false,
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses that need more power and features.',
      monthlyPrice: 99,
      annualPrice: 990, // 2 months free
      features: [
        'Up to 20 team members',
        '50GB storage',
        'Advanced analytics',
        'Priority email support',
        'API access',
        'Custom integrations',
        'Team collaboration tools',
      ],
      highlightFeature: 'Team collaboration tools',
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Advanced features and support for large organizations.',
      monthlyPrice: 299,
      annualPrice: 2990, // 2 months free
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
      highlightFeature: '24/7 phone support',
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
          
          <div className="mt-10 inline-flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition ${
                isAnnual 
                  ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' 
                  : 'text-gray-700 dark:text-gray-400'
              }`}
            >
              Annual
              <span className="ml-2 text-xs font-semibold text-green-600 dark:text-green-400">Save 20%</span>
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition ${
                !isAnnual 
                  ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' 
                  : 'text-gray-700 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border transition-transform hover:scale-105 ${
                plan.popular 
                  ? 'border-primary ring-1 ring-primary relative overflow-hidden' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-2 -translate-y-1">
                    Popular
                  </div>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  /{isAnnual ? 'year' : 'month'}
                </span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${
                      feature === plan.highlightFeature
                        ? 'text-primary font-semibold'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 mr-2 ${
                        feature === plan.highlightFeature ? 'text-primary' : 'text-green-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Need something more specialized?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our team can create custom solutions tailored to your specific business needs. 
            Contact us to discuss custom pricing and features.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition"
          >
            Contact our sales team
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
