import React from 'react';
import { CodeIcon, ZapIcon, BotIcon } from 'lucide-react';
import TechCard from '../components/TechCard';

const Technologies = () => {
  const techData = [
    {
      icon: <CodeIcon className="h-12 w-12 text-indigo-500" />,
      title: "MERN Stack",
      items: ["MongoDB", "Express.js", "React", "Node.js"]
    },
    {
      icon: <ZapIcon className="h-12 w-12 text-indigo-500" />,
      title: "Real-time Features",
      items: ["Socket.IO", "Redis", "WebSockets", "JWT Authentication"]
    },
    {
      icon: <BotIcon className="h-12 w-12 text-indigo-500" />,
      title: "AI Integration",
      items: ["Google Gemini", "Natural Language Processing", "Context-aware Responses", "Smart Suggestions"]
    }
  ];

  return (
    <div id="technology" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Technology Stack</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Built with modern technologies
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Our MERN stack application leverages cutting-edge tools and frameworks.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {techData.map((tech, index) => (
              <TechCard 
                key={index}
                icon={tech.icon}
                title={tech.title}
                items={tech.items}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;