import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Technologies from './Technolgies';
import Footer from './Footer';

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