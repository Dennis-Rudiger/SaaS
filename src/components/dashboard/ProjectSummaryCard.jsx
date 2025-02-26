import React from 'react';
import { Link } from 'react-router-dom';

const ProjectSummaryCard = ({ project }) => {
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const statusColorClass = {
    completed: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    in_progress: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    on_hold: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
  };

  const statusClass = statusColorClass[project.status] || statusColorClass.in_progress;
  const daysRemaining = getDaysRemaining(project.dueDate);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <Link to={`/projects/${project.id}`} className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors">
          {project.name}
        </Link>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
          {project.status === 'in_progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
        {project.description}
      </p>

      <div className="mt-auto">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={`${daysRemaining < 0 ? 'text-red-600 dark:text-red-400' : daysRemaining <= 7 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'}`}>
              {project.status === 'completed' ? 'Completed' : 
                daysRemaining < 0 ? `${Math.abs(daysRemaining)}d overdue` :
                daysRemaining === 0 ? 'Due today' : 
                `${daysRemaining}d remaining`
              }
            </span>
          </div>
          <div className="flex -space-x-1">
            {project.members.slice(0, 3).map((member, index) => (
              <img 
                key={index}
                className="w-6 h-6 rounded-full border border-white dark:border-gray-800 object-cover"
                src={member.avatar}
                alt={member.name}
                title={member.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                }}
              />
            ))}
            {project.members.length > 3 && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 text-xs font-medium text-gray-800 dark:text-gray-200 border border-white dark:border-gray-800">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummaryCard;
