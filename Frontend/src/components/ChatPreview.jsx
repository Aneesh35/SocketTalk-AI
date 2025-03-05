import React from 'react';
import { BotIcon } from 'lucide-react';

const ChatPreview = () => {
  return (
    <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex items-center">
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <BotIcon className="h-5 w-5 text-white" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">AI Assistant</p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex">
          <div className="bg-gray-800 rounded-lg p-3 max-w-xs">
            <p className="text-sm">Hello! How can I assist you with your MERN stack project today?</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-indigo-600 rounded-lg p-3 max-w-xs">
            <p className="text-sm">I need help implementing Redis caching with my MongoDB database.</p>
          </div>
        </div>
        <div className="flex">
          <div className="bg-gray-800 rounded-lg p-3 max-w-xs">
            <p className="text-sm">I'd be happy to help! First, you'll need to install redis and connect it to your Express server...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;