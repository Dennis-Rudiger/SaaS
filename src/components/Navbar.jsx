import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/ScrollToSection';
import DarkModeToggle from './DarkModeToggle';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef();
  const location = useLocation();
  
  // Close menu when clicking outside
  useOnClickOutside(mobileMenuRef, () => setIsOpen(false));
  
  // Check if user is authenticated
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Add scroll event listener to change navbar style on scroll
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
  
  // Handle navigation via scroll for anchor links on homepage
  const handleNavClick = (e, sectionId) => {
    // Only handle anchor links on the homepage
    if (location.pathname === '/') {
      e.preventDefault();
      setIsOpen(false);
      scrollToSection(sectionId);
    }
  };

  return (
    <header 
      className={`fixed w-full z-40 transition-colors duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md' 
          : location.pathname === '/' 
            ? 'bg-transparent' 
            : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              SaaSPro
            </Link>
            
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    to="/"
                    className={`${location.pathname === '/' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'} hover:text-primary transition`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a 
                    href="/#features"
                    onClick={(e) => handleNavClick(e, 'features')}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary transition"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a 
                    href="/#pricing"
                    onClick={(e) => handleNavClick(e, 'pricing')}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary transition"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <Link 
                    to="/about"
                    className={`${location.pathname === '/about' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'} hover:text-primary transition`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className={`${'text-gray-700 dark:text-gray-300'} hover:text-primary transition`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark transition"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
            
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        ref={mobileMenuRef}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-lg">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <a
            href="/#features"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={(e) => handleNavClick(e, 'features')}
          >
            Features
          </a>
          <a
            href="/#pricing"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={(e) => handleNavClick(e, 'pricing')}
          >
            Pricing
          </a>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block mt-1 px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-dark"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
