import React from 'react';

const activities = [
  {
    id: 1,
    user: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    action: 'commented on',
    target: 'Project Proposal',
    content: 'I think we should revise the timeline for this milestone.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    user: {
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    action: 'completed task',
    target: 'Update design assets',
    content: '',
    time: '4 hours ago',
    read: true,
  },
  {
    id: 3,
    user: {
      name: 'Marco Lopes',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    action: 'uploaded documents',
    target: 'Q3 Financial Report',
    content: '3 files uploaded',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 4,
    user: {
      name: 'Sarah Kim',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
    action: 'assigned you to',
    target: 'Client onboarding process',
    content: '',
    time: 'Yesterday',
    read: false,
  },
  {
    id: 5,
    user: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    action: 'mentioned you in',
    target: 'Team Meeting Notes',
    content: '@you Please follow up with the client regarding their feedback.',
    time: '3 days ago',
    read: true,
  },
];

const ActivityFeed = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary-dark">View all</button>
      </div>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className={`flex ${!activity.read ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-primary p-3 -mx-3 rounded-r-md' : ''}`}>
            <img
              src={activity.user.avatar}
              alt={activity.user.name}
              className="h-10 w-10 rounded-full mr-4 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{activity.user.name}</span> {activity.action}{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              {activity.content && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.content}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button className="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          Load More
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
