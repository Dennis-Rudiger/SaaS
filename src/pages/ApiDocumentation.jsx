import React from 'react';
import PlaceholderPage from '../components/PlaceholderPage';

const ApiDocumentation = () => {
  return (
    <PlaceholderPage 
      title="API Documentation"
      description="Our API documentation is currently under development. Soon you'll have access to comprehensive guides and references for integrating with the SaaSPro API."
      icon={
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      }
    />
  );
};

export default ApiDocumentation;
