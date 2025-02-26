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
      ctaLink: '/signup?plan=starter',
      color: 'blue'
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
      ctaLink: '/signup?plan=professional',
      color: 'primary'
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
      ctaLink: '/contact',
      color: 'purple'
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5"></div>
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5"></div>
      <div className="absolute top-1/4 right-1/3 w-60 h-60 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full">
            <p className="text-primary dark:text-primary-light text-sm font-medium">
              Plans for teams of all sizes
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-gray-800 dark:from-white dark:via-primary-light dark:to-gray-300 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that suits your needs. All plans include a 14-day free trial.
          </p>
          
          {/* Billing toggle with enhanced styling */}
          <div className="mt-10 inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isAnnual 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                isAnnual 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              Annual
              <span className="ml-1 text-xs py-0.5 px-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
        
        {/* Pricing tiers with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            // Define gradient colors based on plan
            let gradientClass = '';
            let shadowClass = '';
            
            if (plan.color === 'blue') {
              gradientClass = 'from-blue-400/20 to-blue-600/5';
              shadowClass = 'shadow-blue-200/30 dark:shadow-blue-900/20';
            } else if (plan.color === 'primary') {
              gradientClass = 'from-primary/20 to-indigo-600/5';
              shadowClass = 'shadow-primary/30 dark:shadow-primary/20';
            } else {
              gradientClass = 'from-purple-400/20 to-purple-600/5';
              shadowClass = 'shadow-purple-200/30 dark:shadow-purple-900/20';
            }
            
            return (
              <div
                key={plan.name}
                className={`relative group transition-all duration-300 hover:-translate-y-2 ${
                  plan.isPopular ? 'mt-0 md:-mt-4 lg:-mt-8' : 'mt-0'
                }`}
              >
                {/* Popular badge with animated pulse */}
                {plan.isPopular && (
                  <span className="absolute -top-4 left-0 right-0 mx-auto w-max px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg z-10 flex items-center">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-1"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white mr-1"></span>
                    Most Popular
                  </span>
                )}

                <div 
                  className={`h-full bg-gradient-to-br ${gradientClass} bg-white dark:bg-gray-800 rounded-2xl shadow-xl ${shadowClass} p-8 border border-gray-200/50 dark:border-gray-700/50 flex flex-col ${
                    plan.isPopular ? 'ring-2 ring-primary dark:ring-primary-light' : ''
                  }`}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{plan.description}</p>
                    </div>
                    
                    {/* Plan icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${plan.color === 'primary' ? 'primary' : plan.color}-100 dark:bg-${plan.color === 'primary' ? 'primary' : plan.color}-900/30`}>
                      {plan.color === 'blue' && (
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {plan.color === 'primary' && (
                        <svg className="w-6 h-6 text-primary dark:text-primary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {plan.color === 'purple' && (
                        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-end">
                      <span className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-lg text-gray-500 dark:text-gray-400 ml-2 mb-1">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    </div>
                    
                    {isAnnual && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        ${plan.monthlyPrice}/month billed annually
                      </p>
                    )}
                  </div>
                  
                  {/* Features */}
                  <div className="mb-8 flex-grow">
                    <p className="font-medium text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                      What's included:
                    </p>
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg 
                            className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-${plan.color === 'primary' ? 'primary' : plan.color}-500 dark:text-${plan.color === 'primary' ? 'primary' : plan.color}-400`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* CTA Button */}
                  <Link
                    to={plan.ctaLink}
                    className={`w-full py-3.5 px-4 rounded-xl font-medium text-center transition-all transform hover:shadow-lg ${
                      plan.isPopular
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : `bg-${plan.color === 'primary' ? 'primary' : plan.color}-500/10 text-${plan.color === 'primary' ? 'primary' : plan.color}-700 dark:bg-${plan.color === 'primary' ? 'primary' : plan.color}-500/20 dark:text-${plan.color === 'primary' ? 'primary' : plan.color}-400 hover:bg-${plan.color === 'primary' ? 'primary' : plan.color}-500/20 dark:hover:bg-${plan.color === 'primary' ? 'primary' : plan.color}-500/30`
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enterprise callout with enhanced styling */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-purple-600"></div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary opacity-10 dark:opacity-5 rounded-full filter blur-3xl"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
              <div className="mb-6 md:mb-0 md:mr-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Need something more specialized?</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
                  Our team can create custom solutions tailored to your specific business needs. 
                  Contact us to discuss custom pricing and features.
                </p>
              </div>
              
              <Link
                to="/contact"
                className="flex-shrink-0 inline-flex items-center px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-black dark:hover:bg-gray-100 transition shadow-lg"
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
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
