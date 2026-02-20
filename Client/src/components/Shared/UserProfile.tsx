import { useParams } from "react-router";
import Avatar from "./Avatar";
import { type User } from "@/Types";

const UserProfile = ({ user }: {user: User}) => {
  const { id } = useParams();
  
  return (
    <div
      key={user._id}
      className={`flex items-center justify-center gap-3 p-3 rounded-xl cursor-pointer transition ${
        id === user._id.toString()
          ? "bg-indigo-600/20 border border-indigo-500"
          : "hover:bg-gray-800"
      }`}
    >
      <Avatar imageUrl={user.imageUrl} name={user.fullname} />
      <div className="flex-1 hidden sm:block">
        <p className="font-medium">{user.fullname}</p>
        <p className="text-sm text-gray-400 truncate">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
