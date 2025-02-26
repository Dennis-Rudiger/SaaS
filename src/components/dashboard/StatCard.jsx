import React from 'react';

const colorClasses = {
  blue: 'bg-blue-500 text-white',
  green: 'bg-green-500 text-white',
  purple: 'bg-purple-500 text-white',
  amber: 'bg-amber-500 text-white',
  red: 'bg-red-500 text-white',
  gray: 'bg-gray-500 text-white',
};

const bgClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200',
  green: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200',
  purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200',
  amber: 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
  red: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200',
  gray: 'bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200',
};

const StatCard = ({ title, value, change, positive, icon, color = 'blue' }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg mr-4 ${bgClasses[color]}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="flex items-end space-x-2">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            {change && (
              <span className={`text-sm ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {change}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
