import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../utils/ScrollToSection';

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background pattern - subtle in light mode, more visible in dark */}
      <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-10"></div>
      
      {/* Accent color blobs - different for light/dark modes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary opacity-10 dark:opacity-20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-indigo-400 dark:bg-indigo-600 opacity-10 dark:opacity-20 rounded-full filter blur-3xl"></div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="inline-block mb-6 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full">
              <p className="text-primary dark:text-primary-light text-sm font-medium">
                Streamline your workflow with SaaSPro
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Work <span className="text-primary dark:text-primary-light">smarter</span>, not harder
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
              The all-in-one platform that helps teams manage projects, track progress, and collaborate seamlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition shadow-md"
              >
                Get Started Free
              </Link>
              <button 
                onClick={() => scrollToSection('features')}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Learn More
              </button>
            </div>
            
            <div className="mt-8 flex items-center text-sm text-gray-600 dark:text-gray-400">
              <svg className="h-5 w-5 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>No credit card required • 14-day free trial • Cancel anytime</span>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative">
              {/* Dashboard preview with proper light/dark styling */}
              <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80" 
                  alt="SaaSPro Dashboard Preview" 
                  className="w-full h-auto rounded-lg border border-gray-100 dark:border-gray-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80';
                  }}
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 dark:bg-primary/30 rounded-lg transform rotate-6 z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-400/20 dark:bg-indigo-500/30 rounded-lg transform -rotate-6 z-0"></div>
            </div>
            
            {/* Floating badges */}
            <div className="hidden md:block absolute top-1/4 right-10 transform rotate-6">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg flex items-center space-x-2 border border-gray-100 dark:border-gray-700">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Task completed</span>
              </div>
            </div>
            
            <div className="hidden md:block absolute bottom-20 left-10 transform -rotate-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg flex items-center space-x-2 border border-gray-100 dark:border-gray-700">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">New notification</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logos */}
        <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">
            Trusted by teams at
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['Acme Inc', 'GlobalTech', 'Quantum', 'Innovate', 'FutureCo', 'Elevate'].map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-8 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <div className="font-bold text-lg">{company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wave shape divider - works in both light and dark modes */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            d="M0,224L60,229.3C120,235,240,245,360,218.7C480,192,600,128,720,117.3C840,107,960,149,1080,160C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="text-white dark:text-gray-900"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
