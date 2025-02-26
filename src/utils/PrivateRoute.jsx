import { Navigate } from 'react-router-dom';

/**
 * A wrapper for protected routes
 * Checks if user is authenticated and redirects to login if not
 * 
 * Usage:
 * <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
 */
const PrivateRoute = ({ children, redirectPath = '/login' }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to={redirectPath} replace />;
  }
  
  // Render the protected component if authenticated
  return children;
};

export default PrivateRoute;
