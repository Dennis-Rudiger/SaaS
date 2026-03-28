import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const StripeCheckoutForm = ({ selectedPlan, billingCycle }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !user) {
      return;
    }

    setIsLoading(true);
    setError(null);

    // Create a PaymentMethod with Stripe
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name,
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setIsLoading(false);
    } else {
      // Simulate successful backend confirmation
      console.log('PaymentMethod created:', paymentMethod.id);
      
      try {
        // Fetch the corresponding tier from our database we seeded earlier!
        let { data: tierData } = await supabase
          .from('subscription_tiers')
          .select('id')
          .ilike('name', `%${selectedPlan.name.substring(0, 3)}%`)
          .limit(1)
          .single();

        let realTierId = tierData?.id;

        // If for some reason we can't find it, we need to default to something or fail
        if (!realTierId) {
           console.warn('Could not find tier in DB, using a fallback tier.');
           const { data: firstTier } = await supabase.from('subscription_tiers').select('id').limit(1).single();
           realTierId = firstTier?.id;
        }

        // Calculate next billing date
        const endDate = new Date();
        if (billingCycle === 'annual') {
          endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
          endDate.setMonth(endDate.getMonth() + 1);
        }

        // Check if user already has a trial/subscription record
        const { data: existingSub } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .single();

        let subError;
        if (existingSub) {
          // Update existing
          const { error: updateError } = await supabase
            .from('subscriptions')
            .update({
              tier_id: realTierId,
              status: 'active',
              stripe_subscription_id: 'sub_dummy_' + paymentMethod.id,
              current_period_start: new Date().toISOString(),
              current_period_end: endDate.toISOString(),
            })
            .eq('user_id', user.id);
          subError = updateError;
        } else {
          // Insert new
          const { error: insertError } = await supabase
            .from('subscriptions')
            .insert([{
              user_id: user.id,
              tier_id: realTierId,
              status: 'active',
              stripe_subscription_id: 'sub_dummy_' + paymentMethod.id,
              current_period_start: new Date().toISOString(),
              current_period_end: endDate.toISOString(),
            }]);
          subError = insertError;
        }

        if (subError) throw subError;

        // Store basic info for the frontend UI components
        localStorage.setItem('subscription', JSON.stringify({
          plan: selectedPlan.id,
          billingCycle,
          status: 'active',
          startDate: new Date().toISOString(),
          price: billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice
        }));

        // Redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        console.error("Failed to insert subscription to Supabase: ", err);
        setError("Payment verified, but failed to setup database subscription. Contact support.");
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="cardName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="John Doe"
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Card Details
          </label>
          <div className="p-4 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }} 
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Pay ${billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice} ${billingCycle === 'annual' ? '/year' : '/month'}`
          )}
        </button>
      </div>
    </form>
  );
};

export default StripeCheckoutForm;