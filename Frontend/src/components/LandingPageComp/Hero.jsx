import React from 'react';
import { ArrowRightIcon, BotIcon } from 'lucide-react';
import ChatPreview from './ChatPreview';

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Hero Content */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Real-time Chat</span>
              <span className="block text-indigo-500">Powered by AI</span>
            </h1>
            <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Experience seamless communication with our chat application enhanced with AI. Connect with friends, colleagues, and our intelligent assistant in real-time.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a href="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          
          {/* Chat Preview */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className=" rounded-lg shadow-xl overflow-hidden sm:mx-auto sm:max-w-lg lg:max-w-none">
              <ChatPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;