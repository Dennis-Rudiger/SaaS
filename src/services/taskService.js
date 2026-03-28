import { supabase } from '../utils/supabaseClient';

export const getUserTasks = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('tasks')
    .select('*, project:projects(id, name)')
    .or(`created_by.eq.${user.id},assignee_id.eq.${user.id}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return { data, error: null };
};

export const createTask = async (taskData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const newTask = {
    ...taskData,
    created_by: user.id,
    assignee_id: taskData.assignee_id || user.id,
    status: taskData.status || 'pending',
  };

  const { data, error } = await supabase
    .from('tasks')
    .insert([newTask])
    .select('*, project:projects(id, name)');

  if (error) throw error;
  return { data: data[0], error: null };
};

export const updateTask = async (taskId, taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(taskData)
    .eq('id', taskId)
    .select('*, project:projects(id, name)')
    .single();

  if (error) throw error;
  return { data, error: null };
};

export const subscribeToTasks = (callback) => {
  return supabase
    .channel('tasks-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, callback)
    .subscribe();
};
