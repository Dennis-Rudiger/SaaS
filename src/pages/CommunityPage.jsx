import React from 'react';
import PlaceholderPage from '../components/PlaceholderPage';

const CommunityPage = () => {
  return (
    <PlaceholderPage 
      title="Community Forum"
      description="Our community forum is being prepared. Soon you'll be able to connect with other SaaSPro users, share ideas, and get help from the community."
      icon={
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      }
    />
  );
};

export default CommunityPage;
