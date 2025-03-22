import React from 'react';
import PlaceholderPage from '../components/PlaceholderPage';

const GettingStarted = () => {
  return (
    <PlaceholderPage 
      title="Getting Started Guide"
      description="We're preparing comprehensive getting started guides to help you onboard to SaaSPro. Check back soon for step-by-step instructions and best practices."
      icon={
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      }
    />
  );
};

export default GettingStarted;
