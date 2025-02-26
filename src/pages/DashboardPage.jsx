import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import TasksList from '../components/dashboard/TasksList';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import QuickActions from '../components/dashboard/QuickActions';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';

const DashboardPage = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Projects',
      value: '12',
      change: '10% increase',
      positive: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
      color: 'blue',
    },
    {
      id: 2,
      title: 'Active Tasks',
      value: '28',
      change: '12% increase',
      positive: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'green',
    },
    {
      id: 3,
      title: 'Team Members',
      value: '8',
      change: '2 new',
      positive: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'indigo',
    },
    {
      id: 4,
      title: 'Hours Logged',
      value: '164',
      change: '5% decrease',
      positive: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'purple',
    },
  ];

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="mt-4 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Project
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatCard
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  change={stat.change}
                  positive={stat.positive}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TasksList />
              
              <div className="mt-6">
                <ActivityFeed />
              </div>
            </div>
            
            <div className="space-y-6">
              <QuickActions />
              
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
