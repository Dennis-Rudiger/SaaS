import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="bg-primary text-white font-medium px-8 py-3 rounded-md hover:bg-primary-dark transition"
          >
            Go to Homepage
          </Link>
          <Link
            to="/dashboard"
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium px-8 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
