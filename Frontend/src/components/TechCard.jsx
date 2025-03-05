import React from 'react';

const TechCard = ({ icon, title, items }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg leading-6 font-medium text-white text-center">{title}</h3>
      <div className="mt-4 text-center space-y-2">
        {items.map((item, index) => (
          <p key={index} className="text-gray-400 text-sm">{item}</p>
        ))}
      </div>
    </div>
  );
};

export default TechCard;