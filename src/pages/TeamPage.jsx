import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import TeamForm from '../components/dashboard/TeamForm';
import ManageTeamModal from '../components/dashboard/ManageTeamModal';
import { getUserTeams, createTeam } from '../services/teamService';

const TeamPage = ({ openNew = false }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(openNew);
  const [managingTeam, setManagingTeam] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      const { data } = await getUserTeams();
      if (data) setTeams(data);
      setLoading(false);
    };
    fetchTeams();
  }, [refreshTrigger]);

  const handleCreateTeam = async (formData) => {
    const { data } = await createTeam(formData);
    if (data) {
      setRefreshTrigger((prev) => prev + 1);
      setIsTeamFormOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8'>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className='text-2xl font-semibold text-gray-900 dark:text-white'
            >
              Teams
            </motion.h1>
            
            <div className='mt-4 md:mt-0'>
              <button 
                onClick={() => setIsTeamFormOpen(true)}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              >
                <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>  
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
                New Team
              </button>
            </div>
          </div>

          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
            </div>
          ) : teams.length === 0 ? (
            <div className='text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
              <svg className='mx-auto h-12 w-12 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5V4H2v16h5m4 0h6m-3-4v4' />
              </svg>
              <h3 className='mt-2 text-sm font-medium text-gray-900 dark:text-white'>No teams</h3>
              <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Get started by creating a new team.</p>
              <div className='mt-6'>
                <button
                  onClick={() => setIsTeamFormOpen(true)}
                  className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none'
                >
                  <svg className='-ml-1 mr-2 h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                  </svg>
                  New Team
                </button>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {teams.map((team) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow'
                >
                  <div className='p-5'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 bg-primary/10 rounded-md p-3'>
                        <svg className='h-6 w-6 text-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5V4H2v16h5m4 0h6m-3-4v4' />
                        </svg>
                      </div>
                      <div className='ml-5 w-0 flex-1'>
                        <dl>
                          <dt className='text-sm font-medium text-gray-500 dark:text-gray-400 truncate'>
                            {team.name}
                          </dt>
                          <dd className='text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2'>
                            {team.description || 'No description provided.'}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 dark:bg-gray-700/50 px-5 py-3 border-t border-gray-200 dark:border-gray-700 font-medium text-xs flex justify-between items-center text-gray-500 dark:text-gray-400'>
                    <span>Members: {team.members ? team.members[0].count : 1}</span>
                    <button 
                      onClick={() => setManagingTeam(team)}
                      className='text-primary hover:text-primary-dark transition-colors'
                    >
                      Manage
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isTeamFormOpen && (
          <TeamForm 
            onClose={() => setIsTeamFormOpen(false)} 
            onSubmit={handleCreateTeam}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {managingTeam && (
          <ManageTeamModal
            team={managingTeam}
            onClose={() => setManagingTeam(null)}
            onUpdate={() => setRefreshTrigger((prev) => prev + 1)}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default TeamPage;
