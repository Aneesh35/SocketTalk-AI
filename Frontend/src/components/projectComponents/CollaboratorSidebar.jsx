import React from 'react';
import { X } from "lucide-react";

const CollaboratorSidebar = ({ isSidePanel, setSidePanel, collaborator }) => {
  return (
    <div
      className={`sidePanel w-full md:w-72 h-full bg-gray-900 absolute z-10 shadow-lg transition-all duration-300 ease-in ${
        isSidePanel ? "translate-x-0" : "-translate-x-full"
      } top-0 left-0 border-r border-gray-800`}
    >
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="font-semibold text-lg text-gray-100">
          Collaborators
        </h1>
        <button
          onClick={() => setSidePanel(!isSidePanel)}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </header>
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 60px)" }}
      >
        {collaborator.map((collaborator) => (
          <div className="p-2" key={collaborator._id}>
            <div className="user cursor-pointer hover:bg-gray-800 rounded-lg flex gap-3 items-center p-3 transition-colors">
              <div className="aspect-square rounded-full flex items-center justify-center w-10 h-10 bg-indigo-900 text-indigo-300">
                <i className="ri-user-fill"></i>
              </div>
              <div>
                <h1 className="font-medium text-gray-200">
                  {collaborator.email}
                </h1>
                <p className="text-xs text-gray-500">Collaborator</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorSidebar;
