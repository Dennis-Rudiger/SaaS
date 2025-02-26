import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: 'How does the 14-day free trial work?',
    answer: 'Your 14-day free trial gives you complete access to all features of your selected plan with no restrictions. You can explore the platform, create projects, invite team members, and experience the full functionality. No credit card is required to start your trial, and you can upgrade to a paid plan at any time.',
    category: 'Billing'
  },
  {
    id: 2,
    question: 'Do I need a credit card to sign up?',
    answer: 'No, you don\'t need a credit card to sign up for our free trial. You can start using SaaSPro immediately with no payment information. We\'ll send you a reminder before your trial ends so you can decide if you want to continue with a paid plan.',
    category: 'Billing'
  },
  {
    id: 3,
    question: 'What happens after my trial ends?',
    answer: 'When your 14-day trial ends, you\'ll need to choose a subscription plan to continue using SaaSPro. If you decide not to subscribe, your account will become read-only, allowing you to access your data but not create or edit projects. Your data will be stored for 30 days, giving you time to decide.',
    category: 'Billing'
  },
  {
    id: 4,
    question: 'Can I change plans or cancel anytime?',
    answer: 'Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings. If you upgrade, the new pricing takes effect immediately with prorated charges. If you downgrade or cancel, the changes will apply at the end of your current billing cycle, and you won\'t be charged again.',
    category: 'Billing'
  },
  {
    id: 5,
    question: 'Is there a limit to how many team members I can add?',
    answer: 'The number of team members you can add depends on your subscription plan. The Starter plan supports up to 5 team members, Professional supports up to 20, and Enterprise allows unlimited team members. You can see the details for each plan on our pricing page.',
    category: 'Features'
  },
  {
    id: 6,
    question: 'How secure is my data on SaaSPro?',
    answer: 'We take security seriously. All data is encrypted in transit and at rest, and we use industry-standard security measures to protect your information. We perform regular security audits, maintain compliance with relevant regulations, and provide features like two-factor authentication and single sign-on for enhanced security.',
    category: 'Security'
  },
  {
    id: 7,
    question: 'Can I import data from other tools?',
    answer: 'Yes, SaaSPro supports importing data from several popular tools including Trello, Asana, Jira, and Microsoft Project. Our import wizards guide you through the process, mapping your existing data structure to SaaSPro. For more complex migrations, our support team can provide assistance.',
    category: 'Features'
  },
  {
    id: 8,
    question: 'What kind of support is available?',
    answer: 'All plans include email support with a 24-hour response time. The Professional plan adds priority email support with faster responses. Enterprise customers receive dedicated account management and phone support. We also offer an extensive knowledge base, video tutorials, and regular webinars for all users.',
    category: 'Support'
  },
];

// FAQ category filter options
const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'Billing', name: 'Billing & Pricing' },
  { id: 'Features', name: 'Features & Usage' },
  { id: 'Security', name: 'Security & Privacy' },
  { id: 'Support', name: 'Support & Help' },
];

// FAQ Item Component with animations
const FAQItem = ({ faq, isOpen, toggleFAQ }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-4 transition-all duration-300 ${isOpen ? 'shadow-md' : 'hover:shadow-md'}`}
    >
      <button
        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded"
        onClick={() => toggleFAQ(faq.id)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg text-gray-900 dark:text-white flex items-center">
          <span className={`inline-block w-2 h-2 rounded-full mr-3 ${
            faq.category === 'Billing' ? 'bg-blue-500' : 
            faq.category === 'Features' ? 'bg-green-500' : 
            faq.category === 'Security' ? 'bg-red-500' : 'bg-purple-500'
          }`}></span>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 ml-2 h-7 w-7 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 transition-colors ${
          isOpen ? 'bg-primary/10 border-primary/20 dark:bg-primary/20 dark:border-primary/30' : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          <svg
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
              isOpen ? 'transform rotate-180 text-primary dark:text-primary-light' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {/* Animated content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <div className="h-px w-full bg-gray-200 dark:bg-gray-700 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
              <div className="mt-4 flex items-center">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {faq.category}
                </span>
                <button className="ml-auto text-sm text-primary hover:text-primary-dark flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                  Helpful?
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openFAQs, setOpenFAQs] = useState([1]); // First FAQ open by default
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (id) => {
    setOpenFAQs((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter FAQs based on category and search term
  const filteredFAQs = faqs.filter(faq => {
    // Filter by category
    const categoryMatch = activeCategory === 'all' || faq.category === activeCategory;
    
    // Filter by search term
    const searchMatch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background styles */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block mb-4 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary dark:text-primary-light text-sm font-medium">
              Questions & Answers
            </p>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to know about SaaSPro. Can't find the answer you're looking for? 
          </motion.p>
          
          {/* Search and filter */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 dark:text-gray-300"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* FAQ accordion */}
          {filteredFAQs.length > 0 ? (
            <>
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <FAQItem 
                    key={faq.id} 
                    faq={faq} 
                    isOpen={openFAQs.includes(faq.id)}
                    toggleFAQ={toggleFAQ}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-600 dark:text-gray-400">No matching questions found</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                className="mt-2 text-primary hover:text-primary-dark dark:text-primary-light"
              >
                Clear filters
              </button>
            </div>
          )}
          
          {/* Contact CTA */}
          <motion.div 
            className="mt-12 py-8 px-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-purple-500"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-blue-500/30 rounded-full filter blur-2xl"></div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">Still have questions?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10">
              If you can't find what you're looking for, our support team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 relative z-10">
              <a
                href="/contact"
                className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm hover:shadow transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Contact Support
              </a>
              <a
                href="/knowledge-base"
                className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Browse Knowledge Base
              </a>
            </div>
          </motion.div>
          
          {/* Quick links */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: 'Getting Started',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                link: '/docs/getting-started'
              },
              {
                title: 'API Documentation',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                link: '/docs/api'
              },
              {
                title: 'Community Forum',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                ),
                link: '/community'
              },
              {
                title: 'Video Tutorials',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                link: '/tutorials'
              }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 mb-2 text-primary dark:text-primary-light">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white text-center">{item.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
