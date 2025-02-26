import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-2/3 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Ready to transform your workflow and boost productivity?
            </h2>
            <p className="text-xl text-white opacity-90 max-w-2xl">
              Join thousands of businesses that use SaaSPro to streamline their operations, 
              reduce costs, and drive growth. Start your 14-day free trial today.
            </p>
          </div>
          
          <div className="lg:w-1/3 flex flex-col space-y-4">
            <Link 
              to="/signup" 
              className="bg-white text-primary font-medium px-8 py-4 rounded-md hover:bg-gray-100 transition text-center"
            >
              Get Started Free
            </Link>
            <Link
              to="/demo"
              className="bg-transparent border border-white text-white font-medium px-8 py-4 rounded-md hover:bg-white hover:bg-opacity-10 transition text-center"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center mt-16 text-white">
          <div className="flex items-center mb-6 md:mb-0 md:mr-12">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center mb-6 md:mb-0 md:mr-12">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
