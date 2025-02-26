import React, { useState } from 'react';

const ContactForm = () => {
  const initialFormState = {
    name: '',
    email: '',
    company: '',
    message: '',
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let formErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      formErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        formErrors.email = 'Please enter a valid email address';
      }
    }
    
    // Message validation
    if (!formData.message.trim()) {
      formErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      formErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitted(true);
        setFormData(initialFormState);
        setIsSubmitting(false);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsSubmitting(false);
        setErrors({
          submit: 'There was an error submitting your message. Please try again later.',
        });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      {submitted ? (
        <div className="text-center py-16">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your message has been received. We'll get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              disabled={isSubmitting}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              disabled={isSubmitting}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
          </div>
          
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;