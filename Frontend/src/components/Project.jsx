import axios from "../config/axios";
import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { initializeSocket, receiveMessage } from "../config/socket";
import { UserContext } from "../context/user.context";
import { getWebContainer } from "../config/webContainer";
import ChatSection from "./projectComponents/ChatSection";
import Header from "./projectComponents/Header";
import FileExplorer from "./projectComponents/FileExplorer";
import CodeEditor from "./projectComponents/CodeEditor";
import PreviewPanel from "./projectComponents/PreviewPanel";
import CollaboratorModal from "./projectComponents/CollaboratorModal";
import CollaboratorSidebar from "./projectComponents/CollaboratorSidebar";

const Project = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  // Project state
  const [fileTree, setFileTree] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);
  
  // UI state
  const [isSidePanel, setSidePanel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState([]);
  
  // Collaborators state
  const [collaborator, setCollaborators] = useState(location.state.project.users);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  
  // Web container state
  const [webContainer, setWebContainer] = useState(null);
  const [pendingFileTree, setPendingFileTree] = useState(null);
  const [iframeUrl, setIframeUrl] = useState(null);
  const [runProcess, setRunProcess] = useState(null);
  const [isIframeLoading, setIsIframeLoading] = useState(false);

  useEffect(() => {
    requestToFetchAllUsers();
    getCollaborators();
    initializeSocket(location.state.project._id);
    
    if (!webContainer) {
      getWebContainer().then(container => {
        setWebContainer(container);
        console.log("container started");
      });
    }

    receiveMessage("project-message", handleIncomingMessage);

    axios.get(`/project/get-project/${location.state.project._id}`).then(res => {
      setFileTree(res.data.project.fileTree || {});
    });
  }, []);

  useEffect(() => {
    if (webContainer && pendingFileTree) {
      webContainer.mount(pendingFileTree);
      setPendingFileTree(null);
    }
  }, [webContainer, pendingFileTree]);

  const handleIncomingMessage = (data) => {
    console.log(data);
    try {
      if (data.sender === "AI") {
        const message = JSON.parse(data.message);
        if (message.fileTree) {
          const newFileTree = message.fileTree || {};
          setFileTree(newFileTree);
          
          if (webContainer) {
            webContainer.mount(newFileTree);
          } else {
            setPendingFileTree(newFileTree);
          }
        }
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            message: message.text,
            type: "incoming",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            message: data.message,
            type: "incoming",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: data.sender,
          message: "Unable To process request at the moment.. Please try Again or after a moment!!",
          type: "incoming",
        },
      ]);
      console.log(error);
    }
  };

  async function getCollaborators() {
    const result = await axios.get(`project/get-project/${location.state.project._id}`);
    if (result) {
      setCollaborators(result.data.project.users);
    }
  }

  async function addCollaborator() {
    const result = await axios.put("project/add-user", {
      projectId: location.state.project._id,
      users: selectedUserId,
    });
    if (result) {
      window.location.reload();
    }
  }

  async function requestToFetchAllUsers() {
    setIsModalOpen(false);
    const result = await axios.get("user/all");
    setUsers(result.data);
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

  function saveFileTree(ft) {
    axios.put('/project/update-file-tree', {
      projectId: location.state.project._id,
      fileTree: ft
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  const closeFile = (fileToClose, e) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(file => file !== fileToClose);
    setOpenFiles(newOpenFiles);
    if (currentFile === fileToClose) {
      if (newOpenFiles.length > 0) {
        setCurrentFile(newOpenFiles[newOpenFiles.length - 1]);
      } else {
        setCurrentFile(null);
      }
    }
  };

  const runProject = async () => {
    setIsIframeLoading(true);
    await webContainer.mount(fileTree);
    
    const installProcess = await webContainer.spawn("npm", ["install"]);
    installProcess.output.pipeTo(new WritableStream({
      write(chunk) {
        console.log(chunk);
      }
    }));
    
    if (runProcess) {
      runProcess.kill();
    }
    
    let tempRunProcess = await webContainer.spawn("npm", ["start"]);
    tempRunProcess.output.pipeTo(new WritableStream({
      write(chunk) {
        console.log(chunk);
      }
    }));
    
    setRunProcess(tempRunProcess);
    
    webContainer.on('server-ready', (port, url) => {
      console.log(port, url);
      setIframeUrl(url);
      setIsIframeLoading(false);
    });
  };

  return (
    <main className="h-screen w-screen flex bg-gray-900">
      <section className="left relative h-screen min-w-120 flex flex-col bg-gray-900 border-r border-gray-800">
        <Header 
          projectName={location.state.project.name}
          navigate={navigate}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
        
        <ChatSection 
          messages={messages}
          setMessages={setMessages}
          user={user}
          projectId={location.state.project._id}
        />
        
        <CollaboratorSidebar 
          isSidePanel={isSidePanel}
          setSidePanel={setSidePanel}
          collaborator={collaborator}
        />
      </section>
      
      <section className="right flex-grow h-full flex bg-gray-900">
        <FileExplorer 
          fileTree={fileTree}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          openFiles={openFiles}
          setOpenFiles={setOpenFiles}
        />
        
        <CodeEditor 
          fileTree={fileTree}
          setFileTree={setFileTree}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          openFiles={openFiles}
          closeFile={closeFile}
          runProject={runProject}
          saveFileTree={saveFileTree}
        />
        
        {iframeUrl && webContainer && (
          <PreviewPanel 
            iframeUrl={iframeUrl}
            setIframeUrl={setIframeUrl}
            isIframeLoading={isIframeLoading}
            setIsIframeLoading={setIsIframeLoading}
          />
        )}
      </section>
      
      {isModalOpen && (
        <CollaboratorModal 
          users={users}
          selectedUserId={selectedUserId}
          handleUserClick={handleUserClick}
          addCollaborator={addCollaborator}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </main>
  );
};

export default Project;
