import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../utils/ScrollToSection';
import DarkModeToggle from './DarkModeToggle';

// Add this utility function to combine class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update the navigation items array in the Navbar component
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' }, // Changed to link to section on landing page
    { name: 'Pricing', href: '/#pricing' }, // Changed to link to section on landing page
    { name: 'About', href: '/#home' }, // Changed to link to hero section
    { name: 'Contact', href: '/#contact' }, // Changed to link to contact section
  ];

  // Add a helper function to handle section links
  const handleSectionLink = (e, href) => {
    // If it's an anchor link
    if (href.startsWith('/#')) {
      e.preventDefault();
      
      // Check if we're on the landing page
      if (window.location.pathname === '/') {
        // Get the element ID without the '/#'
        const sectionId = href.substring(2);
        const section = document.getElementById(sectionId);
        
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to landing page with the anchor
        window.location.href = href;
      }
    }
  };

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle navigation to sections
  const handleNavigation = (sectionId) => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
    
    // Scroll to the section
    scrollToSection(sectionId);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              SaaSPro
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  item.current ? 'text-primary dark:text-primary-light' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light',
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors'
                )}
                onClick={(e) => handleSectionLink(e, item.href)}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            <Link 
              to="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/dashboard"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <DarkModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 ml-3 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  item.current ? 'text-primary dark:text-primary-light' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light',
                  'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors'
                )}
                onClick={(e) => handleSectionLink(e, item.href)}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
