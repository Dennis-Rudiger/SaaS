import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { title: 'Features', href: '/#features' }, // Changed to link to section on landing page
      { title: 'Security', href: '/security' },
      { title: 'Pricing', href: '/#pricing' }, // Also updated pricing to point to section
      { title: 'Roadmap', href: '/roadmap' }
    ],
    company: [
      { title: 'About', href: '/#home' }, // Changed to link to hero section
      { title: 'Careers', href: '/careers' },
      { title: 'Blog', href: '/blog' },
      { title: 'Press', href: '/press' }
    ],
    resources: [
      { title: 'Documentation', href: '/docs' },
      { title: 'Guides', href: '/guides' },
      { title: 'Support', href: '/support' },
      { title: 'API', href: '/api' }
    ],
    legal: [
      { title: 'Privacy', href: '/privacy' },
      { title: 'Terms', href: '/terms' },
      { title: 'Cookie Policy', href: '/cookie-policy' },
      { title: 'GDPR', href: '/gdpr' }
    ]
  };

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  // Helper function to handle anchor links and smooth scrolling
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

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              SaaSPro
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Streamline your workflow, collaborate effectively, and achieve your project goals with our all-in-one platform.
            </p>
            <div className="mt-6">
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Product
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {footerLinks.product.map((item) => (
                  <li key={item.title}>
                    <Link 
                      to={item.href} 
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      onClick={(e) => handleSectionLink(e, item.href)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Company
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {footerLinks.company.map((item) => (
                  <li key={item.title}>
                    <Link 
                      to={item.href} 
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      onClick={(e) => handleSectionLink(e, item.href)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Resources
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {footerLinks.resources.map((item) => (
                  <li key={item.title}>
                    <Link to={item.href} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Legal
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {footerLinks.legal.map((item) => (
                  <li key={item.title}>
                    <Link to={item.href} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Get the latest news and updates from SaaSPro.
            </p>
            <div className="mt-4">
              <NewsletterSignup />
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Cookie Settings
            </Link>
          </div>
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 md:mt-0 md:order-1">
            &copy; {currentYear} SaaSPro, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
