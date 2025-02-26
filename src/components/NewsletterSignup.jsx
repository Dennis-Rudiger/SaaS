import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your backend API
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // if (!response.ok) throw new Error('Subscription failed');
      
      setStatus({ submitting: false, success: true, error: null });
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({ 
        submitting: false, 
        success: false, 
        error: error.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-2 flex rounded-md shadow-sm">
          <input
            type="email"
            name="email"
            id="email-address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-primary focus:border-primary sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
            disabled={status.submitting}
          />
          <button
            type="submit"
            disabled={status.submitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {status.submitting ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </form>
      {status.success && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          Thanks for subscribing!
        </p>
      )}
      {status.error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {status.error}
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
