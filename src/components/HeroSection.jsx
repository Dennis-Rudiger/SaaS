import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 pt-28 pb-20 md:pt-40 md:pb-32">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Streamline Your Workflow with SaaSPro
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-lg">
              Boost productivity and grow your business with our all-in-one solution. Save time, reduce costs, and achieve more.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="bg-white text-primary font-medium px-8 py-4 rounded-md hover:bg-gray-100 transition text-center">
                Start Free Trial
              </Link>
              <Link to="/demo" className="bg-transparent border border-white text-white font-medium px-8 py-4 rounded-md hover:bg-white hover:bg-opacity-10 transition text-center">
                Watch Demo
              </Link>
            </div>
            
            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <img 
                    key={item}
                    src={`https://randomuser.me/api/portraits/men/${item + 20}.jpg`} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <p className="ml-4 text-white">
                <span className="font-bold">500+</span> companies already onboard
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="bg-white p-2 rounded-2xl shadow-2xl">
              <img 
                src="https://source.unsplash.com/random/900x600/?dashboard" 
                alt="Dashboard" 
                className="rounded-xl w-full"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-lg transform rotate-3">
              New Features!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
