import { supabase } from '../utils/supabaseClient';

/**
 * Get all projects for the current user
 * @returns {Promise} Projects data or error
 */
export const getUserProjects = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        tasks:tasks(count),
        owner:profiles(first_name, last_name, avatar_url),
        team_members:project_teams(
          team:teams(
            members:team_members(
              user:profiles(id, first_name, last_name, avatar_url)
            )
          )
        )
      `)
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { data: null, error };
  }
};

/**
 * Create a new project
 * @param {Object} projectData - Project data to create
 * @returns {Promise} Created project data or error
 */
export const createProject = async (projectData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    console.log('Creating project with data:', projectData);
    
    // Add the owner_id to the project data
    const newProject = {
      ...projectData,
      owner_id: user.id,
      status: projectData.status || 'active',
    };
    
    // Handle empty dates - set them to null for the database
    if (!newProject.start_date) delete newProject.start_date;
    if (!newProject.due_date) delete newProject.due_date;
    
    const { data, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select();

    if (error) throw error;
    
    console.log('Project created successfully:', data);
    return { data: data[0], error: null };
  } catch (error) {
    console.error('Error creating project:', error);
    return { data: null, error };
  }
};

/**
 * Get a single project by ID
 * @param {string} projectId - Project ID
 * @returns {Promise} Project data or error
 */
export const getProject = async (projectId) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        tasks:tasks(*),
        owner:profiles(first_name, last_name, avatar_url),
        team_members:project_teams(
          team:teams(
            members:team_members(
              user:profiles(id, first_name, last_name, avatar_url)
            )
          )
        )
      `)
      .eq('id', projectId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { data: null, error };
  }
};

/**
 * Update an existing project
 * @param {string} projectId - Project ID
 * @param {Object} projectData - Project data to update
 * @returns {Promise} Updated project data or error
 */
export const updateProject = async (projectId, projectData) => {
  try {
    // Handle empty dates - set them to null for the database
    const updateData = { ...projectData };
    if (!updateData.start_date) delete updateData.start_date;
    if (!updateData.due_date) delete updateData.due_date;
    
    updateData.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating project:', error);
    return { data: null, error };
  }
};

/**
 * Delete a project
 * @param {string} projectId - Project ID
 * @returns {Promise} Success status or error
 */
export const deleteProject = async (projectId) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error };
  }
};

/**
 * Subscribe to real-time changes to projects
 * @param {Function} callback - Function to call when projects change
 * @returns {Object} Subscription object
 */
export const subscribeToProjects = (callback) => {
  const subscription = supabase
    .channel('projects-channel')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'projects' 
    }, (payload) => {
      callback(payload);
    })
    .subscribe();
  
  return subscription;
};
