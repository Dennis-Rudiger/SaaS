import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../services/profileService';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import ProjectsOverviewCard from '../components/dashboard/ProjectsOverviewCard';
import TasksCard from '../components/dashboard/TasksCard';
import UpcomingEventsCard from '../components/dashboard/UpcomingEventsCard';
import WelcomeCard from '../components/dashboard/WelcomeCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    tasksInProgress: 0,
    upcomingDeadlines: 0,
  });

  useEffect(() => {
    const loadProfileData = async () => {
      if (user) {
        try {
          // Fetch user profile
          const { data: profileData } = await getUserProfile(user.id);
          setProfile(profileData);

          // In a real app, you'd fetch these stats from your API
          // For now, we'll just simulate some sample data
          setStats({
            totalProjects: 5,
            completedProjects: 2,
            tasksInProgress: 12,
            upcomingDeadlines: 3,
          });
        } catch (error) {
          console.error("Error loading profile data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProfileData();
  }, [user]);

  return (
    <DashboardLayout>
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
          <ProjectsOverviewCard />
          <RecentActivityCard />
        </div>
        
        {/* Column 2: Tasks and Upcoming Events */}
        <div className="space-y-6">
          <TasksCard />
          <UpcomingEventsCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
