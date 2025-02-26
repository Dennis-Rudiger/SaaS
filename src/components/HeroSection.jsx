import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../utils/ScrollToSection';

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-24 bg-gradient-to-r from-indigo-600 to-blue-500 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Streamline Your Workflow with SaaSPro
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-lg">
              The all-in-one platform that helps teams manage projects, track progress, and collaborate seamlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition shadow-lg"
              >
                Get Started Free
              </Link>
              <button 
                onClick={() => scrollToSection('features')}
                className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition"
              >
                Learn More
              </button>
            </div>
            
            <div className="mt-8 flex items-center text-sm text-white">
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>No credit card required • 14-day free trial • Cancel anytime</span>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-12">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-2xl">
              <img 
                src="/dashboard-preview.png" 
                alt="SaaSPro Dashboard Preview" 
                className="w-full h-auto rounded border border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x500?text=SaaSPro+Dashboard';
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Logos */}
        <div className="mt-16">
          <p className="text-center text-white text-sm font-medium uppercase tracking-wider mb-6">Trusted by teams at</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5', 'Company 6'].map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-8 text-white opacity-70">
                  {/* Replace with actual logos */}
                  <div className="font-bold text-lg">{company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,224L60,229.3C120,235,240,245,360,218.7C480,192,600,128,720,117.3C840,107,960,149,1080,160C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="dark:fill-gray-900"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
