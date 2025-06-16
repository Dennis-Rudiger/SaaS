import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample project data (in a real app, this would come from your API)
const sampleProjects = [
  { 
    id: 1, 
    name: 'Website Redesign', 
    progress: 75, 
    status: 'In Progress', 
    dueDate: '2023-12-15',
    team: [
      { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 2, name: 'Michael Lee', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
      { id: 3, name: 'Anna Garcia', avatar: 'https://randomuser.me/api/portraits/women/63.jpg' }
    ]
  },
  { 
    id: 2, 
    name: 'Mobile App Development', 
    progress: 45, 
    status: 'In Progress', 
    dueDate: '2023-12-30',
    team: [
      { id: 2, name: 'Michael Lee', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
      { id: 4, name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' }
    ]
  },
  { 
    id: 3, 
    name: 'Brand Identity Refresh', 
    progress: 90, 
    status: 'Review', 
    dueDate: '2023-12-10',
    team: [
      { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 3, name: 'Anna Garcia', avatar: 'https://randomuser.me/api/portraits/women/63.jpg' },
      { id: 5, name: 'Lisa Wong', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' }
    ]
  }
];

const ProjectsOverviewCard = () => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Review':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Projects</h3>
        <Link 
          to="/projects"
          className="text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90"
        >
          View all
        </Link>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sampleProjects.map((project) => (
          <div key={project.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
            <Link to={`/projects/${project.id}`} className="block">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                  {project.name}
                </h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex -space-x-2 overflow-hidden">
                  {project.team.slice(0, 3).map((member) => (
                    <img 
                      key={member.id}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800" 
                      src={member.avatar} 
                      alt={member.name} 
                    />
                  ))}
                  {project.team.length > 3 && (
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 ring-2 ring-white dark:ring-gray-800">
                      +{project.team.length - 3}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Due {formatDate(project.dueDate)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 text-center">
        <Link 
          to="/projects/new"
          className="text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90 inline-flex items-center"
        >
          <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create new project
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectsOverviewCard;
