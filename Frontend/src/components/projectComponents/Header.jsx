import React from 'react';
import { ArrowLeftIcon, UserPlusIcon, Users } from "lucide-react";

const Header = ({ projectName, navigate, setIsModalOpen, isModalOpen }) => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800">
      <div className="flex items-center">
        <button
          onClick={() => navigate("/home")}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          title="Back to home"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
        </button>
        <h1 className="ml-4 font-semibold text-lg text-gray-100">
          {projectName || "Project Chat"}
        </h1>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
          title="Add collaborator"
        >
          <UserPlusIcon className="h-5 w-5 text-gray-400" />
          <span className="hidden md:inline text-gray-400 text-sm">
            Add collaborator
          </span>
        </button>
        <button title="View collaborators">
          <Users className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;
