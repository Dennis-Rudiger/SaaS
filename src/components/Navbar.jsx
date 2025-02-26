import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../utils/ScrollToSection';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              SaaSPro
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a 
              href="#features" 
              onClick={(e) => handleNavClick(e, 'features')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleNavClick(e, 'pricing')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition"
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => handleNavClick(e, 'testimonials')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition"
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleNavClick(e, 'faq')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition"
            >
              FAQ
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">Login</Link>
            <Link to="/signup" className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark transition">
              Sign Up
            </Link>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <a 
              href="#features" 
              onClick={(e) => handleNavClick(e, 'features')}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleNavClick(e, 'pricing')}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => handleNavClick(e, 'testimonials')}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleNavClick(e, 'faq')}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              FAQ
            </a>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <Link to="/login" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Login</Link>
            <Link to="/signup" className="block px-4 py-2 text-primary font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
