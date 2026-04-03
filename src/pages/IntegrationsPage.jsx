import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';

const integrationsList = [
  { id: 'slack', name: 'Slack', category: 'Communication', connected: false },
  { id: 'github', name: 'GitHub', category: 'Development', connected: false },
  { id: 'jira', name: 'Jira', category: 'Management', connected: false },
  { id: 'drive', name: 'Google Drive', category: 'Storage', connected: false }
];

const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState(integrationsList);

  const handleConnect = (id) => {
    setIntegrations(integrations.map(integ => 
      integ.id === id ? { ...integ, connected: !integ.connected } : integ
    ));
  };

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Integrations" 
        subtitle="Connect SaaSPro with your favorite tools" 
      />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((app) => (
            <div key={app.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {app.category}
                </span>
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">{app.name}</h3>
              <p className="text-gray-500 mb-6 flex-grow">
                Connect your {app.name} account to sync data and automate workflows directly.
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                {app.connected ? (
                   <div className="flex justify-between items-center">
                     <span className="text-green-500 text-sm font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                        Connected
                     </span>
                     <button onClick={() => handleConnect(app.id)} className="text-sm text-red-500 hover:text-red-700">Disconnect</button>
                   </div>
                ) : (
                  <button onClick={() => handleConnect(app.id)} className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition">
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IntegrationsPage;
