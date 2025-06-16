import { supabase } from '../utils/supabaseClient';
import { initPayPalClient } from '../utils/paypalClient';

export const subscriptionService = {
  // Create a PayPal subscription
  createSubscription: async (planId) => {
    try {
      // Initialize PayPal client
      const paypal = await initPayPalClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');
      
      // Return the PayPal button renderer function
      return (domElement, onApprove) => {
        // Render the PayPal button
        return paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'blue',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: (data, actions) => {
            return actions.subscription.create({
              plan_id: planId,
              subscriber: {
                email_address: user.email
              }
            });
          },
          onApprove: async (data, actions) => {
            // Save subscription info to database
            const { error } = await supabase
              .from('subscriptions')
              .insert({
                user_id: user.id,
                paypal_subscription_id: data.subscriptionID,
                status: 'ACTIVE',
                tier_id: planId, // Map this to your tier ID in your database
              });
            
            if (error) throw error;
            
            // Call the success callback
            if (onApprove) onApprove(data);
            
            return data;
          }
        }).render(domElement);
      };
    } catch (error) {
      console.error('Error setting up subscription:', error);
      throw error;
    }
  },
  
  // Get user subscription
  getUserSubscription: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          tier:subscription_tiers(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'ACTIVE')
        .single();
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return { data: null, error };
    }
  },
  
  // Cancel subscription
  cancelSubscription: async (subscriptionId) => {
    try {
      // This would call your backend API that uses PayPal's API to cancel
      // For now this is just updating the status in our database
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'CANCELLED' })
        .eq('id', subscriptionId);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      return { error };
    }
  }
};
