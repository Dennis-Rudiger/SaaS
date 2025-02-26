import React, { useState } from 'react';
import { validateEmail } from '../utils/formValidation';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      setStatus({
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    setLoading(true);
    setStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would submit to an API endpoint here
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Subscription failed');
      // }
      
      // Success
      setStatus({
        success: true,
        message: 'Thank you for subscribing!'
      });
      setEmail('');
    } catch (error) {
      setStatus({
        success: false,
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="sm:flex">
        <div className="min-w-0 flex-1">
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            type="email"
            autoComplete="email"
            required
            className="block w-full px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <button
            type="submit"
            disabled={loading}
            className={`block w-full px-4 py-2 rounded-md text-white ${
              loading ? 'bg-primary-light cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
            } font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
      
      {status && (
        <div className={`mt-3 text-sm ${status.success ? 'text-green-600' : 'text-red-600'}`}>
          {status.message}
        </div>
      )}
      
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
      </p>
    </div>
  );
};

export default NewsletterSignup;
