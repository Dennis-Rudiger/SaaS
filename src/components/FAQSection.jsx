import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'How does the 14-day free trial work?',
    answer: 'Your 14-day free trial gives you complete access to all features of your selected plan with no restrictions. You can explore the platform, create projects, invite team members, and experience the full functionality. No credit card is required to start your trial, and you can upgrade to a paid plan at any time.',
  },
  {
    id: 2,
    question: 'Do I need a credit card to sign up?',
    answer: 'No, you don\'t need a credit card to sign up for our free trial. You can start using SaaSPro immediately with no payment information. We\'ll send you a reminder before your trial ends so you can decide if you want to continue with a paid plan.',
  },
  {
    id: 3,
    question: 'What happens after my trial ends?',
    answer: 'When your 14-day trial ends, you\'ll need to choose a subscription plan to continue using SaaSPro. If you decide not to subscribe, your account will become read-only, allowing you to access your data but not create or edit projects. Your data will be stored for 30 days, giving you time to decide.',
  },
  {
    id: 4,
    question: 'Can I change plans or cancel anytime?',
    answer: 'Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings. If you upgrade, the new pricing takes effect immediately with prorated charges. If you downgrade or cancel, the changes will apply at the end of your current billing cycle, and you won\'t be charged again.',
  },
  {
    id: 5,
    question: 'Is there a limit to how many team members I can add?',
    answer: 'The number of team members you can add depends on your subscription plan. The Starter plan supports up to 5 team members, Professional supports up to 20, and Enterprise allows unlimited team members. You can see the details for each plan on our pricing page.',
  },
  {
    id: 6,
    question: 'How secure is my data on SaaSPro?',
    answer: 'We take security seriously. All data is encrypted in transit and at rest, and we use industry-standard security measures to protect your information. We perform regular security audits, maintain compliance with relevant regulations, and provide features like two-factor authentication and single sign-on for enhanced security.',
  },
  {
    id: 7,
    question: 'Can I import data from other tools?',
    answer: 'Yes, SaaSPro supports importing data from several popular tools including Trello, Asana, Jira, and Microsoft Project. Our import wizards guide you through the process, mapping your existing data structure to SaaSPro. For more complex migrations, our support team can provide assistance.',
  },
  {
    id: 8,
    question: 'What kind of support is available?',
    answer: 'All plans include email support with a 24-hour response time. The Professional plan adds priority email support with faster responses. Enterprise customers receive dedicated account management and phone support. We also offer an extensive knowledge base, video tutorials, and regular webinars for all users.',
  },
];

const FAQSection = () => {
  const [openFAQs, setOpenFAQs] = useState([]);

  const toggleFAQ = (id) => {
    setOpenFAQs((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about SaaSPro? We've got answers to help you make the right decision.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={openFAQs.includes(faq.id)}
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                      openFAQs.includes(faq.id) ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFAQs.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still have questions? We're here to help.
            </p>
            <a
              href="/contact"
              className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
            >
              Contact our support team
              <svg
                className="ml-2 w-4 h-4"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
