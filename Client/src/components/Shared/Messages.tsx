import { useGetMessages } from "@/lib/query";
import { socket } from "@/lib/socket";
import type { message, User } from "@/Types";
import { useContext, useEffect, useRef, useState } from "react";
import { Spinner } from "../ui/spinner";
import { UserContext } from "@/Context/UserContext";
import { Send } from "lucide-react";
import Avatar from "./Avatar";

interface Props {
  id: string;
  recipient: User;
}

const Messages = ({ id, recipient }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: msgData, isLoading } = useGetMessages(id);

  const { user } = useContext(UserContext);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [messages, setMessages] = useState<message[]>([]);
  const [prevId, setPrevId] = useState<string>(id);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // useEffect(() => {
  // if (msgData?.messages) {
  //     setMessages(msgData.messages);
  // }
  // }, [msgData, id]);

  if (id !== prevId) {
    setPrevId(id);
    setMessages(msgData?.messages || []);
  } else if (messages.length === 0 && msgData?.messages && !isLoading) {
    // Initial load sync
    setMessages(msgData.messages);
  }

  useEffect(() => {
    const handleMessage = (newMessage: message) => {
      setMessages((prev) => [...prev, newMessage]);
    };
    socket.on("receiveMessage", handleMessage);
    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-8 py-4 md:py-6 space-y-4 custom-scrollbar bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900/20 to-zinc-950">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : messages.length > 0 ? (
        <>
          {/* Conversation Starter Info */}
          <div className="flex flex-col items-center py-10 space-y-2">
            <Avatar
              imageUrl={recipient?.imageUrl}
              name={recipient?.fullname}
              className="w-16 h-16 text-xl"
            />
            <p className="text-sm text-zinc-400">
              This is the start of your chat with <b>{recipient?.fullname}</b>
            </p>
          </div>

          {messages.map((msg: message) => {
            const isOwn = msg.senderId === user?._id.toString();
            return (
              <div
                key={msg._id}
                className={`flex w-full ${isOwn ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`group flex flex-col ${
                    isOwn ? "items-end" : "items-start"
                  } max-w-[85%] sm:max-w-[75%] md:max-w-[65%]`}
                >
                  <div
                    className={`px-4 py-2.5 text-sm shadow-sm transition-all ${
                      isOwn
                        ? "bg-blue-600 text-white rounded-2xl rounded-tr-none"
                        : "bg-zinc-800 text-zinc-100 rounded-2xl rounded-tl-none border border-zinc-700/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-zinc-600 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-2">
          <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800">
            <Send size={24} className="text-zinc-700" />
          </div>
          <p className="text-sm italic">No messages yet. Wave hello!</p>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
