import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import StatsSection from '../components/StatsSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
