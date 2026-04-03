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

export const createTeamInvitation = async (teamId, role = 'member', emails = []) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // If no emails, just generate generic one
    if (emails.length === 0) {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const { data, error } = await supabase
        .from('team_invitations')
        .insert([{ team_id: teamId, token, role, invited_by: user.id }])
        .select('*, team:teams(name)');
      if (error) throw error;
      return { data: data, error: null };
    }

    // Generate tokens for each email
    const inserts = emails.map(email => ({
      team_id: teamId,
      token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      role,
      invited_by: user.id,
      email
    }));

    const { data, error } = await supabase
      .from('team_invitations')
      .insert(inserts)
      .select('*, team:teams(name)');

    if (error) throw error;
    // (Optional) We could call a backend edge function here to send real emails to these addresses.
    return { data: data, error: null };
  } catch (error) {
    console.error('Error creating team invitation:', error);
    return { data: null, error };
  }
};

export const getTeamInvitations = async (teamId) => {
  try {
    const { data, error } = await supabase
      .from('team_invitations')
      .select('*, invited_by_profile:profiles!invited_by(first_name, last_name)')
      .eq('team_id', teamId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching team invitations:', error);
    return { data: null, error };
  }
};

export const deleteTeamInvitation = async (invitationId) => {
  try {
    const { error } = await supabase
      .from('team_invitations')
      .delete()
      .eq('id', invitationId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting invitation:', error);
    return { success: false, error: null };
  }
};

export const acceptTeamInvitation = async (token) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // 1. Get the invitation
    const { data: invitations, error: invError } = await supabase
      .from('team_invitations')
      .select('team_id, role')
      .eq('token', token)
      .single();

    if (invError || !invitations) throw new Error('Invalid or expired invitation token');

    // 2. Add user to the team
    const { error: addError } = await supabase
      .from('team_members')
      .insert([{ team_id: invitations.team_id, user_id: user.id, role: invitations.role }]);

    if (addError && addError.code !== '23505') { // Ignore unique violation if already member
      throw addError;
    }

    // 3. Optional: Delete the token after use based on design requirements (e.g., single use vs multi-use)
    // We will leave it for now or delete it if single-use. Let's make it single-use.
    await supabase.from('team_invitations').delete().eq('token', token);

    return { success: true, teamId: invitations.team_id, error: null };
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return { success: false, error: error.message };
  }
};
