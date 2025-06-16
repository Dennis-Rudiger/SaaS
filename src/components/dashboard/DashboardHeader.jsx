import React from 'react';

const DashboardHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="mb-6 md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
      
      {actions && (
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
