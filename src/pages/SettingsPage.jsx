import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form states
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    company: '',
    phone: '',
    bio: '',
    avatar: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appNotifications: true,
    weeklyDigest: false,
    marketingEmails: false,
  });
  
  // Load user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real application, this would be an API call
        // For now, we'll simulate with localStorage
        const storedUserData = localStorage.getItem('userData');
        
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
          setProfileData({
            firstName: parsedUserData.firstName || '',
            lastName: parsedUserData.lastName || '',
            email: parsedUserData.email || '',
            jobTitle: parsedUserData.jobTitle || '',
            company: parsedUserData.company || '',
            phone: parsedUserData.phone || '',
            bio: parsedUserData.bio || '',
            avatar: parsedUserData.avatar || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage({ type: 'error', text: 'Failed to load user data' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      // In a real application, this would be an API call
      // For now, we'll simulate with localStorage
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUserData = { ...userData, ...profileData };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Validate password
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (passwordData.newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update password' });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUserData = { 
        ...userData, 
        notificationSettings: notificationSettings 
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      
      setMessage({ type: 'success', text: 'Notification settings updated!' });
    } catch (error) {
      console.error('Error updating notification settings:', error);
      setMessage({ type: 'error', text: 'Failed to update notification settings' });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-500 dark:text-gray-400">Loading settings...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {message.text}
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'security'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Notifications
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={profileData.jobTitle}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={profileData.company}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-primary text-white font-medium px-6 py-2 rounded-md hover:bg-primary-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
            
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-primary text-white font-medium px-6 py-2 rounded-md hover:bg-primary-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>
              </form>
            )}
            
            {activeTab === 'notifications' && (
              <form onSubmit={handleNotificationSubmit}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                        className="sr-only"
                      />
                      <div className={`relative w-14 h-7 transition-colors ${
                        notificationSettings.emailNotifications 
                          ? 'bg-primary' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      } rounded-full`}>
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform transform ${
                          notificationSettings.emailNotifications 
                            ? 'translate-x-8' 
                            : 'translate-x-1'
                        }`} />
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium">App Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive in-app notifications</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="appNotifications"
                        checked={notificationSettings.appNotifications}
                        onChange={handleNotificationChange}
                        className="sr-only"
                      />
                      <div className={`relative w-14 h-7 transition-colors ${
                        notificationSettings.appNotifications 
                          ? 'bg-primary' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      } rounded-full`}>
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform transform ${
                          notificationSettings.appNotifications 
                            ? 'translate-x-8' 
                            : 'translate-x-1'
                        }`} />
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium">Weekly Digest</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive a weekly summary of activity</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="weeklyDigest"
                        checked={notificationSettings.weeklyDigest}
                        onChange={handleNotificationChange}
                        className="sr-only"
                      />
                      <div className={`relative w-14 h-7 transition-colors ${
                        notificationSettings.weeklyDigest 
                          ? 'bg-primary' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      } rounded-full`}>
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform transform ${
                          notificationSettings.weeklyDigest 
                            ? 'translate-x-8' 
                            : 'translate-x-1'
                        }`} />
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive product updates and marketing offers</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onChange={handleNotificationChange}
                        className="sr-only"
                      />
                      <div className={`relative w-14 h-7 transition-colors ${
                        notificationSettings.marketingEmails 
                          ? 'bg-primary' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      } rounded-full`}>
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform transform ${
                          notificationSettings.marketingEmails 
                            ? 'translate-x-8' 
                            : 'translate-x-1'
                        }`} />
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-primary text-white font-medium px-6 py-2 rounded-md hover:bg-primary-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
