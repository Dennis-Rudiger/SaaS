import React from 'react';
import AnimatedCounter from './AnimatedCounter';

const StatsSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-8 rounded-xl shadow-sm">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              <AnimatedCounter end={5000} suffix="+" />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Active Users</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-xl shadow-sm">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              <AnimatedCounter end={98} suffix="%" />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Satisfaction Rate</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-xl shadow-sm">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              <AnimatedCounter end={152} suffix="" />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Countries Served</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-xl shadow-sm">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              <AnimatedCounter end={32} prefix="$" suffix="M" />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Capital Raised</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
