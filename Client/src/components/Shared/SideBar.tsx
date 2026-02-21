import { LogOut, Settings, UserRoundPen, Search, MessageSquarePlus } from "lucide-react";
import { logout } from "@/lib/api";
import { NavLink, useNavigate } from "react-router";
import { useGetAllUsers, useGetCurrentUser } from "@/lib/query";
import { type User } from "@/Types";
import UserProfile from "./UserProfile";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { socket } from "@/lib/socket";

const SideBar = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setCollapsed(width < 80); // Better threshold for icon-only mode
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  const { data: User, isLoading } = useGetCurrentUser();
  const { data: Users, isLoading: isUsersLoading } = useGetAllUsers();

  if (isLoading || isUsersLoading) return <Loader />;

  return (
    <aside
      ref={ref}
      className="h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col text-zinc-200 transition-all duration-300 ease-in-out"
    >
      {/* Header */}
      <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
        {!collapsed && (
          <img src="../NexTalk.png" alt="Logo" className="h-20 w-auto object-contain" />
        )}
        <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <MessageSquarePlus size={20} className="text-zinc-400" />
        </button>
      </div>

      {/* Search Bar - Only visible when not collapsed */}
      {!collapsed && (
        <div className="px-4 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
            <input 
              placeholder="Search chats..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      )}

      {/* Main Content: User List */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 custom-scrollbar">
        {!collapsed && (
          <p className="px-3 text-[11px] font-semibold uppercase text-zinc-500 mb-2 tracking-widest">
            Recent Chats
          </p>
        )}

        {Users?.map((user: User) => (
          <NavLink
            key={user._id}
            to={`user/${user._id}`}
            className={({ isActive }) => `
              flex items-center gap-3 p-2 rounded-lg transition-all duration-200
              ${isActive ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100'}
            `}
          >
            
            <UserProfile user={user} collapsed={collapsed} isOnline={
              onlineUsers.length > 0 && onlineUsers.includes(user._id)
            } />
          </NavLink>
        ))}
      </div>

      {/* Bottom Footer Section */}
      <div className="mt-auto border-t border-zinc-800 p-3 bg-zinc-950/50 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          {/* Current User Info */}
          <div className="flex-1 min-w-0">
             <UserProfile user={User} collapsed={collapsed} />
          </div>

          {/* Settings Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-white">
                <Settings size={20} />
              </button>
            </PopoverTrigger>
            
            <PopoverContent side="right" align="end" className="w-56 bg-zinc-900 border-zinc-800 p-1 shadow-2xl">
              <div className="px-2 py-1.5 text-xs font-medium text-zinc-500">My Account</div>
              
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
                onClick={() => navigate("/update-profile")}
              >
                <UserRoundPen size={16} className="text-zinc-400" />
                Update Profile
              </button>

              <div className="h-px bg-zinc-800 my-1" />

              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md transition-colors"
                onClick={() => {
                  logout();
                  navigate("/sign-up");
                }}
              >
                <LogOut size={16} />
                Log out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;