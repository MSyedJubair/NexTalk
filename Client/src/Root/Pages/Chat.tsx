import { Button } from "@/components/ui/button";
import { useGetAllUsers } from "@/lib/query";
import {  useMemo, useContext } from "react";
import { useParams } from "react-router";
import { type User } from "@/Types";
import { Phone, Video, Info } from "lucide-react";
import Avatar from "@/components/Shared/Avatar";
import { UserContext } from "@/Context/UserContext";
import Messages from "@/components/Shared/Messages";
import InputArea from "@/components/Shared/InputArea";

const Chat = () => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers();
  const { onlineUsers } = useContext(UserContext)

  const recipient: User = useMemo(
    () => allUsers?.find((u: User) => u._id.toString() === id),
    [allUsers, id],
  );

  const isOnline = onlineUsers.includes(recipient?._id);


  return (
    <div className="flex w-full flex-col h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="shrink-0 backdrop-blur-xl bg-zinc-900/70 border-b border-zinc-800 px-4 md:px-6 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar imageUrl={recipient?.imageUrl} name={recipient?.fullname} />
            {isOnline ? 
            (<span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full" />):(<span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 border-2 border-zinc-900 rounded-full" />) }
          </div>
          <div>
            <h2 className="text-sm md:text-base font-semibold text-zinc-100 truncate max-w-35 md:max-w-none">
              {recipient?.fullname || "Loading..."}
            </h2>
            {isOnline ? (
              <p className="text-[11px] text-emerald-500 font-medium">Online</p>
            ) : (
              <p className="text-[11px] text-gray-300 font-medium">offline</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Phone size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Video size={18} />
          </Button>
          <div className="w-px h-6 bg-zinc-800 mx-2" />
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Info size={18} />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <Messages id={id!} recipient={recipient} />

      {/* Input Area */}
      <InputArea id={id!} recipient={recipient}/>
      
    </div>
  );
};

export default Chat;
