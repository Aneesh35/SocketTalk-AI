import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg leading-6 font-medium text-white">{title}</h3>
        <p className="mt-2 text-base text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;