import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WelcomeCard = ({ profile }) => {
  // Check if it's the first time the user is logging in (first-time user experience)
  const isFirstTimeUser = !profile || !profile.last_login;
  
  return (
    <motion.div 
      className="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20" />
        
        <div className="relative p-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isFirstTimeUser 
                  ? `Welcome, ${profile?.first_name || 'there'}!` 
                  : `Welcome back, ${profile?.first_name || 'there'}!`
                }
              </h2>
              
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                {isFirstTimeUser 
                  ? "Let's get you started with your new account." 
                  : "Here's a summary of your recent activity."
                }
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-shrink-0 space-x-3">
              {isFirstTimeUser ? (
                <>
                  <Link
                    to="/onboarding"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Complete Setup
                  </Link>
                  <Link
                    to="/tutorial"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Watch Tutorial
                  </Link>
                </>
              ) : (
                <Link
                  to="/projects/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <svg className="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Project
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {isFirstTimeUser && (
        <div className="bg-gray-50 dark:bg-gray-750 px-6 py-3">
          <div className="flex items-center text-sm">
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-4">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '10%' }}></div>
            </div>
            <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">Profile completion: 10%</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WelcomeCard;
