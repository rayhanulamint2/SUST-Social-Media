import React from "react";

export default function PostCreationSection() {
  // Dummy user data
  const user = {
    name: "Khalid",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center gap-4 bg-gray-900/80 border border-blue-400/10 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-xl">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
        <input
          type="text"
          placeholder={`Want to share something, ${user.name}?`}
          className="flex-1 bg-gray-800/80 text-gray-200 placeholder-gray-400 px-5 py-3 rounded-full outline-none border-none text-base font-normal shadow-inner"
        />
      </div>
    </div>
  );
}