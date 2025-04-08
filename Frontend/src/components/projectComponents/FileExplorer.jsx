import React from 'react';
import { FileIcon } from "lucide-react";

const FileExplorer = ({ fileTree, currentFile, setCurrentFile, openFiles, setOpenFiles }) => {
  const handleFileClick = (file) => {
    setCurrentFile(file);
    setOpenFiles([...new Set([...openFiles, file])]);
  };
  
  return (
    <div className="explorer h-full w-64 min-w-52 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="px-4 py-3 border-b border-gray-700">
        <h2 className="text-gray-300 font-medium">Files</h2>
      </div>
      <div className="file-tree w-full py-2">
        {Object.keys(fileTree).length === 0 ? (
          <p className="text-gray-500 text-sm px-4 py-2">No files available</p>
        ) : (
          Object.keys(fileTree).map((file, index) => (
            <button
              key={index}
              onClick={() => handleFileClick(file)}
              className="tree-element cursor-pointer p-2 py-1.5 px-4 flex items-center gap-2 w-full hover:bg-gray-700 transition-colors"
            >
              <FileIcon className="h-4 w-4 text-gray-400" />
              <p className="font-medium text-gray-300 text-sm truncate">{file}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
