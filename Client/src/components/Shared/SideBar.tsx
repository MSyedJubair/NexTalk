import { useState } from "react";
import { LogOut, Settings } from "lucide-react";
import { logout } from "@/lib/api";
import { Link, useNavigate } from "react-router";
import { useGetAllUsers, useGetCurrentUser } from "@/lib/query";
import { Spinner } from "../ui/spinner";
import UserProfile from "./UserProfile";

type User = {
  _id: number;
  fullname: string;
  email: string;
  imageUrl: string;
};

// const demoUsers: User[] = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     avatar: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     email: "bob@example.com",
//     avatar: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     name: "Charlie Brown",
//     email: "charlie@example.com",
//     avatar: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 4,
//     name: "Diana Prince",
//     email: "diana@example.com",
//     avatar: "https://i.pravatar.cc/150?img=4",
//   },
// ];

// const currentUser: User = {
//   id: 99,
//   name: "You",
//   email: "you@example.com",
//   avatar: "https://i.pravatar.cc/150?img=8",
// };

const SideBar = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const { data: User, isLoading } = useGetCurrentUser();
  const { data: Users, isLoading: isUsersLoading } = useGetAllUsers();

  if (isLoading || isUsersLoading) {
    return <Spinner />;
  }

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

        {Users.map((user: User) => (
          <Link to={`user/${user._id}`}>
            <div
              key={user._id}
              onClick={() => setActiveUser(user)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                activeUser?._id === user._id
                  ? "bg-indigo-600/20 border border-indigo-500"
                  : "hover:bg-gray-800"
              }`}
            >
              <img
                src={user.imageUrl || "../ProfilePlaceholder.png"}
                alt={user.fullname}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{user.fullname}</p>
                <p className="text-sm text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 p-4 space-y-4">
        {/* Current User */}
        <div className="flex items-center gap-3">
          <img
            src={User.imageUrl || "../ProfilePlaceholder.png"}
            alt={User.fullname}
            className="w-10 h-10 rounded-full invert"
          />
          <div className="flex-1">
            <p className="font-medium">{User.fullname}</p>
            <p className="text-sm text-gray-400 truncate">{User.email}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg transition text-sm">
            <Settings size={16} />
            Settings
          </button>

          <button
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 py-2 rounded-lg transition text-sm"
            onClick={() => {
              logout();
              navigate("/sign-up");
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
