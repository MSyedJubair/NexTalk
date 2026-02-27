import { useGetCurrentUser } from "@/lib/query";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { socket } from "@/lib/socket";

const UserProvider = ({ children }: {children: React.ReactNode}) => {
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const { data: user } = useGetCurrentUser();

  useEffect(() => {
    const handleOnlineUsers = (users:number[]) => {
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, []);

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user?._id]);

  const value = {
    user: user,
    onlineUsers: onlineUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;