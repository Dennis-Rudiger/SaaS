import { supabase } from '../utils/supabaseClient';

/**
 * Create a user profile in the database
 * @param {Object} profileData - The profile data to create
 * @returns {Promise} - The created profile or error
 */
export const createUserProfile = async (profileData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ 
        id: profileData.id,
        first_name: profileData.first_name,
        last_name: profileData.last_name, 
        avatar_url: profileData.avatar_url || null,
        title: profileData.title || null,
        company: profileData.company || null
      }])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating profile:', error);
    return { data: null, error };
  }
};

/**
 * Get a user profile by ID
 * @param {string} userId - The user ID
 * @returns {Promise} - The user profile or error
 */
export const getUserProfile = async (userId) => {
  try {
    if (!userId) throw new Error('User ID is required');
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { data: null, error };
  }
};

/**
 * Update a user profile
 * @param {string} userId - The user ID
 * @param {Object} profileData - The profile data to update
 * @returns {Promise} - The updated profile or error
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    if (!userId) throw new Error('User ID is required');
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        avatar_url: profileData.avatar_url,
        title: profileData.title,
        company: profileData.company,
        updated_at: new Date()
      })
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { data: null, error };
  }
};
