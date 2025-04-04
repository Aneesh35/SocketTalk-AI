import axios from "../config/axios";
import { React, useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket";
import { UserContext } from "../context/user.context";
import { ArrowLeftIcon, UserPlusIcon, Users, X, Send } from "lucide-react";

const Project = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isSidePanel, setSidePanel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collaborator, SetCollaborators] = useState(
    location.state.project.users
  );
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const messageBox = useRef();

  useEffect(() => {
    sendRequest();
    getCollaborators();
    initializeSocket(location.state.project._id);
    receiveMessage("project-message", (data) => {
      console.log(data);
      appendIncomingMessage(data);
    });
  }, []);

  async function getCollaborators() {
    const result = await axios.get(
      `project/get-project/${location.state.project._id}`
    );
    if (result) {
      SetCollaborators(result.data.project.users);
    }
  }

  async function addCollaborator() {
    console.log(selectedUserId);
    const result = await axios.put("project/add-user", {
      projectId: location.state.project._id,
      users: selectedUserId,
    });
    if (result) {
      window.location.reload();
    }
  }

  async function sendRequest() {
    setIsModalOpen(false);
    const result = await axios.get("user/all");
    setUser(result.data);
  }

  const handleUserClick = (id) => {
    setSelectedUserId((selectedUserId) => {
      const newSelectedId = new Set(selectedUserId);
      if (newSelectedId.has(id)) {
        newSelectedId.delete(id);
      } else {
        newSelectedId.add(id);
      }
      return Array.from(newSelectedId);
    });
  };

  const send = () => {
    if (!message.trim()) return;

    sendMessage("project-message", {
      message,
      sender: user._id,
    });
    appendOutgoingMessage(message);
    setMessage("");
  };

  const appendOutgoingMessage = (messageObj) => {
    if (!messageBox.current) return;

    const message = document.createElement("div");
    message.classList.add(
      "outgoing-message",
      "flex",
      "flex-col",
      "p-3",
      "rounded-lg",
      "max-w-[70%]",
      "gap-1",
      "ml-auto",
      "bg-indigo-600",
      "text-white"
    );
    message.innerHTML = `<small class='opacity-70 text-xs'>${user.email}</small>
    <p class='text-sm break-words'>${messageObj}</p>`;
    messageBox.current.appendChild(message);
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  };

  const appendIncomingMessage = (messageObject) => {
    if (!messageBox.current) return;
    const message = document.createElement("div");
    message.classList.add(
      "incoming-message",
      "flex",
      "flex-col",
      "p-3",
      "bg-gray-800",
      "rounded-lg",
      "max-w-[70%]",
      "gap-1",
      "text-gray-100"
    );
    message.innerHTML = `<small class='opacity-70 text-xs font-medium text-gray-400'>${messageObject.sender}</small>
    <p class='text-sm break-words'>${messageObject.message}</p>`;
    messageBox.current.appendChild(message);
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  };

  return (
    <main className="h-screen w-screen flex bg-gray-900">
      <section className="left relative h-full min-w-120 flex flex-col bg-gray-900 border-r border-gray-800">
        <header className="flex justify-between items-center p-4 border-b border-gray-800">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/home")}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              title="Back to home"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
            </button>
            <h1 className="ml-4 font-semibold text-lg text-gray-100">{location.state.project.name || "Project Chat"}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
              title="Add collaborator"
            >
              <UserPlusIcon className="h-5 w-5 text-gray-400" />
              <span className="hidden md:inline text-gray-400 text-sm">Add collaborator</span>
            </button>
            <button
              onClick={() => setSidePanel(!isSidePanel)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              title="View collaborators"
            >
              <Users className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </header>
        
        {/* Chat area */}
        <div className="conversation-area flex-grow flex flex-col h-0">
          <div
            ref={messageBox}
            className="message-box flex-grow flex flex-col p-4 gap-4 overflow-y-auto"
            style={{ height: "calc(100vh - 135px)" }}
          >
            {/* Messages will be appended here */}
          </div>
          
          {/* Input field area */}
          <div className="inputField w-full flex p-4 border-t border-gray-800">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 px-4 w-full rounded-l-full border-0 bg-gray-800 text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              type="text"
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === "Enter") send();
              }}
            />
            <button
              type="button"
              onClick={send}
              className="p-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-full transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Collaborators Side Panel */}
        <div
          className={`sidePanel w-full md:w-72 h-full bg-gray-900 absolute z-10 shadow-lg transition-all duration-300 ease-in ${
            isSidePanel ? "translate-x-0" : "-translate-x-full"
          } top-0 left-0 border-r border-gray-800`}
        >
          <header className="flex justify-between items-center p-4 border-b border-gray-800">
            <h1 className="font-semibold text-lg text-gray-100">Collaborators</h1>
            <button
              onClick={() => setSidePanel(!isSidePanel)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </header>
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 60px)" }}>
            {collaborator.map((collaborator) => (
              <div className="p-2" key={collaborator._id}>
                <div className="user cursor-pointer hover:bg-gray-800 rounded-lg flex gap-3 items-center p-3 transition-colors">
                  <div className="aspect-square rounded-full flex items-center justify-center w-10 h-10 bg-indigo-900 text-indigo-300">
                    <i className="ri-user-fill"></i>
                  </div>
                  <div>
                    <h1 className="font-medium text-gray-200">{collaborator.email}</h1>
                    <p className="text-xs text-gray-500">Collaborator</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Add Collaborator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
          <div className="bg-gray-800 p-6 rounded-xl w-96 max-w-[90%] relative shadow-xl border border-gray-700">
            <header className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-gray-100">Add Collaborators</h2>
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
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
                  <div className={`aspect-square rounded-full w-10 h-10 flex items-center justify-center text-white ${
                    selectedUserId.includes(user._id) ? "bg-indigo-600" : "bg-gray-700"
                  }`}>
                    <i className="ri-user-fill"></i>
                  </div>
                  <div>
                    <h1 className="font-medium text-gray-200">{user.email}</h1>
                    {selectedUserId.includes(user._id) && 
                      <p className="text-xs text-indigo-400">Selected</p>
                    }
                  </div>
                  {selectedUserId.includes(user._id) && 
                    <i className="ri-check-line ml-auto text-indigo-400 text-xl"></i>
                  }
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
      )}
    </main>
  );
};

export default Project;
