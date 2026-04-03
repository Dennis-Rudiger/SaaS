import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { getNotifications, markAsRead, markAllAsRead, createTestNotification } from '../../services/notificationService';
import { supabase } from '../../utils/supabaseClient';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    const { data } = await getNotifications();
    if (data) setNotifications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();

    // Subscribe to new notifications
    const setupSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const subscription = supabase
        .channel('public:notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            setNotifications(current => [payload.new, ...current]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    };

    const unsubscribePromise = setupSubscription();

    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, []);

  // Calculate unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle marking a notification as read
  const handleMarkAsRead = async (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
    await markAsRead(id);
  };

  // Handle marking all notifications as read
  const handleMarkAllAsRead = async () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    await markAllAsRead();
  };

  // Add dummy notification for testing
  const addTestNotification = async () => {
    const types = ['comment', 'task', 'deadline', 'calendar', 'system'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const { data } = await createTestNotification({
      title: `Test ${randomType} notification`,
      message: `This is a test message for ${randomType}`,
      type: randomType,
      link: '/dashboard',
      read: false
    });
    
    // Manually add to state so it shows up immediately even if Realtime isn't configured
    if (data) {
      setNotifications(current => [data, ...current]);
    }
  };  // Get the appropriate icon for each notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'comment':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'task':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        );
      case 'deadline':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'calendar':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="relative ml-3" ref={dropdownRef}>
      <button
        type="button"
        className="relative rounded-full bg-white dark:bg-gray-800 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">View notifications</span>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {/* Badge indicator for unread notifications */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-gray-800 bg-red-500"></span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 focus:outline-none">
          <div className="px-4 py-3 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-light/80"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            {loading ? (
              <div className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                <p>Loading...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-4 px-4 text-center flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <p>No notifications</p>
                <button
                  type="button"
                  onClick={addTestNotification}
                  className="mt-2 text-xs text-primary hover:text-primary-dark"
                >
                  Create test notification
                </button>
              </div>
            ) : (
              notifications.map(notification => (
                <Link
                  key={notification.id}
                  to={notification.link || '#'}
                  className={`block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    {getNotificationIcon(notification.type)}

                    <div className="ml-3 flex-1">
                      <p className={`text-sm font-medium ${
                        notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'
                      }`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {notification.created_at ? formatDistanceToNow(new Date(notification.created_at), { addSuffix: true }) : 'just now'}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary mt-1.5 align-middle"></span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>          <div className="py-1">
            <Link
              to="/notifications"
              className="block px-4 py-2 text-sm text-center text-primary dark:text-primary-light hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
