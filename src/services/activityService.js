import { supabase } from '../utils/supabaseClient';

export const getRecentActivity = async () => {
  try {
    const activities = [];

    // Fetch recent projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!projectsError && projects) {
      projects.forEach(p => {
        activities.push({
          id: 'proj-' + p.id,
          type: 'project',
          content: 'Created new project',
          target: p.name,
          time: new Date(p.created_at).getTime(),
          link: '/projects/' + p.id,
          user_id: p.owner_id
        });
      });
    }

    // Fetch recent tasks
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!tasksError && tasks) {
      tasks.forEach(t => {
        activities.push({
          id: 'task-' + t.id,
          type: t.status === 'Completed' ? 'task_completed' : 'task_assigned',
          content: t.status === 'Completed' ? 'Completed task' : 'Created task',
          target: t.title,
          time: new Date(t.created_at).getTime(),
          link: t.project_id ? '/projects/' + t.project_id + '/tasks/' + t.id : '#',
          user_id: t.created_by
        });
      });
    }

    // Fetch recent documents
    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!docsError && documents) {
      documents.forEach(d => {
        activities.push({
          id: 'doc-' + d.id,
          type: 'file_upload',
          content: 'Uploaded document',
          target: d.name,
          time: new Date(d.created_at).getTime(),
          link: '/documents',
          user_id: d.uploaded_by
        });
      });
    }

    // Sort all activities by time descending
    activities.sort((a, b) => b.time - a.time);
    
    // Take top 6
    const topActivities = activities.slice(0, 6);

    // Fetch profiles for these users
    const userIds = [...new Set(topActivities.map(a => a.user_id).filter(id => id))];
    
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, avatar_url')
        .in('id', userIds);
      
      const profileMap = {};
      if (profiles) {
        profiles.forEach(p => {
          profileMap[p.id] = {
            name: p.first_name ? (p.first_name + ' ' + (p.last_name || '')).trim() : 'Unknown User',
            avatar: p.avatar_url || 'https://ui-avatars.com/api/?name=' + (p.first_name || 'U')
          };
        });
      }

      topActivities.forEach(a => {
        a.user = profileMap[a.user_id] || {
          name: 'Unknown User',
          avatar: 'https://ui-avatars.com/api/?name=U'
        };
      });
    } else {
      topActivities.forEach(a => {
        a.user = { name: 'System', avatar: 'https://ui-avatars.com/api/?name=S' };
      });
    }

    // Format time relatively
    topActivities.forEach(a => {
      const diffMs = Date.now() - a.time;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffMins < 60) a.timeStr = Math.max(1, diffMins) + ' mins ago';
      else if (diffHours < 24) a.timeStr = diffHours + ' hours ago';
      else if (diffDays === 1) a.timeStr = 'Yesterday';
      else a.timeStr = diffDays + ' days ago';
    });

    return { activities: topActivities, error: null };
  } catch (error) {
    console.error('Error fetching activity:', error);
    return { activities: [], error };
  }
};
