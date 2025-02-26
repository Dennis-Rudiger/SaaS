import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Helper to generate calendar data
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  // Add empty slots for days before the first of the month
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: '', isCurrentMonth: false });
  }
  
  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }
  
  return days;
};

// Sample events data
const events = [
  { day: 5, title: 'Team Meeting', type: 'meeting' },
  { day: 12, title: 'Client Call', type: 'call' },
  { day: 15, title: 'Project Deadline', type: 'deadline' },
  { day: 20, title: 'Review Session', type: 'meeting' },
  { day: 25, title: 'Planning', type: 'meeting' },
];

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  
  const days = generateCalendarDays(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const getEventForDay = (day) => {
    return events.find(event => event.day === day);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Calendar</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={goToPreviousMonth}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              {monthName} {currentYear}
            </span>
            <button 
              onClick={goToNextMonth}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {/* Days of week headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((dayObj, index) => {
            const isToday = dayObj.isCurrentMonth && dayObj.day === today.getDate() && 
                           currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const event = dayObj.isCurrentMonth ? getEventForDay(dayObj.day) : null;
            
            return (
              <div 
                key={index} 
                className={`relative h-20 p-1 border dark:border-gray-700 ${
                  dayObj.isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'
                } ${isToday ? 'ring-2 ring-primary' : ''}`}
              >
                <span 
                  className={`text-sm ${
                    isToday 
                      ? 'bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full' 
                      : dayObj.isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {dayObj.day}
                </span>
                
                {event && (
                  <div 
                    className={`mt-1 p-1 text-xs rounded ${
                      event.type === 'meeting' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                      event.type === 'call' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}
                  >
                    {event.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-500 dark:bg-blue-600 rounded-full mr-2"></span>
            <span className="text-xs text-gray-600 dark:text-gray-300">Meeting</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded-full mr-2"></span>
            <span className="text-xs text-gray-600 dark:text-gray-300">Call</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-500 dark:bg-red-600 rounded-full mr-2"></span>
            <span className="text-xs text-gray-600 dark:text-gray-300">Deadline</span>
          </div>
          <button className="ml-auto text-sm text-primary hover:text-primary-dark">
            Add Event
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Calendar;
