import React from 'react';
import { motion } from 'framer-motion';

// Sample activity data
const sampleActivities = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    type: 'comment',
    content: 'Added a new comment on',
    target: 'Landing Page Design',
    time: '10 minutes ago',
    link: '/projects/3/tasks/42'
  },
  {
    id: 2,
    user: {
      name: 'Michael Lee',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg'
    },
    type: 'task_completed',
    content: 'Completed task',
    target: 'Implement Authentication',
    time: '1 hour ago',
    link: '/projects/1/tasks/15'
  },
  {
    id: 3,
    user: {
      name: 'Anna Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
    type: 'file_upload',
    content: 'Uploaded document',
    target: 'UX Research Results.pdf',
    time: '2 hours ago',
    link: '/projects/2/files'
  },
  {
    id: 4,
    user: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
    },
    type: 'project',
    content: 'Created new project',
    target: 'Mobile App Development',
    time: 'Yesterday',
    link: '/projects/2'
  },
  {
    id: 5,
    user: {
      name: 'Lisa Wong',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    type: 'task_assigned',
    content: 'Assigned you to',
    target: 'Review PR for Homepage',
    time: 'Yesterday',
    link: '/projects/3/tasks/44'
  }
];

const RecentActivityCard = () => {
  // Function to get the icon for each activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'task_completed':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'file_upload':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        );
      case 'project':
        return (
          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      case 'task_assigned':
        return (
          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sampleActivities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
            <a href={activity.link} className="flex items-start space-x-4">
              {/* User avatar */}
              <div className="flex-shrink-0">
                <img 
                  src={activity.user.avatar} 
                  alt={activity.user.name}
                  className="h-10 w-10 rounded-full" 
                />
              </div>
              
              {/* Activity content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}
                  <span className="text-gray-500 dark:text-gray-400">{activity.content}</span>
                  {' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {activity.time}
                </p>
              </div>
              
              {/* Activity icon */}
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
            </a>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 text-center">
        <a 
          href="/activity"
          className="text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90"
        >
          View all activity
        </a>
      </div>
    </motion.div>
  );
};

export default RecentActivityCard;
