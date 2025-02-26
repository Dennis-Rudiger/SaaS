import React from 'react';

const activities = [
  {
    id: 1,
    user: {
      name: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    action: 'completed',
    target: 'Project proposal design',
    timestamp: '2 hours ago',
    project: 'Marketing Website',
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    user: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    action: 'commented on',
    target: 'User authentication flow',
    timestamp: '3 hours ago',
    project: 'Mobile App',
    comment: "We should consider adding biometric authentication for iOS users.",
    icon: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 3,
    user: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    action: 'created',
    target: 'Q3 Financial Report',
    timestamp: '5 hours ago',
    project: 'Financial Planning',
    icon: (
      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    id: 4,
    user: {
      name: 'Emily Chen',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    action: 'uploaded',
    target: '5 new design assets',
    timestamp: '8 hours ago',
    project: 'Branding',
    icon: (
      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    id: 5,
    user: {
      name: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    action: 'assigned',
    target: 'Homepage redesign task to Alex',
    timestamp: '10 hours ago',
    project: 'Marketing Website',
    icon: (
      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const ActivityFeed = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Activity Feed
          </h2>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <ul className="space-y-6">
          {activities.map((activity) => (
            <li key={activity.id} className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activity.user.name)}&background=random`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.user.name}
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {activity.icon}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                  <span className="font-medium">{activity.action}</span> {activity.target}
                </p>
                {activity.comment && (
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                    {activity.comment}
                  </div>
                )}
                <div className="flex mt-1 items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </span>
                  <span className="mx-1 text-gray-400 dark:text-gray-600">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.project}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityFeed;
