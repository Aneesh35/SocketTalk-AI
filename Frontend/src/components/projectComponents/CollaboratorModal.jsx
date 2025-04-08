import React from 'react';
import { X } from "lucide-react";

const CollaboratorModal = ({ 
  users, 
  selectedUserId, 
  handleUserClick, 
  addCollaborator, 
  setIsModalOpen 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-gray-800 p-6 rounded-xl w-96 max-w-[90%] relative shadow-xl border border-gray-700">
        <header className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100">
            Add Collaborators
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </header>
        <div className="users-list flex flex-col gap-1 mb-16 max-h-96 overflow-auto">
          {users.map((user) => (
            <div
              key={user._id}
              className={`user cursor-pointer ${
                selectedUserId.includes(user._id)
                  ? "bg-indigo-900/30 border-indigo-800"
                  : "hover:bg-gray-750"
              } p-3 rounded-lg flex gap-3 items-center border border-transparent transition-colors`}
              onClick={() => handleUserClick(user._id)}
            >
              <div
                className={`aspect-square rounded-full w-10 h-10 flex items-center justify-center text-white ${
                  selectedUserId.includes(user._id)
                    ? "bg-indigo-600"
                    : "bg-gray-700"
                }`}
              >
                <i className="ri-user-fill"></i>
              </div>
              <div>
                <h1 className="font-medium text-gray-200">{user.email}</h1>
                {selectedUserId.includes(user._id) && (
                  <p className="text-xs text-indigo-400">Selected</p>
                )}
              </div>
              {selectedUserId.includes(user._id) && (
                <i className="ri-check-line ml-auto text-indigo-400 text-xl"></i>
              )}
            </div>
          ))}
          {users.length === 0 && (
            <p className="text-center text-gray-500 py-4">No users found</p>
          )}
        </div>
        <button
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm font-medium disabled:bg-gray-700 disabled:text-gray-500"
          onClick={addCollaborator}
          disabled={selectedUserId.length === 0}
        >
          Add Selected Users
        </button>
      </div>
    </div>
  );
};

export default CollaboratorModal;
