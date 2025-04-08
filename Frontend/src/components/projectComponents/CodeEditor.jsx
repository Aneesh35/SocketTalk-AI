import React from 'react';
import { Code, X, Play } from "lucide-react";

const CodeEditor = ({ 
  fileTree, 
  setFileTree, 
  currentFile, 
  setCurrentFile, 
  openFiles, 
  closeFile, 
  runProject, 
  saveFileTree 
}) => {
  return (
    <div className="code-editor flex flex-col flex-grow h-full">
      <div className="top flex justify-between w-full bg-gray-800 border-b border-gray-700">
        <div className="files flex overflow-x-auto">
          {openFiles.map((file, index) => (
            <button
              key={index}
              onClick={() => setCurrentFile(file)}
              className={`open-file cursor-pointer p-2 px-4 flex items-center gap-2 border-b-2 ${
                currentFile === file 
                  ? "bg-gray-700 border-indigo-500 text-gray-100" 
                  : "bg-gray-800 border-transparent text-gray-400 hover:bg-gray-750"
              }`}
            >
              <Code className="h-4 w-4" />
              <p className="font-medium text-sm">{file}</p>
              <button
                onClick={(e) => closeFile(file, e)}
                className="ml-2 p-0.5 rounded-full hover:bg-gray-600 text-gray-400 hover:text-gray-100 focus:outline-none"
                aria-label="Close file"
              >
                <X className="h-3 w-3" />
              </button>
            </button>
          ))}
        </div>

        <div className="actions flex items-center px-3">
          <button
            onClick={runProject}
            className="p-2 rounded flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors text-sm"
          >
            <Play className="h-4 w-4" />
            <span>Run Project</span>
          </button>
        </div>
      </div>

      <div className="bottom flex flex-grow overflow-auto">
        {fileTree[currentFile] ? (
          <div className="code-editor-area h-full overflow-auto flex-grow bg-gray-800 p-2">
            <pre className="hljs h-full">
              <code
                className="hljs h-full outline-none text-gray-100 p-4"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const updatedContent = e.target.innerText;
                  const ft = {
                    ...fileTree,
                    [currentFile]: {
                      file: {
                        contents: updatedContent,
                      },
                    },
                  };
                  setFileTree(ft);
                  saveFileTree(ft);
                }}
                dangerouslySetInnerHTML={{
                  __html: fileTree[currentFile] && 
                    window.hljs ? 
                    window.hljs.highlight(
                      "javascript",
                      fileTree[currentFile].file.contents
                    ).value : 
                    fileTree[currentFile]?.file.contents || ""
                }}
                style={{
                  whiteSpace: "pre-wrap",
                  paddingBottom: "25rem",
                  counterSet: "line-numbering",
                  fontFamily: "monospace",
                }}
              />
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-800 text-gray-500">
            {openFiles.length > 0 ? 
              "Select a file to edit" : 
              "No files open. Select a file from the sidebar to start editing."
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
