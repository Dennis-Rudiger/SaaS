import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { initAnalytics } from './utils/analytics';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import SubscriptionGuard from './components/SubscriptionGuard';

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
import TeamPage from './pages/TeamPage';
import AcceptInvite from './pages/AcceptInvite';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import DocumentsPage from './pages/DocumentsPage';
import IntegrationsPage from './pages/IntegrationsPage';
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

// Import the test component
import SupabaseConnectionTest from './components/SupabaseConnectionTest';

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
      <AuthProvider>
        <SubscriptionProvider>
          <Router>
            <Routes>
              {/* Make landing page the home page */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup-invite" element={<SignupPage isInvite={true} />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/join/:token" element={<AcceptInvite />} />

              {/* Protected routes requiring login */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
              <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />

              {/* Protected routes requiring subscription */}
              <Route path="/projects" element={<ProtectedRoute><SubscriptionGuard><ProjectsPage /></SubscriptionGuard></ProtectedRoute>} />
              <Route path="/projects/new" element={<ProtectedRoute><SubscriptionGuard><ProjectsPage openNew={true} /></SubscriptionGuard></ProtectedRoute>} />
              <Route path="/projects/:projectId" element={<ProtectedRoute><SubscriptionGuard><ProjectDetailsPage /></SubscriptionGuard></ProtectedRoute>} />
              <Route path="/projects/:projectId/tasks/new" element={<ProtectedRoute><SubscriptionGuard><ProjectDetailsPage /></SubscriptionGuard></ProtectedRoute>} />
              
              <Route path="/calendar" element={<ProtectedRoute><SubscriptionGuard><CalendarPage /></SubscriptionGuard></ProtectedRoute>} />
              <Route path="/calendar/new" element={<ProtectedRoute><SubscriptionGuard><CalendarPage openNew={true} /></SubscriptionGuard></ProtectedRoute>} />
              
              <Route path="/team" element={<ProtectedRoute><SubscriptionGuard><TeamPage /></SubscriptionGuard></ProtectedRoute>} />
              <Route path="/team/new" element={<ProtectedRoute><SubscriptionGuard><TeamPage openNew={true} /></SubscriptionGuard></ProtectedRoute>} />
              
              <Route path="/integrations" element={<ProtectedRoute><SubscriptionGuard><IntegrationsPage /></SubscriptionGuard></ProtectedRoute>} />

              <Route path="/tasks" element={<ProtectedRoute><SubscriptionGuard><DashboardPage /></SubscriptionGuard></ProtectedRoute>} />
              <Route path="/tasks/new" element={<ProtectedRoute><SubscriptionGuard><DashboardPage openNewTask={true} /></SubscriptionGuard></ProtectedRoute>} />
              <Route path="/documents" element={<ProtectedRoute><SubscriptionGuard><DocumentsPage /></SubscriptionGuard></ProtectedRoute>} />
              <Route path="/documents/new" element={<ProtectedRoute><SubscriptionGuard><DocumentsPage /></SubscriptionGuard></ProtectedRoute>} />

              {/* Demo Page */}
              <Route path="/demo" element={<DemoPage />} />
              
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
              
              {/* Add a test route */}
              <Route path="/test-supabase" element={<SupabaseConnectionTest />} />
              
              {/* For any other route, go to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
