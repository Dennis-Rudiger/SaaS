import React from 'react';

const events = [
  {
    id: 1,
    title: 'Team Weekly Sync',
    date: '2023-08-25',
    time: '10:00 AM',
    attendees: [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/12.jpg',
      'https://randomuser.me/api/portraits/men/44.jpg',
      'https://randomuser.me/api/portraits/women/45.jpg',
    ],
  },
  {
    id: 2,
    title: 'Project Kickoff',
    date: '2023-08-26',
    time: '2:30 PM',
    attendees: [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/12.jpg',
    ],
  },
  {
    id: 3,
    title: 'Client Presentation',
    date: '2023-08-28',
    time: '11:00 AM',
    attendees: [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/men/44.jpg',
      'https://randomuser.me/api/portraits/women/45.jpg',
    ],
  },
];

const UpcomingEvents = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
        <button className="text-sm text-primary hover:text-primary-dark">View calendar</button>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</h3>
            <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex -space-x-2 mr-2">
                {event.attendees.slice(0, 3).map((attendee, index) => (
                  <img 
                    key={index}
                    src={attendee} 
                    alt="Attendee" 
                    className="w-6 h-6 rounded-full border border-white dark:border-gray-800"
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
      
      <div className="mt-4">
        <button className="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          Add Event
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
