import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-16 md:p-16 relative">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to boost your team's productivity?
                </h2>
                <p className="text-lg text-indigo-100 mb-0">
                  Start your 14-day free trial today. No credit card required. Cancel anytime.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition shadow-md"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/demo"
                  className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition"
                >
                  Request a Demo
                </Link>
              </div>
            </div>
            
            <div className="relative z-10 mt-12 pt-10 border-t border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">3,500+</div>
                  <div className="text-indigo-100">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-indigo-100">Customer Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">32%</div>
                  <div className="text-indigo-100">Productivity Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.8/5</div>
                  <div className="text-indigo-100">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
