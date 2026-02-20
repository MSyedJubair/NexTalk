import React from "react";

const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col min-h-screen justify-center items-center bg-black text-white p-6">
      {/* Icon / Illustration */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
          />
        </svg>
      </div>

      {/* Welcome Text */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        Welcome to NexTalk
      </h1>
      <p className="text-gray-400 text-center max-w-sm">
        Select a chat from the left sidebar to start messaging your friends.
        Real-time conversations made simple and secure.
      </p>
    </div>
  );
};

export default WelcomeScreen;