import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PlaceholderPage = ({ title, description, icon, returnLink = '/' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="mx-auto w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-6">
              {icon || (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {description || "We're currently building this page. Check back soon for updates!"}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link 
                to={returnLink}
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow hover:bg-primary-dark transition"
              >
                Return to Home
              </Link>
              
              <Link 
                to="/contact"
                className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
