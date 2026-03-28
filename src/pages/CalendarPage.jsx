import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Calendar from '../components/dashboard/Calendar';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import EventForm from '../components/dashboard/EventForm';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarPage = ({ openNew = false }) => {
  const [view, setView] = useState('month');
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (openNew) {
      setIsEventFormOpen(true);
    }
  }, [openNew]);

  const handleCloseEventForm = () => {
    setIsEventFormOpen(false);
    if (openNew) {
      navigate('/calendar', { replace: true });
    }
  };

  const handleEventSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Calendar
            </motion.h1>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-md p-1">
                {['day', 'week', 'month'].map((viewOption) => (
                  <button
                    key={viewOption}
                    onClick={() => setView(viewOption)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                      view === viewOption
                        ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setIsEventFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Event
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Calendar refreshTrigger={refreshTrigger} />
            </div>
            <div>
              <UpcomingEvents refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isEventFormOpen && (
          <EventForm 
            onClose={handleCloseEventForm} 
            onSuccess={handleEventSuccess}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default CalendarPage;
