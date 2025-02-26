import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectSummaryCard from './ProjectSummaryCard';

const projects = [
  {
    id: 'proj-1',
    name: 'Marketing Website',
    description: 'Redesign and development of the company marketing website with updated branding.',
    dueDate: '2023-09-15',
    progress: 65,
    members: [
      { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { name: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
      { name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
    ],
    status: 'in_progress',
    tasks: { total: 24, completed: 16 },
    tags: ['Design', 'Development']
  },
  {
    id: 'proj-2',
    name: 'Mobile App Development',
    description: 'Building a cross-platform mobile application for inventory management.',
    dueDate: '2023-11-30',
    progress: 40,
    members: [
      { name: 'Emily Chen', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
      { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    ],
    status: 'in_progress',
    tasks: { total: 32, completed: 12 },
    tags: ['Mobile', 'React Native']
  },
  {
    id: 'proj-3',
    name: 'Q3 Financial Report',
    description: 'Preparing the financial report for Q3 with all required documents and analysis.',
    dueDate: '2023-08-10',
    progress: 100,
    members: [
      { name: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
      { name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
    ],
    status: 'completed',
    tasks: { total: 18, completed: 18 },
    tags: ['Finance', 'Reports']
  },
];

const RecentProjects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Recent Projects</h2>
        <Link to="/projects" className="text-sm font-medium text-primary hover:text-primary-dark">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {projects.slice(0, 3).map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className={`transform transition-all duration-300 ${
              hoveredProject === project.id ? 'shadow-lg scale-102' : 'shadow-sm'
            }`}
          >
            <ProjectSummaryCard project={project} />
          </motion.div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-4">
        <Link 
          to="/projects/new"
          className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Project
        </Link>
      </div>
    </motion.div>
  );
};

export default RecentProjects;
