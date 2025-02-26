import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DarkModeToggle from '../components/DarkModeToggle';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      formErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.agreeTerms) {
      formErrors.agreeTerms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would register the user with your backend
      localStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to dashboard after successful signup
      navigate('/dashboard');
    } catch (err) {
      setSignupError('An error occurred during sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5 dark:opacity-10 z-0 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary opacity-10 dark:opacity-5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-400 opacity-10 dark:opacity-5 rounded-full filter blur-3xl"></div>
      
      <div className="absolute top-4 right-4 z-10">
        <DarkModeToggle />
      </div>
      
      <div className="w-full max-w-lg z-10">
        <div className="relative group">
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-600 rounded-lg blur opacity-25 dark:opacity-50 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          ></motion.div>
          <div className="relative px-6 pt-8 pb-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="mx-auto text-center mb-10">
              <Link to="/" className="inline-block text-center">
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-primary-dark">
                  SaaSPro
                </h2>
              </Link>
              <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sign up to get started with SaaSPro
              </p>
            </div>
            
            {signupError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900"
              >
                <p className="text-sm text-red-600 dark:text-red-400">{signupError}</p>
              </motion.div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Work email
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
                  placeholder="name@company.com"
                  disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company name <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your company"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className={`h-4 w-4 ${
                        errors.agreeTerms ? 'border-red-500 text-red-500' : 'border-gray-300 text-primary'
                      } rounded focus:ring-primary dark:border-gray-600 dark:bg-gray-700`}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="agreeTerms" className="text-sm text-gray-700 dark:text-gray-300">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:text-primary-dark">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:text-primary-dark">
                        Privacy Policy
                      </Link>
                    </label>
                    {errors.agreeTerms && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.agreeTerms}</p>}
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create account'
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
