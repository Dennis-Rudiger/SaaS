import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const events = [
  {
    id: 1,
    title: 'Team Weekly Sync',
    date: '2023-07-25',
    time: '10:00 AM',
    duration: '1h',
    attendees: [
      {
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      {
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      {
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      },
      {
        name: 'Emily Chen',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
    ],
  },
  {
    id: 2,
    title: 'Client Review Meeting',
    date: '2023-07-25',
    time: '2:30 PM',
    duration: '1.5h',
    attendees: [
      {
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      {
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
    ],
  },
  {
    id: 3,
    title: 'Product Launch Planning',
    date: '2023-07-26',
    time: '11:00 AM',
    duration: '2h',
    attendees: [
      {
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      },
      {
        name: 'Emily Chen',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
      {
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    ],
  },
  {
    id: 4,
    title: 'Q3 Budget Review',
    date: '2023-07-28',
    time: '9:00 AM',
    duration: '1h',
    attendees: [
      {
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      {
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    ],
  },
];

const UpcomingEvents = () => {
  const [displayCount, setDisplayCount] = useState(3);
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate if the event is today
  const isToday = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    return eventDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
  };

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  const sortedDates = Object.keys(eventsByDate).sort((a, b) => new Date(a) - new Date(b));
  const displayEvents = showAllEvents ? sortedDates : sortedDates.slice(0, displayCount);

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
        <div className="space-y-6">
          {displayEvents.map((date) => (
            <div key={date}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isToday(date) ? 'Today' : formatDate(date)}
              </h3>
              {eventsByDate[date].map((event) => (
                <div key={event.id} className="border-l-4 border-primary pl-4 mt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {event.time} ({event.duration})
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {event.attendees.slice(0, 3).map((attendee, index) => (
                        <img 
                          key={index}
                          src={attendee.avatar} 
                          alt={attendee.name} 
                          className="w-6 h-6 rounded-full border border-white dark:border-gray-800"
                          title={attendee.name}
                        />
                      ))}
                      {event.attendees.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 font-medium">
                          +{event.attendees.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {event.attendees.length} attendees
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button 
            className="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            onClick={() => setShowAllEvents(!showAllEvents)}
          >
            {showAllEvents ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingEvents;
