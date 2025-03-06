import React from 'react';
import { MessageCircleIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <MessageCircleIcon className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold">Socket Talk-AI</span>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Features</a>
            <a href="#technology" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Technology</a>
            <a href="/login" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium">Login</a>
            <a href="/register" className="ml-4 px-4 py-2 rounded text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign up
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;