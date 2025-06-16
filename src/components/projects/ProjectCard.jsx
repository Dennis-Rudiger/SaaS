import React from 'react';
import { format, isPast, isFuture } from 'date-fns';

const ProjectCard = ({ project, onClick }) => {
  if (!project) {
    console.error('ProjectCard received null or undefined project');
    return null;
  }
  
  const { name, description, status, due_date, tasks, team_members = [] } = project;
  
  // Extract tasks count - handle different response formats
  const tasksCount = Array.isArray(tasks) ? tasks.length : 
                     (tasks && typeof tasks === 'object' && tasks.count !== undefined ? tasks.count : 0);
  
  // Format date - handle null safely
  const formattedDate = due_date ? format(new Date(due_date), 'MMM d, yyyy') : 'No deadline';
  
  // Calculate if project is overdue - handle null safely
  const isOverdue = due_date && status !== 'completed' && isPast(new Date(due_date));
  
  // Check if deadline is approaching (within 3 days)
  const deadlineApproaching = () => {
    if (!due_date || status === 'completed') return false;
    
    const dueDate = new Date(due_date);
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);
    
    return isFuture(dueDate) && isPast(dueDate, threeDaysFromNow);
  };
  
  // Function to get status badge classes
  const getStatusBadgeClass = () => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'on hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Extract team members from the nested structure
  const extractTeamMembers = () => {
    if (!team_members || !Array.isArray(team_members) || team_members.length === 0) return [];
    
    try {
      // Since team_members is a nested structure, we need to flatten it
      const members = [];
      team_members.forEach(teamLink => {
        if (teamLink && teamLink.team && teamLink.team.members) {
          teamLink.team.members.forEach(memberLink => {
            if (memberLink && memberLink.user) {
              members.push(memberLink.user);
            }
          });
        }
      });
      
      return members;
    } catch (error) {
      console.error('Error extracting team members:', error);
      return [];
    }
  };
  
  const teamMembers = extractTeamMembers();

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass()}`}>
            {status || 'Unknown'}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
          {description || 'No description provided'}
        </p>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
          {/* Due date */}
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
              {formattedDate}
              {isOverdue && ' (Overdue)'}
              {deadlineApproaching() && ' (Soon)'}
            </span>
          </div>
          
          {/* Tasks count */}
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>
              {tasksCount} task{tasksCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
      
      {teamMembers.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              {teamMembers.slice(0, 3).map((member, index) => (
                <img 
                  key={member.id || index}
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-750" 
                  src={member.avatar_url || `https://ui-avatars.com/api/?name=${member.first_name}+${member.last_name}&background=random`}
                  alt={`${member.first_name} ${member.last_name}`}
                />
              ))}
              {teamMembers.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-750">
                  +{teamMembers.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{teamMembers.length} Team member{teamMembers.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
