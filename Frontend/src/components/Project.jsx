import axios from "../config/axios";
import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidePanel, setSidePanel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collaborator,SetCollaborators]=useState(location.state.project.users)
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUser] = useState([]);

  async function addCollaborator() {
    console.log(selectedUserId)
    const result = await axios.put("project/add-user", {
      projectId: location.state.project._id,
      users: selectedUserId,
    });
    if(result){
      window.location.reload()
    }
  }
  
  async function getCollaborators(){
    const result = await axios.get(`project/get-project/${location.state.project._id}`);
    if(result){
      SetCollaborators(result.data.project.users);
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

  useEffect(() => {
    sendRequest();
    getCollaborators();
  }, []);

  return (
    <main className="h-screen w-screen flex">
      <section className=" left  relative h-full min-w-80 flex flex-col bg-slate-300">
        <header className="flex justify-between  p-2 py-4 w-full bg-slate-200">
          <button
            onClick={() => {
              navigate("/home");
            }}
            className="p-1 px-3"
          >
            <i className="ri-arrow-go-back-line"></i>
          </button>
          <div>
            <button
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
              className="p-1 px-3"
            >
              <i className="ri-user-add-fill"></i> Add collaborator
            </button>
            <button
              onClick={() => {
                setSidePanel(!isSidePanel);
              }}
              className="p-1 px-3"
            >
              <i className="ri-group-fill"></i>
            </button>
          </div>
        </header>
        {/* Chat area*/}
        <div className="conversation-area flex-grow flex flex-col">
          {/* messages area*/}
          <div className="message-box flex-grow flex flex-col p-2 gap-2">
            {/* incoming messages */}
            <div className="incoming-message flex flex-col p-2 bg-white rounded-md max-w-60 gap-1">
              <small className="opacity-65">example@gmail.com</small>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Impedit, neque!
              </p>
            </div>
            {/* outgoing messages*/}
            <div className="outgoing-message flex flex-col p-2 bg-white rounded-md max-w-60 gap-1 ml-auto">
              <small className="opacity-65">example@gmail.com</small>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Impedit, neque!
              </p>
            </div>
          </div>
          {/* Input field area */}
          <div className="inputField w-full flex">
            <input
              className="p-2 px-4 w-10/12 border-none outline-none"
              type="text"
              placeholder="Enter message"
            />
            <button type="button" className="flex-grow bg-blue-950 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
        <div
          className={`sidePanel w-full h-full bg-slate-300 absolute transition-all duration-300 ease-in ${
            isSidePanel ? "translate-x-0" : "-translate-x-full"
          } top-0}`}
        >
          <header className="flex justify-between items-center text-lg font-semibold p-2 py-3 w-full bg-slate-200">
            <h1>Collaborators</h1>
            <button
              onClick={() => {
                setSidePanel(!isSidePanel);
                console;
              }}
              className="p-1 px-3"
            >
              <i className="ri-close-line"></i>
            </button>
          </header>
          {collaborator.map((user) => (
            <div className="flex flex-col gap-2">
              <div className="user cursor-pointer hover:bg-slate-400 flex gap-2 items-center p-2">
                <div className="aspect-square rounded-full w-fit h-fit items-center justify-center p-3 px-4 bg-slate-500">
                  <i className="ri-user-fill"></i>
                </div>
                <h1 className="font-semibold text-lg">{user.email}</h1>
              </div>
            </div>
          ))}
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={()=>{setIsModalOpen(!isModalOpen)}} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`user cursor-pointer hover:bg-slate-200 ${
                    Array.from(selectedUserId).indexOf(user._id) != -1
                      ? "bg-slate-200"
                      : ""
                  } p-2 flex gap-2 items-center`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={addCollaborator}
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
