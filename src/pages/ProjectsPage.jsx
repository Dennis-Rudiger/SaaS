import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import ProjectSummaryCard from '../components/dashboard/ProjectSummaryCard';

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
  {
    id: 'proj-4',
    name: 'Product Roadmap',
    description: 'Strategic planning for Q4 product features and development milestones.',
    dueDate: '2023-09-30',
    progress: 25,
    members: [
      { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
      { name: 'Emily Chen', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
      { name: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    ],
    status: 'in_progress',
    tasks: { total: 16, completed: 4 },
    tags: ['Planning', 'Strategy']
  },
  {
    id: 'proj-5',
    name: 'Customer Survey Analysis',
    description: 'Analyzing results from the quarterly customer satisfaction survey.',
    dueDate: '2023-08-20',
    progress: 90,
    members: [
      { name: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
      { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    ],
    status: 'in_progress',
    tasks: { total: 12, completed: 10 },
    tags: ['Research', 'Analysis']
  },
  {
    id: 'proj-6',
    name: 'Security Audit',
    description: 'Comprehensive security review of all company systems and infrastructure.',
    dueDate: '2023-10-15',
    progress: 10,
    members: [
      { name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
      { name: 'Emily Chen', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
    ],
    status: 'todo',
    tasks: { total: 15, completed: 1 },
    tags: ['Security', 'Compliance']
  }
];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Projects
            </motion.h1>
            <Link 
              to="/projects/new"
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Project
            </Link>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md"
                  placeholder="Search projects"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-2 text-sm rounded-l-md ${
                    filterStatus === 'all' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  All ({projects.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('in_progress')}
                  className={`px-3 py-2 text-sm ${
                    filterStatus === 'in_progress' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  In Progress ({statusCounts.in_progress || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('completed')}
                  className={`px-3 py-2 text-sm ${
                    filterStatus === 'completed' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Completed ({statusCounts.completed || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('todo')}
                  className={`px-3 py-2 text-sm rounded-r-md ${
                    filterStatus === 'todo' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  To Do ({statusCounts.todo || 0})
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <ProjectSummaryCard project={project} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No projects found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery ? `No projects matching "${searchQuery}"` : 'No projects available in this category'}
                </p>
                <div className="mt-6">
                  <Link
                    to="/projects/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create a new project
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
