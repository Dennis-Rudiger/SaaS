import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        'Up to 5 team members',
        '5 GB storage',
        'Basic project management',
        'Task tracking',
        'Email support',
      ],
      isPopular: false,
      cta: 'Start Free Trial',
      ctaLink: '/signup?plan=starter'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing teams and businesses',
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        'Up to 20 team members',
        '20 GB storage',
        'Advanced project management',
        'Time tracking',
        'Resource allocation',
        'Advanced analytics',
        'Priority email support',
      ],
      isPopular: true,
      cta: 'Start Free Trial',
      ctaLink: '/signup?plan=professional'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        'Unlimited team members',
        '100 GB storage',
        'Advanced project management',
        'Time tracking',
        'Resource allocation',
        'Custom analytics',
        'Dedicated account manager',
        'Phone and email support',
        'Single sign-on (SSO)',
        'Custom integrations',
      ],
      isPopular: false,
      cta: 'Contact Sales',
      ctaLink: '/contact'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that suits your needs. All plans include a 14-day free trial.
          </p>
          
          <div className="mt-8 flex items-center justify-center">
            <span className={`text-sm ${isAnnual ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white font-medium'}`}>
              Monthly
            </span>
            <button
              className="mx-4 relative inline-flex items-center h-6 rounded-full w-11 bg-primary transition-colors"
              onClick={() => setIsAnnual(!isAnnual)}
              aria-pressed={isAnnual}
              aria-labelledby="billing-cycle"
            >
              <span className="sr-only" id="billing-cycle">
                {isAnnual ? 'Switch to monthly billing' : 'Switch to annual billing'}
              </span>
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
              Annual
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border transition-transform hover:scale-105 ${
                plan.isPopular 
                  ? 'border-primary ring-1 ring-primary relative overflow-hidden' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.isPopular && (
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
                to={plan.ctaLink}
                className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                  plan.isPopular
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
