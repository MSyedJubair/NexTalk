import { LogOut, Settings, UserRoundPen } from "lucide-react";
import { logout } from "@/lib/api";
import { Link, useNavigate } from "react-router";
import { useGetAllUsers, useGetCurrentUser } from "@/lib/query";
import { type User } from "@/Types";
import UserProfile from "./UserProfile";
import Loader from "./Loader";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const SideBar = () => {
  const navigate = useNavigate();

  const { data: User, isLoading } = useGetCurrentUser();
  const { data: Users, isLoading: isUsersLoading } = useGetAllUsers();

  if (isLoading || isUsersLoading) {
    return <Loader />;
  }

  return (
    <aside className=" h-screen bg-gray-950 border-r border-gray-800 flex flex-col text-white">
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
      <div className="flex flex-row justify-between items-center border-t border-gray-800 p-4 space-y-4">
        {/* Current User */}
        <UserProfile user={User} />
        <Popover> 
          <PopoverTrigger asChild>
            <button className="flex h-15 w-15 items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg transition text-sm">
              <Settings size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-start justify-center">
            <button
              className="flex-1 flex w-60   items-center justify-start gap-2 bg-red-600 hover:bg-red-500 py-2 rounded-lg transition text-sm"
              onClick={() => {
                logout();
                navigate("/sign-up");
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
            <button
              className="flex-1 flex w-60  items-center justify-start gap-2 bg-red-600 hover:bg-red-500 py-2 rounded-lg transition text-sm"
              onClick={() => {
                logout();
                navigate("/sign-up");
              }}
            >
              <UserRoundPen />
              Update Profile
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
};

export default SideBar;
