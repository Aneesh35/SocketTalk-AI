import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Plus, User, X } from "lucide-react";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  async function createProject(e) {
    try {
      e.preventDefault();
      const result = await axios.post("/project/create", { name: projectName });
      if (result) {
        setIsModalOpen(false);
        runOnLoad(); // Refresh projects after creation
        setProjectName(""); // Reset input field
      }
    } catch (error) {
      console.log(error);
    }
  }

  const runOnLoad = async () => {
    try {
      const result = await axios.get("/project/all");
      if (result) {
        setProject(result.data.projects);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    runOnLoad();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-indigo-400">Your Projects</h1>
        
        <div className="projects grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center h-40 bg-gray-800 border border-gray-700 rounded-lg transition-all hover:bg-gray-750 hover:border-indigo-500"
          >
            <Plus className="w-8 h-8 mb-2 text-indigo-500" />
            <span className="font-medium">New Project</span>
          </button>

          {project.map((project) => (
            <div
              key={project._id}
              onClick={() => {
                navigate(`/project`, {
                  state: { project },
                });
              }}
              className="flex flex-col justify-between h-40 p-5 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-750 hover:border-indigo-500 transition-all"
            >
              <h2 className="text-lg font-semibold text-indigo-300">{project.name}</h2>

              <div className="flex items-center mt-auto text-sm text-gray-400">
                <User className="w-4 h-4 mr-2" />
                <span>Collaborators: {project.users.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-indigo-400">Create New Project</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;