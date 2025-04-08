import React, { useState, useRef, useEffect } from 'react';
import { Send } from "lucide-react";
import { sendMessage } from "../../config/socket";

const ChatSection = ({ messages, setMessages, user, projectId }) => {
  const [message, setMessage] = useState("");
  const messageBox = useRef();

  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    if (!message.trim()) return;

    sendMessage("project-message", {
      message,
      sender: user._id,
    });
    
    setMessages((prev) => [
      ...prev,
      {
        sender: user.email,
        message: message,
        type: "outgoing",
      },
    ]);
    
    setMessage("");
  };

  return (
    <div className="conversation-area flex-grow flex flex-col h-0">
      <div
        ref={messageBox}
        className="message-box flex-grow flex flex-col p-4 gap-4 overflow-auto"
        style={{ height: "calc(100vh - 135px)" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.type === "outgoing"
                ? "outgoing-message flex flex-col p-3 rounded-lg max-w-80 w-fit gap-1 ml-auto bg-indigo-600 text-white"
                : "incoming-message flex flex-col p-3 bg-gray-800 rounded-lg max-w-80 w-fit gap-1 text-gray-100"
            }
          >
            <small className="opacity-70 text-xs">
              {msg.type === "outgoing" ? user.email : msg.sender}
            </small>
            <p className="text-sm break-words">{msg.message}</p>
          </div>
        ))}
      </div>

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
  );
};

export default ChatSection;
