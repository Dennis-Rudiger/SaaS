import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: 'Team Standup',
    startTime: '2023-12-08T09:00:00',
    endTime: '2023-12-08T09:30:00',
    attendees: [
      { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 2, name: 'Michael Lee', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
      { id: 3, name: 'Anna Garcia', avatar: 'https://randomuser.me/api/portraits/women/63.jpg' }
    ],
    type: 'meeting'
  },
  {
    id: 2,
    title: 'Project Review',
    startTime: '2023-12-08T14:00:00',
    endTime: '2023-12-08T15:00:00',
    attendees: [
      { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 4, name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' }
    ],
    type: 'meeting'
  },
  {
    id: 3,
    title: 'Website Design Deadline',
    startTime: '2023-12-10T00:00:00',
    endTime: '2023-12-10T23:59:59',
    type: 'deadline'
  }
];

const UpcomingEventsCard = () => {
  // Function to format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Format date for display (Today, Tomorrow, or date)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    
    if (eventDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (eventDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  // Group events by date
  const groupedEvents = sampleEvents.reduce((acc, event) => {
    const date = new Date(event.startTime);
    date.setHours(0, 0, 0, 0);
    const dateKey = date.toISOString();
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push(event);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort();

  // Get icon for event type
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'deadline':
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Events</h3>
        <Link 
          to="/calendar"
          className="text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90"
        >
          View calendar
        </Link>
      </div>
      
      <div>
        {sortedDates.map((dateKey) => (
          <div key={dateKey} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {formatDate(dateKey)}
              </h4>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {groupedEvents[dateKey].map((event) => (
                <div key={event.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <Link to={`/calendar/events/${event.id}`} className="flex items-center">
                    {/* Event type icon */}
                    <div className="flex-shrink-0">
                      {getEventTypeIcon(event.type)}
                    </div>
                    
                    {/* Event details */}
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </p>
                      {event.type !== 'deadline' && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </p>
                      )}
                    </div>
                    
                    {/* Attendees */}
                    {event.attendees && event.attendees.length > 0 && (
                      <div className="ml-4 flex-shrink-0">
                        <div className="flex -space-x-1 overflow-hidden">
                          {event.attendees.slice(0, 3).map((attendee) => (
                            <img 
                              key={attendee.id}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800" 
                              src={attendee.avatar} 
                              alt={attendee.name} 
                            />
                          ))}
                          {event.attendees.length > 3 && (
                            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 ring-2 ring-white dark:ring-gray-800">
                              +{event.attendees.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 text-center">
        <Link 
          to="/calendar/new-event"
          className="text-sm font-medium text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/90 inline-flex items-center"
        >
          <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Schedule event
        </Link>
      </div>
    </motion.div>
  );
};

export default UpcomingEventsCard;
