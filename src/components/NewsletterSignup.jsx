import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset status
    setStatus(null);
    setErrorMessage('');
    
    // Validate email
    if (!email) {
      setStatus('error');
      setErrorMessage('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    // Form is valid, proceed with submission
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg pr-24 border ${
            status === 'error'
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`absolute right-1 top-1 bottom-1 px-4 rounded-md bg-primary text-white font-medium hover:bg-primary-dark transition ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
      
      {status === 'success' && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          Thank you for subscribing! Check your email for confirmation.
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
