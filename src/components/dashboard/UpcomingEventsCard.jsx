import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';

const UpcomingEventsCard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        const now = new Date();
        const upcoming = data.filter(e => new Date(e.start_time) >= now);
        // Map the real events to the structure expected by the UI, default some sample attendees for look
        const formatted = upcoming.slice(0, 4).map((e, index) => ({
          ...e,
          startTime: e.start_time,
          endTime: e.end_time,
          attendees: index % 2 === 0 
           ? [{ id: 1, name: 'Guest', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }] 
           : []
        }));
        setEvents(formatted);
      } catch (err) {
        console.error('Error in UpcomingEventsCard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isToday = (dateString) => {
    const d = new Date(dateString);
    const today = new Date();
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear();
  };

  const getDayLabel = (dateString) => {
    if (isToday(dateString)) return 'Today';
    const d = new Date(dateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (d.getDate() === tomorrow.getDate() && d.getMonth() === tomorrow.getMonth() && d.getFullYear() === tomorrow.getFullYear()) {
      return 'Tomorrow';
    }
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
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
      
      <div className="p-0">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No upcoming events scheduled.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {events.map((event) => (
              <li key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 flex flex-col items-center justify-center">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {new Date(event.startTime).toLocaleString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">
                        {new Date(event.startTime).getDate()}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{event.title}</h4>
                    <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {getDayLabel(event.startTime)}, {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </div>
                  </div>
                  
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex -space-x-2 ml-4">
                      {event.attendees.slice(0, 3).map((attendee) => (
                        <img 
                          key={attendee.id} 
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800" 
                          src={attendee.avatar} 
                          alt={attendee.name} 
                          title={attendee.name}
                        />
                      ))}
                      {event.attendees.length > 3 && (
                        <div className="flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-100 dark:bg-gray-700 text-[10px] font-medium text-gray-600 dark:text-gray-300">
                          +{event.attendees.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 text-center">
        <Link
          to="/calendar/new"
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
