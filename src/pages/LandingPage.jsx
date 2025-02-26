import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import CTASection from '../components/CTASection';
import { trackPageView } from '../utils/analytics';
import { scrollToTop } from '../utils/ScrollToSection';

const LandingPage = () => {
  useEffect(() => {
    // Track page view for analytics
    trackPageView('Landing Page');
    
    // Scroll to top when the component mounts
    scrollToTop();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <ContactSection/>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
