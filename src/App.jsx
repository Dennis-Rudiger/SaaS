import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { initAnalytics } from './utils/analytics';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { isDarkMode } = useTheme();
  
  // Initialize analytics when the app loads
  useEffect(() => {
    initAnalytics();
  }, []);

  // Add dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
