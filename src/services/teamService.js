import { supabase } from '../utils/supabaseClient';

export const getUserTeams = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('teams')
      .select('*, members:team_members(count)')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching teams:', error);
    return { data: null, error };
  }
};

export const createTeam = async (teamData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const newTeam = {
      ...teamData,
      owner_id: user.id
    };

    const { data, error } = await supabase
      .from('teams')
      .insert([newTeam])
      .select();

    if (error) throw error;

    if (data && data[0]) {
      // Add creator as admin
      await supabase.from('team_members').insert([
        { team_id: data[0].id, user_id: user.id, role: 'admin' }
      ]);
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error('Error creating team:', error);
    return { data: null, error };
  }
};

export const getTeamMembers = async (teamId) => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*, profile:profiles(first_name, last_name, avatar_url, title)')
      .eq('team_id', teamId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { data: null, error };
  }
};

export const searchUsers = async (searchTerm) => {
  try {
    if (!searchTerm || searchTerm.trim() === '') return { data: [], error: null };
    
    // We search across first_name and last_name
    const { data, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url, title')
      .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`)
      .limit(10);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error searching users:', error);
    return { data: null, error };
  }
};

export const addTeamMember = async (teamId, userId, role = 'member') => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .insert([{ team_id: teamId, user_id: userId, role }])
      .select('*, profile:profiles(first_name, last_name, avatar_url, title)');
      
    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    console.error('Error adding team member:', error);
    return { data: null, error };
  }
};

export const removeTeamMember = async (teamId, userId) => {
  try {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .match({ team_id: teamId, user_id: userId });
      
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error removing team member:', error);
    return { success: false, error };
  }
};

export const updateTeamMemberRole = async (teamId, userId, newRole) => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .update({ role: newRole })
      .match({ team_id: teamId, user_id: userId })
      .select();
      
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating team member role:', error);
    return { success: false, error };
  }
};
