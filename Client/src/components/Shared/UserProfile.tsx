import Avatar from "./Avatar";
import { type User } from "@/Types";

interface UserProfileProps {
  user: User;
  collapsed: boolean;
  isOnline?: boolean
}

const UserProfile = ({ user, collapsed, isOnline=false }: UserProfileProps) => {
  // We'll assume "online" status for UI demo, but you can 
  // pull this from your user object if you have it.

  return (
    <div className="flex items-center gap-3 w-full min-w-0 group">
      {/* Avatar Container with Status Indicator */}
      <div className="relative shrink-0">
        <Avatar 
          imageUrl={user?.imageUrl} 
          name={user?.fullname} 
          className="ring-2 ring-transparent group-hover:ring-zinc-700 transition-all"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
        )}
      </div>

      {/* User Info - Hidden when Sidebar is collapsed */}
      {!collapsed && (
        <div className="flex-1 min-w-0 flex flex-col items-start overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm font-semibold text-zinc-100 truncate">
              {user?.fullname}
            </p>
            {/* Optional: Add a timestamp or "New" badge here */}
          </div>
          <p className="text-xs text-zinc-500 truncate w-full group-hover:text-zinc-400 transition-colors">
            {user?.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;