import {
  LogOut,
  Settings,
  UserRoundPen,
  Search,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { logout } from "@/lib/api";
import { NavLink, useNavigate } from "react-router";
import { useGetAllUsers } from "@/lib/query";
import { type User } from "@/Types";
import UserProfile from "./UserProfile";
import { useContext, useState } from "react";
import Loader from "./Loader";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UserContext } from "@/Context/UserContext";

const SideBar = () => {
  const navigate = useNavigate();

  const { user:User, onlineUsers } = useContext(UserContext)

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // useEffect(() => {
  //   socket.on("onlineUsers", (users) => {
  //     setOnlineUsers(users);
  //   });

  //   return () => {
  //     socket.off("onlineUsers")
  //   };
  // }, []);

  const { data: Users, isLoading: isUsersLoading } = useGetAllUsers();

  if (isUsersLoading) return <Loader />;

  return (
    <>
      {/* 📱 Mobile Top Bar */}
      <div className="md:hidden flex items-start justify-center p-4 bg-zinc-950 border-b border-zinc-800">
        <button onClick={() => setIsMobileOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* 📱 Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen
          ${isDesktopCollapsed ? "md:w-20" : "md:w-72"}
          w-72
          bg-zinc-950 border-r border-zinc-800
          flex flex-col text-zinc-200
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          {!isDesktopCollapsed && (
            <img
              src="../NexTalk.png"
              alt="Logo"
              className="h-12 object-contain"
            />
          )}

          <div className="flex items-center gap-2">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsDesktopCollapsed((prev) => !prev)}
              className="hidden md:flex p-2 hover:bg-zinc-800 rounded-md"
            >
              {isDesktopCollapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>

            {/* Mobile Close */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-2 hover:bg-zinc-800 rounded-md"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search (hide when collapsed desktop) */}
        {!isDesktopCollapsed && (
          <div className="px-4 pt-4 hidden md:block">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                size={14}
              />
              <input
                placeholder="Search chats..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Users */}
        <div
          className={`flex-1 overflow-y-auto px-2 py-4 space-y-1 ${
            isDesktopCollapsed ? "items-center" : ""
          }`}
        >
          {!isDesktopCollapsed && (
            <p className="px-3 text-[11px] font-semibold uppercase text-zinc-500 mb-2 tracking-widest hidden md:block">
              Recent Chats
            </p>
          )}

          {Users?.map((user: User) => (
            <NavLink
              key={user._id}
              to={`user/${user._id}`}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 p-2 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100"
                }
              `}
            >
              <UserProfile
                user={user}
                collapsed={isDesktopCollapsed}
                isOnline={onlineUsers.includes(user._id)}
              />
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-zinc-800 p-3 py-6">
          <div className="flex items-center justify-between gap-2">
            {!isDesktopCollapsed && (
              <UserProfile user={User!} collapsed={isDesktopCollapsed} />
            )}

            <Popover>
              <PopoverTrigger asChild>
                <button className="p-2 hover:bg-zinc-800 rounded-md">
                  <Settings size={20} />
                </button>
              </PopoverTrigger>

              <PopoverContent
                side="right"
                className="w-56 bg-zinc-900 border-zinc-800 p-1"
              >
                <button
                  onClick={() => navigate("/update-profile")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-800 rounded-md"
                >
                  <UserRoundPen size={16} />
                  Update Profile
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/sign-up");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md"
                >
                  <LogOut size={16} />
                  Log out
                </button>

                {isDesktopCollapsed && (
                  <div className="p-3"><UserProfile user={User!} collapsed={false} /></div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
