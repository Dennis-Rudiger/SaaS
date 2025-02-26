/**
 * Example analytics utility for SaaS landing page
 * Replace this with your preferred analytics solution (Google Analytics, Segment, etc.)
 */

// Initialize analytics
export const initAnalytics = () => {
  console.log('Analytics initialized');
  
  // Track page views
  trackPageView();
  
  // Listen for route changes if using a SPA
  window.addEventListener('popstate', () => {
    trackPageView();
  });
};

// Track page views
export const trackPageView = () => {
  const page = window.location.pathname;
  console.log(`Page view tracked: ${page}`);
  
  // Implementation for real analytics service
  // Example: gtag('config', 'UA-XXXXXXXX-X', { 'page_path': page });
};

// Track events
export const trackEvent = (category, action, label = null, value = null) => {
  console.log(`Event tracked: ${category} - ${action} ${label ? `- ${label}` : ''} ${value ? `- ${value}` : ''}`);
  
  // Implementation for real analytics service
  // Example: gtag('event', action, { 'event_category': category, 'event_label': label, 'value': value });
};

// Track user conversion
export const trackConversion = (conversionType, value = 0) => {
  console.log(`Conversion tracked: ${conversionType} - Value: ${value}`);
  
  // Implementation for real analytics service
  // Example: gtag('event', 'conversion', { 'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', 'value': value });
};
