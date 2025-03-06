import React from 'react';
import { ZapIcon, BotIcon, DatabaseIcon, ShieldIcon } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const featuresData = [
    {
      icon: <ZapIcon className="h-6 w-6" />,
      title: "Real-time Communication",
      description: "Instant message delivery powered by Socket.IO provides seamless real-time communication between users."
    },
    {
      icon: <BotIcon className="h-6 w-6" />,
      title: "AI Assistant",
      description: "Google Gemini integration provides intelligent responses and assistance directly in your conversations."
    },
    {
      icon: <DatabaseIcon className="h-6 w-6" />,
      title: "Performance Optimized",
      description: "Redis caching and MongoDB databases ensure fast data retrieval and reliable message storage."
    },
    {
      icon: <ShieldIcon className="h-6 w-6" />,
      title: "Secure & Private",
      description: "End-to-end encryption and secure authentication protect your private conversations."
    }
  ];

  return (
    <div id="features" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Everything you need in a modern chat app
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Our platform combines cutting-edge technologies to provide a seamless communication experience.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {featuresData.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;