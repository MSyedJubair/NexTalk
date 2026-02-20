import { LogOut, Settings } from "lucide-react";
import { logout } from "@/lib/api";
import { Link, useNavigate } from "react-router";
import { useGetAllUsers, useGetCurrentUser } from "@/lib/query";
import { type User } from "@/Types";
import UserProfile from "./UserProfile";
import Loader from "./Loader";

const SideBar = () => {
  const navigate = useNavigate();

  const { data: User, isLoading } = useGetCurrentUser();
  const { data: Users, isLoading: isUsersLoading } = useGetAllUsers();

  if (isLoading || isUsersLoading) {
    return <Loader/>;
  }

  return (
    <aside className="w-xl h-screen bg-gray-950 border-r border-gray-800 flex flex-col text-white">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-xl font-bold tracking-wide">NexTalk</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <p className="text-xs uppercase text-gray-500 mb-3 tracking-wider">
          Chats
        </p>

        {Users.map((user: User) => (
          <Link to={`user/${user._id}`}>
            <UserProfile user={user} />
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 p-4 space-y-4">
        {/* Current User */}
        <UserProfile user={User}/>

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
