import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { initAnalytics } from './utils/analytics';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SubscriptionPage from './pages/SubscriptionPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectsPage from './pages/ProjectsPage';
import CalendarPage from './pages/CalendarPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import DemoPage from './pages/DemoPage'; // Import the new DemoPage
import TutorialsPage from './pages/TutorialsPage';
import CommunityPage from './pages/CommunityPage';
import ApiDocumentation from './pages/ApiDocumentation';
import GettingStarted from './pages/GettingStarted';

// Import product pages
import { 
  FeaturesPage, 
  SecurityPage, 
  PricingPage, 
  RoadmapPage 
} from './pages/ProductPages';

// Import company pages
import { 
  AboutPage, 
  CareersPage, 
  BlogPage, 
  PressPage 
} from './pages/CompanyPages';

// Import resource pages
import { 
  DocumentationPage, 
  GuidesPage, 
  SupportPage, 
  ApiPage 
} from './pages/ResourcePages';

// Import legal pages
import { 
  PrivacyPage, 
  TermsPage, 
  CookiePolicyPage, 
  GdprPage,
  CookieSettingsPage 
} from './pages/LegalPages';

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
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Make landing page the home page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          
          {/* Demo Page */}
          <Route path="/demo" element={<DemoPage />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/tasks" element={<DashboardPage />} />
          
          {/* Documentation routes */}
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/docs/api" element={<ApiDocumentation />} />
          <Route path="/docs/getting-started" element={<GettingStarted />} />
          
          {/* Product pages */}
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          
          {/* Company pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/press" element={<PressPage />} />
          
          {/* Resource pages */}
          <Route path="/docs" element={<DocumentationPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/api" element={<ApiPage />} />
          
          {/* Legal pages */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/gdpr" element={<GdprPage />} />
          <Route path="/cookies" element={<CookieSettingsPage />} />
          
          {/* For any other route, go to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
