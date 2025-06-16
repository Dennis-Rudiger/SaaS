import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../utils/supabaseClient';

// Create the context
const SubscriptionContext = createContext(null);

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch subscription data from Supabase
        const { data, error } = await supabase
          .from('subscriptions')
          .select(`
            *,
            tier:subscription_tiers(*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 is when no rows are returned
          console.error("Error fetching subscription:", error);
          throw error;
        }

        // When a user signs up, create a trial subscription if they don't have one
        if (!data && user) {
          // Get the starter tier ID
          const { data: tierData, error: tierError } = await supabase
            .from('subscription_tiers')
            .select('id')
            .eq('name', 'Starter')
            .single();

          if (tierError) {
            console.error("Error fetching starter tier:", tierError);
            throw tierError;
          }

          // Calculate trial end date (14 days from now)
          const trialEnd = new Date();
          trialEnd.setDate(trialEnd.getDate() + 14);

          // Create trial subscription
          const { data: newSubscription, error: createError } = await supabase
            .from('subscriptions')
            .insert({
              user_id: user.id,
              tier_id: tierData.id,
              status: 'trialing',
              trial_end: trialEnd.toISOString(),
              current_period_start: new Date().toISOString(),
              current_period_end: trialEnd.toISOString(),
            })
            .select(`*, tier:subscription_tiers(*)`)
            .single();

          if (createError) {
            console.error("Error creating trial subscription:", createError);
            throw createError;
          }

          setSubscription(newSubscription);
        } else {
          setSubscription(data);
        }
      } catch (error) {
        console.error("Subscription error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();

    // Set up real-time subscription to subscription changes
    const subscriptionListener = supabase
      .channel('subscription_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'subscriptions',
          filter: user ? `user_id=eq.${user.id}` : undefined
        }, 
        (payload) => {
          if (payload.new) {
            setSubscription(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      subscriptionListener.unsubscribe();
    };
  }, [user]);

  // Check if subscription is active
  const isSubscriptionActive = Boolean(
    subscription && 
    (subscription.status === 'active' || 
     subscription.status === 'trialing')
  );

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        isActive: isSubscriptionActive,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  
  if (context === null) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  
  return context;
};
