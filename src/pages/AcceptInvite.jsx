import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { acceptTeamInvitation } from '../services/teamService';
import { useAuth } from '../contexts/AuthContext';

const AcceptInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Determine user authed status
    if (!user) {
      sessionStorage.setItem('pending_invite_token', token);
      navigate('/signup-invite', { replace: true });
      return;
    }

    const processInvitation = async () => {
      setLoading(true);
      const { success, teamId, error: apiError } = await acceptTeamInvitation(token);
      if (success) {
        sessionStorage.removeItem('pending_invite_token'); 
        navigate('/teams', { replace: true });
      } else {
        setError(apiError || 'Failed to accept invitation. The link may have expired or is invalid.');
      }
      setLoading(false);
    };

    processInvitation();
  }, [user, token, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Processing Invitation</h2>
          <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>Please wait while we add you to the team.</p>
        </div>

        {loading ? (
          <div className='flex justify-center my-8'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
          </div>
        ) : error ? (
          <div className='space-y-4'>
            <div className='bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-md text-sm text-left'>
              {error}
            </div>
            <button
              onClick={() => navigate('/teams')}
              className='w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              Go to Teams
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AcceptInvite;
