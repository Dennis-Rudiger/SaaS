import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import { getUserProjects, createProject, subscribeToProjects } from '../services/projectService';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    
    // Subscribe to real-time updates
    const subscription = subscribeToProjects((payload) => {
      console.log('Project change detected:', payload);
      fetchProjects(); // Refetch projects when changes are detected
    });
    
    // Clean up subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await getUserProjects();
    
    if (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please try again.');
    } else {
      setProjects(data || []);
      setError(null);
    }
    
    setLoading(false);
  };

  const handleCreateProject = async (projectData) => {
    try {
      console.log("Creating project with data:", projectData);
      
      const { data, error } = await createProject(projectData);
      
      if (error) {
        console.error('Error in createProject:', error);
        return { 
          success: false, 
          message: error.message || 'Failed to create project',
          error 
        };
      }
      
      if (!data) {
        console.error('No data returned from createProject');
        return { 
          success: false, 
          message: 'Project creation failed. Please try again.'
        };
      }
      
      console.log("Project created successfully:", data);
      
      // Add the new project to the state
      setProjects(prevProjects => [data, ...prevProjects]);
      setShowProjectForm(false);
      
      return { success: true };
    } catch (err) {
      console.error('Unexpected error in handleCreateProject:', err);
      return { 
        success: false, 
        message: `Unexpected error: ${err.message || 'Unknown error'}` 
      };
    }
  };

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const filterProjects = (projects) => {
    if (filter === 'all') return projects;
    return projects.filter(project => project.status.toLowerCase() === filter);
  };

  const filteredProjects = filterProjects(projects);

  const renderHeader = () => (
    <DashboardHeader 
      title="Projects" 
      subtitle="Manage and track all your projects"
      actions={
        <button
          onClick={() => setShowProjectForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors"
        >
          <svg className="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Project
        </button>
      }
    />
  );

  return (
    <DashboardLayout>
      {renderHeader()}
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['all', 'active', 'completed', 'on hold'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            } border border-gray-200 dark:border-gray-700 transition-colors`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Projects list */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-md">
          <p className="text-red-800 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={() => handleViewProject(project.id)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-12"
              >
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-1">No projects found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {filter === 'all' ? 'Get started by creating your first project.' : `No ${filter} projects found.`}
                </p>
                {filter === 'all' && (
                  <button
                    onClick={() => setShowProjectForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors"
                  >
                    <svg className="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Your First Project
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      
      {/* Project creation modal */}
      <AnimatePresence>
        {showProjectForm && (
          <ProjectForm 
            onClose={() => setShowProjectForm(false)}
            onSubmit={handleCreateProject}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default ProjectsPage;
