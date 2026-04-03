import { supabase } from '../utils/supabaseClient';

export const getNotifications = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
       console.error('Error fetching notifications details:', error);
       if (error.code === '42P01') {
         alert('Table "notifications" does not exist! Please run the SQL setup script inside your Supabase SQL editor.'); 
       }
       throw error;
    }
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { data: null, error };
  }
};

export const markAsRead = async (id) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return { success: false, error: null };
  }
};

export const markAllAsRead = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error marking all as read:', error);
    return { success: false, error: null };
  }
};

export const createTestNotification = async (notification) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const newNotification = {
      ...notification,
      user_id: user.id
    };

    const { data, error } = await supabase
      .from('notifications')
      .insert([newNotification])
      .select();

    if (error) {
      alert(`Supabase Error (${error.code}): ${error.message}\n\nPlease make sure you ran the SQL setup script in your Supabase dashboard.`
);
      throw error;
    }
    return { data: data[0], error: null };
  } catch (error) {
    console.error('Error creating notification:', error);
    return { data: null, error };
  }
};
