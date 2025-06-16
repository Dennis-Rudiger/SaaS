import React, { useEffect, useRef, useState } from 'react';
import { subscriptionService } from '../services/subscriptionService';

const PayPalSubscribeButton = ({ planId, onSuccess, onError, className }) => {
  const paypalButtonRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initPayPalButton = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!planId) {
          throw new Error('Plan ID is required');
        }

        // Clear any existing PayPal buttons
        if (paypalButtonRef.current) {
          paypalButtonRef.current.innerHTML = '';
        }

        // Get the button renderer from our service
        const renderButton = await subscriptionService.createSubscription(planId);
        
        // Render the button
        renderButton(paypalButtonRef.current, (data) => {
          if (onSuccess) onSuccess(data);
        });
        
      } catch (err) {
        console.error('PayPal button initialization error:', err);
        setError(err.message || 'Failed to initialize PayPal');
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    };

    initPayPalButton();
  }, [planId, onSuccess, onError]);

  return (
    <div className={className}>
      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 p-4 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <div ref={paypalButtonRef} className={loading ? 'hidden' : ''}></div>
    </div>
  );
};

export default PayPalSubscribeButton;
