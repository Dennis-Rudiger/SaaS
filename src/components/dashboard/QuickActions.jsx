import React from 'react';
import { Link } from 'react-router-dom';

const actions = [
  {
    id: 1,
    name: 'Create Task',
    description: 'Add a new task to your projects',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    color: 'blue',
    path: '/tasks/new',
  },
  {
    id: 2,
    name: 'Schedule Meeting',
    description: 'Set up a new meeting with your team',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'green',
    path: '/calendar/new',
  },
  {
    id: 3,
    name: 'Upload Document',
    description: 'Add files to your document library',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    color: 'indigo',
    path: '/documents/upload',
  },
  {
    id: 4,
    name: 'Create Report',
    description: 'Generate analytics reports',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'purple',
    path: '/reports/new',
  },
];

const colorClasses = {
  blue: {
    bgLight: 'bg-blue-100 dark:bg-blue-900/30',
    bgDark: 'bg-blue-500 dark:bg-blue-600',
    text: 'text-blue-600 dark:text-blue-400',
    hover: 'hover:bg-blue-600 dark:hover:bg-blue-700',
  },
  green: {
    bgLight: 'bg-green-100 dark:bg-green-900/30',
    bgDark: 'bg-green-500 dark:bg-green-600',
    text: 'text-green-600 dark:text-green-400',
    hover: 'hover:bg-green-600 dark:hover:bg-green-700',
  },
  red: {
    bgLight: 'bg-red-100 dark:bg-red-900/30',
    bgDark: 'bg-red-500 dark:bg-red-600',
    text: 'text-red-600 dark:text-red-400',
    hover: 'hover:bg-red-600 dark:hover:bg-red-700',
  },
  indigo: {
    bgLight: 'bg-indigo-100 dark:bg-indigo-900/30',
    bgDark: 'bg-indigo-500 dark:bg-indigo-600',
    text: 'text-indigo-600 dark:text-indigo-400',
    hover: 'hover:bg-indigo-600 dark:hover:bg-indigo-700',
  },
  purple: {
    bgLight: 'bg-purple-100 dark:bg-purple-900/30',
    bgDark: 'bg-purple-500 dark:bg-purple-600',
    text: 'text-purple-600 dark:text-purple-400',
    hover: 'hover:bg-purple-600 dark:hover:bg-purple-700',
  },
  amber: {
    bgLight: 'bg-amber-100 dark:bg-amber-900/30',
    bgDark: 'bg-amber-500 dark:bg-amber-600',
    text: 'text-amber-600 dark:text-amber-400',
    hover: 'hover:bg-amber-600 dark:hover:bg-amber-700',
  },
};

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Quick Actions
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {actions.map((action) => {
            const colorClass = colorClasses[action.color] || colorClasses.blue;
            
            return (
              <Link
                key={action.id}
                to={action.path}
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-lg ${colorClass.bgLight} ${colorClass.text} mr-4`}>
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
                <div className="ml-auto">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/settings/shortcuts"
            className="flex items-center justify-center text-primary hover:text-primary-dark text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Customize Quick Actions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
