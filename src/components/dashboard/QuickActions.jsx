import React from 'react';

const actions = [
  {
    id: 1,
    title: 'New Project',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'blue',
    href: '/projects/new',
  },
  {
    id: 2,
    title: 'Add Task',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    color: 'green',
    href: '/tasks/new',
  },
  {
    id: 3,
    title: 'Schedule',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'purple',
    href: '/calendar/new',
  },
  {
    id: 4,
    title: 'Invite',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    color: 'amber',
    href: '/team/invite',
  },
];

const colorClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
  green: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
  purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300',
  amber: 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300',
};

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <div className={`p-2 rounded-lg mb-2 ${colorClasses[action.color]}`}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{action.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
