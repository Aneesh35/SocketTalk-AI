import React from 'react';
import { Globe, Loader, RefreshCw } from "lucide-react";

const PreviewPanel = ({ iframeUrl, setIframeUrl, isIframeLoading, setIsIframeLoading }) => {
  const handleIframeRefresh = () => {
    if (iframeUrl) {
      setIsIframeLoading(true);
      setTimeout(() => setIsIframeLoading(false), 800);
    }
  };
  
  return (
    <div className="flex min-w-96 flex-col h-full border-l border-gray-700">
      <div className="address-bar flex items-center gap-2 p-2 bg-gray-800 border-b border-gray-700">
        <Globe className="h-4 w-4 text-gray-400 ml-2" />
        <input 
          type="text"
          onChange={(e) => setIframeUrl(e.target.value)}
          value={iframeUrl} 
          className="w-full p-1.5 px-3 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:border-indigo-500 text-sm" 
        />
        <button 
          onClick={handleIframeRefresh} 
          className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-gray-100 transition-colors"
          title="Refresh preview"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      <div className="relative flex-grow bg-white">
        {isIframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader className="h-8 w-8 text-indigo-500 animate-spin" />
              <span className="text-sm text-gray-200">Loading preview...</span>
            </div>
          </div>
        )}
        <iframe 
          src={iframeUrl} 
          className="w-full h-full border-0" 
          title="Project Preview"
          onLoad={() => setIsIframeLoading(false)} 
        />
      </div>
    </div>
  );
};

export default PreviewPanel;
