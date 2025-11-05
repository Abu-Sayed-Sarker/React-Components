import React, { useState, useRef, useEffect } from "react";
import { Send, Menu, MoreVertical, Paperclip, Smile } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How are you doing?",
      sender: "other",
      time: "10:30 AM",
    },
    {
      id: 2,
      text: "I'm doing great! Just working on some projects.",
      sender: "me",
      time: "10:32 AM",
    },
    {
      id: 3,
      text: "That's awesome! What are you working on?",
      sender: "other",
      time: "10:33 AM",
    },
    {
      id: 5,
      text: "Building a responsive chat interface with React and Tailwind CSS!",
      sender: "me",
      time: "10:35 AM",
    },
    {
      id: 6,
      text: "Building a responsive chat interface with React and Tailwind CSS!",
      sender: "me",
      time: "10:35 AM",
    },
    {
      id: 7,
      text: "Building a responsive chat interface with React and Tailwind CSS!",
      sender: "me",
      time: "10:35 AM",
    },
    {
      id: 8,
      text: "Building a responsive chat interface with React and Tailwind CSS!",
      sender: "me",
      time: "10:35 AM",
    },
    {
      id: 9,
      text: "Building a responsive chat interface with React and Tailwind CSS!",
      sender: "me",
      time: "10:35 AM",
    },
    {
      id: 10,
      text: "Building a responsive chat interface with React and Tailwind CSS!",
      sender: "me",
      time: "10:35 AM",
    },
    {
      id: 11,
      text: "Building a responsive chat interface with React and Tailwind CSS!",
      sender: "me",
      time: "10:35 AM",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        setIsKeyboardVisible(viewportHeight < windowHeight * 0.75);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      return () =>
        window.visualViewport.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "me",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button className="lg:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">John Doe</h2>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] sm:max-w-[60%] ${
                message.sender === "me" ? "order-2" : "order-1"
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === "me"
                    ? "bg-blue-500 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                }`}
              >
                <p className="text-sm sm:text-base break-words">
                  {message.text}
                </p>
              </div>
              <p
                className={`text-xs text-gray-500 mt-1 ${
                  message.sender === "me" ? "text-right" : "text-left"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div
        className={`bg-white border-t border-gray-200 px-4 py-3 ${
          isKeyboardVisible ? "pb-2" : "pb-safe"
        }`}
      >
        <div className="flex items-end space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors mb-1">
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-2 flex items-center">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none resize-none text-sm sm:text-base max-h-32 overflow-y-auto"
              rows="1"
              style={{ scrollbarWidth: "thin" }}
            />
            <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSend}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors mb-1"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
