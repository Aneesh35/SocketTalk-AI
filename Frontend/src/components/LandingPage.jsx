import React from 'react';
import Navbar from '../components/LandingPageComp/Navbar';
import Hero from '../components/LandingPageComp/Hero';
import Features from '../components/LandingPageComp/Features';
import Technologies from '../components/LandingPageComp/Technolgies';
import Footer from '../components/LandingPageComp/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <Hero />
      <Features />
      <Technologies />
      <Footer />
    </div>
  );
};

export default LandingPage;