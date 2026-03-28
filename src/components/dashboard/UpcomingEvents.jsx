import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventService } from '../../services/eventService';

const UpcomingEvents = ({ refreshTrigger = 0 }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(3);
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await eventService.getEvents();
        // Filter events from today onwards
        const now = new Date();
        const upcoming = data.filter(e => new Date(e.start_time) >= now.setHours(0,0,0,0));
        setEvents(upcoming);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [refreshTrigger]);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const getDuration = (start, end) => {
    const diffMs = new Date(end) - new Date(start);
    const diffHrs = diffMs / (1000 * 60 * 60);
    if (diffHrs < 1) return `${(diffHrs * 60).toFixed(0)}m`;
    return `${diffHrs % 1 === 0 ? diffHrs : diffHrs.toFixed(1)}h`;
  };

  const isToday = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    return eventDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
  };

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const date = new Date(event.start_time).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  const sortedDates = Object.keys(eventsByDate).sort((a, b) => new Date(a) - new Date(b));
  const displayDates = showAllEvents ? sortedDates : sortedDates.slice(0, displayCount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Upcoming Events
          </h2>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View Calendar
          </button>
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No upcoming events found.
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {displayDates.map((date) => (
                <div key={date}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isToday(date) ? 'Today' : formatDate(date)}
                  </h3>
                  <div className="space-y-3">
                    {eventsByDate[date].map((event) => (
                      <div key={event.id} className="border-l-4 border-primary pl-4 py-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(event.start_time)} ({getDuration(event.start_time, event.end_time)})
                          </span>
                        </div>
                        {event.project && (
                          <div className="mt-1 text-sm text-primary dark:text-primary-light">
                            {event.project.name}
                          </div>
                        )}
                        {event.description && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {sortedDates.length > displayCount && (
              <div className="mt-6">
                <button
                  className="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  onClick={() => setShowAllEvents(!showAllEvents)}
                >
                  {showAllEvents ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default UpcomingEvents;
