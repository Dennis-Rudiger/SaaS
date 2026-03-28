import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../services/profileService';
import { getUserProjects } from '../services/projectService';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import ProjectsOverviewCard from '../components/dashboard/ProjectsOverviewCard';
import TasksCard from '../components/dashboard/TasksCard';
import UpcomingEventsCard from '../components/dashboard/UpcomingEventsCard';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import TaskForm from '../components/dashboard/TaskForm';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Link, useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';
import { AnimatePresence } from 'framer-motion';

const DashboardPage = ({ openNewTask = false }) => {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(openNewTask);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    tasksInProgress: 0,
    upcomingDeadlines: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      if (user) {
        try {
          // Fetch user profile
          const { data: profileData } = await getUserProfile(user.id);
          setProfile(profileData);

          // Fetch real projects from Supabase
          const { data: projectsData, error: projectsError } = await getUserProjects();
          
          if (!projectsError && projectsData) {
            setProjects(projectsData);
            
            // Calculate stats based on real data
            const activeProjects = projectsData.filter(p => p.status !== 'completed').length;
            const completed = projectsData.filter(p => p.status === 'completed').length;
            
            // Just counting total tasks for these dummy stats, you can expand this later to fetch real tasks
            let totalTasks = 0;
            projectsData.forEach(p => {
              if (p.tasks && p.tasks[0]) {
                totalTasks += p.tasks[0].count || 0;
              }
            });

            setStats({
              totalProjects: activeProjects,
              completedProjects: completed,
              tasksInProgress: totalTasks,
              upcomingDeadlines: projectsData.filter(p => p.due_date && new Date(p.due_date) > new Date()).length,
            });
          }
        } catch (error) {
          console.error("Error loading profile data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadDashboardData();
  }, [user]);

  // If the route passes openNewTask prop, sync it
  useEffect(() => {
    setShowTaskForm(openNewTask);
  }, [openNewTask]);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      setShowTaskForm(false);
      navigate('/dashboard'); // reset URL
      setRefreshTrigger(prev => prev + 1); // trigger reload of tasks
    } catch (error) {
      console.error('Failed to create task:', error);
      alert('Failed to create task');
    }
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      {subscription?.status === 'trialing' && (
        <div className="bg-primary bg-opacity-10 border border-primary text-primary-dark dark:text-primary-light px-4 py-3 rounded-md mb-6 flex justify-between items-center">
          <div>
            <strong>Free Trial Active:</strong> You have {Math.max(1, Math.ceil((new Date(subscription.trial_end) - new Date()) / (1000 * 60 * 60 * 24)))} days left in your 14-day free trial.
          </div>
          <Link to="/subscription" className="text-sm font-semibold bg-primary text-white px-3 py-1.5 rounded hover:bg-primary-dark transition-colors">
            Upgrade Now
          </Link>
        </div>
      )}

      <DashboardHeader title="Dashboard" subtitle="Welcome back" />
      
      {/* Welcome message for first time users or returning users */}
      {profile && <WelcomeCard profile={profile} />}

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Active Projects"
          value={stats.totalProjects}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          color="blue"
        />
        <StatCard 
          title="Completed Projects" 
          value={stats.completedProjects} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
          color="green"
        />
        <StatCard 
          title="Tasks In Progress" 
          value={stats.tasksInProgress} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="purple"
        />
        <StatCard 
          title="Upcoming Deadlines" 
          value={stats.upcomingDeadlines} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          color="red"
        />
      </div>
      
      {/* Main content - 2 column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Projects and Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <ProjectsOverviewCard projects={projects} />
          <RecentActivityCard />
        </div>
        
        {/* Column 2: Tasks and Upcoming Events */}
        <div className="space-y-6">
          <TasksCard key={refreshTrigger} />
          <UpcomingEventsCard />
        </div>
      </div>

      <AnimatePresence>
        {showTaskForm && (
          <TaskForm 
            onClose={handleCloseTaskForm} 
            onSubmit={handleCreateTask} 
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default DashboardPage;
