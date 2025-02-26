import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [subscription, setSubscription] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load subscription and billing data
    const fetchBillingData = async () => {
      try {
        // In a real application, these would be API calls
        // For demo purposes, we'll use localStorage and mocked data
        
        // Get subscription data
        const storedSubscription = localStorage.getItem('subscription');
        if (storedSubscription) {
          setSubscription(JSON.parse(storedSubscription));
        }
        
        // Mock payment methods
        setPaymentMethods([
          {
            id: 'pm_1',
            type: 'card',
            brand: 'visa',
            last4: '4242',
            expMonth: 12,
            expYear: 2024,
            isDefault: true,
          }
        ]);
        
        // Mock invoices
        const mockInvoices = [
          {
            id: 'inv_001',
            date: '2023-07-01',
            amount: 290,
            status: 'paid',
            description: 'SaaSPro Starter Annual Plan',
          },
          {
            id: 'inv_002',
            date: '2023-06-01',
            amount: 290,
            status: 'paid',
            description: 'SaaSPro Starter Annual Plan',
          },
          {
            id: 'inv_003',
            date: '2023-05-01',
            amount: 290,
            status: 'paid',
            description: 'SaaSPro Starter Annual Plan',
          }
        ];
        
        setInvoices(mockInvoices);
      } catch (error) {
        console.error('Error fetching billing data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBillingData();
  }, []);
  
  // Calculate next billing date
  const getNextBillingDate = () => {
    if (!subscription || !subscription.startDate) return 'N/A';
    
    const startDate = new Date(subscription.startDate);
    const nextBillingDate = new Date(startDate);
    
    if (subscription.billingCycle === 'annual') {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    } else {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    }
    
    return nextBillingDate.toLocaleDateString();
  };
  
  // Format card brand for display
  const formatCardBrand = (brand) => {
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-500 dark:text-gray-400">Loading billing information...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Billing & Subscription</h1>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'payment'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'invoices'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Invoices
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                {subscription ? (
                  <div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Plan</h2>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                            {subscription.plan} Plan
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {subscription.billingCycle === 'annual' ? 'Billed annually' : 'Billed monthly'}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <p className="text-gray-700 dark:text-gray-300 mb-1">
                            Next payment: <span className="font-medium">{getNextBillingDate()}</span>
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Amount: <span className="font-medium">{formatCurrency(subscription.price)}</span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                        <Link 
                          to="/subscription"
                          className="bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-primary-dark transition"
                        >
                          Change Plan
                        </Link>
                        <button
                          className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                        >
                          Cancel Subscription
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Plan Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Subscription started</p>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Billing cycle</p>
                          <p className="text-gray-900 dark:text-white font-medium capitalize">
                            {subscription.billingCycle}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {formatCurrency(subscription.price)} / {subscription.billingCycle === 'annual' ? 'year' : 'month'}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400 mb-1">Next payment</p>
                          <p className="text-gray-900 dark:text-white font-medium">{getNextBillingDate()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">No Active Subscription</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">You don't have an active subscription yet.</p>
                    <div className="mt-6">
                      <Link 
                        to="/subscription"
                        className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition"
                      >
                        View Subscription Plans
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Payment Methods</h2>
                
                {paymentMethods.length > 0 ? (
                  <div className="space-y-4 mb-8">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center">
                          {method.brand === 'visa' && (
                            <svg className="h-8 w-12 mr-4" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="48" height="32" rx="4" fill="#F2F2F2"/>
                              <path d="M20.4 21H18L15 11H17.4L19.2 17.7L20.8 11H23.2L20.4 21Z" fill="#172B85"/>
                              <path d="M24.2 21H26.4L28 11H25.8L24.2 21Z" fill="#172B85"/>
                              <path d="M33.4 11.5C32.8 11.2 31.8 11 30.6 11C28.2 11 26.5 12.3 26.5 14.2C26.5 15.6 27.7 16.4 28.6 16.9C29.5 17.4 29.8 17.7 29.8 18.1C29.8 18.7 29.1 19 28.1 19C27.1 19 26.5 18.8 25.6 18.4L25.2 18.2L24.8 20.1C25.5 20.5 26.8 20.8 28.1 20.8C30.7 20.8 32.3 19.5 32.3 17.5C32.3 16.4 31.6 15.5 30.2 14.8C29.3 14.3 28.8 14 28.8 13.5C28.8 13.1 29.2 12.7 30.2 12.7C31 12.7 31.6 12.8 32.1 13.1L32.4 13.2L32.8 11.4L33.4 11.5Z" fill="#172B85"/>
                              <path d="M38 11H36.3C35.7 11 35.2 11.2 35 11.8L32 21H34.6L35 19.6H38C38.1 20.2 38.3 21 38.3 21H40.6L38 11ZM35.5 17.6C35.7 17 36.4 15.1 36.4 15.1C36.4 15.1 36.6 14.6 36.7 14.3L36.8 15C36.8 15 37.2 17.1 37.3 17.7H35.5V17.6Z" fill="#172B85"/>
                            </svg>
                          )}
                          <div>
                            <p className="text-gray-900 dark:text-white font-medium">
                              {formatCardBrand(method.brand)} ending in {method.last4}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Expires {method.expMonth}/{method.expYear}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {method.isDefault && (
                            <span className="mr-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">
                              Default
                            </span>
                          )}
                          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 mb-8">
                    <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">No Payment Methods</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">You don't have any payment methods added yet.</p>
                  </div>
                )}
                
                <button className="flex items-center text-primary hover:text-primary-dark">
                  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Payment Method
                </button>
              </div>
            )}
            
            {activeTab === 'invoices' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Invoices & Billing History</h2>
                
                {invoices.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left">Invoice</th>
                          <th scope="col" className="px-6 py-3 text-left">Date</th>
                          <th scope="col" className="px-6 py-3 text-left">Amount</th>
                          <th scope="col" className="px-6 py-3 text-left">Status</th>
                          <th scope="col" className="px-6 py-3 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr key={invoice.id} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                              {invoice.id}
                            </td>
                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                              {new Date(invoice.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                              {formatCurrency(invoice.amount)}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                invoice.status === 'paid' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              }`}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-primary hover:text-primary-dark text-sm font-medium">
                                Download PDF
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">No Invoices</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">You don't have any invoices yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;