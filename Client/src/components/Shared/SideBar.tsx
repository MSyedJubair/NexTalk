import React, { useState } from "react";
import { LogOut, Settings } from "lucide-react";
import { logout } from "@/lib/api";
import { useNavigate } from "react-router";

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

const demoUsers: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const currentUser: User = {
  id: 99,
  name: "You",
  email: "you@example.com",
  avatar: "https://i.pravatar.cc/150?img=8",
};

const SideBar = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const navigate = useNavigate()

  return (
    <aside className="w-72 h-screen bg-gray-950 border-r border-gray-800 flex flex-col text-white">
      
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-xl font-bold tracking-wide">NexTalk</h2>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <p className="text-xs uppercase text-gray-500 mb-3 tracking-wider">
          Chats
        </p>

        {demoUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => setActiveUser(user)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
              activeUser?.id === user.id
                ? "bg-indigo-600/20 border border-indigo-500"
                : "hover:bg-gray-800"
            }`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 p-4 space-y-4">
        
        {/* Current User */}
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium">{currentUser.name}</p>
            <p className="text-sm text-gray-400 truncate">
              {currentUser.email}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg transition text-sm">
            <Settings size={16} />
            Settings
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 py-2 rounded-lg transition text-sm" onClick={() => {
            logout()
            navigate('/sign-up')
          }}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;