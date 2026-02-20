import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser, useGetMessages, useGetAllUsers } from "@/lib/query";
import { socket } from "@/lib/socket";
import { useEffect, useRef, useState, type FormEvent, useMemo } from "react";
import { useParams } from "react-router";
import { type message, type User } from "@/Types";
import { Send, Phone, Video, Info, Plus, Smile } from "lucide-react";
import Avatar from "@/components/Shared/Avatar";

const Chat = () => {
  const { id } = useParams();
  const { data: user } = useGetCurrentUser();
  const { data: msgData, isLoading } = useGetMessages(id!);
  const { data: allUsers } = useGetAllUsers();

  const [messages, setMessages] = useState<message[]>([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Find the person we are chatting with
  const recipient = useMemo(() => 
    allUsers?.find((u: User) => u._id.toString() === id), 
  [allUsers, id]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !user?._id || !id) return;

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: id,
      text: message,
    });
    setMessage("");
  };

  useEffect(() => {
    if (!user?._id) return;
    socket.emit("join", user._id);
  }, [user?._id]);

  useEffect(() => {
    if (!isLoading && msgData?.messages) {
      setMessages([...msgData.messages]);
    }
  }, [msgData, isLoading, id]);

  useEffect(() => {
    const handleMessage = (newMessage: message) => {
      setMessages((prev) => [...prev, newMessage]);
    };
    socket.on("receiveMessage", handleMessage);
    return () => { socket.off("receiveMessage", handleMessage); };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex w-full flex-col h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="h-18 shrink-0 backdrop-blur-xl bg-zinc-900/50 border-b border-zinc-800/50 px-6 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar imageUrl={recipient?.imageUrl} name={recipient?.fullname} />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-zinc-100">
              {recipient?.fullname || "Loading..."}
            </h2>
            <p className="text-[11px] text-emerald-500 font-medium">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
            <Phone size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
            <Video size={18} />
          </Button>
          <div className="w-px h-6 bg-zinc-800 mx-2" />
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
            <Info size={18} />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4 custom-scrollbar bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900/20 to-zinc-950">
        {isLoading ? (
          <div className="flex h-full items-center justify-center"><Spinner /></div>
        ) : messages.length > 0 ? (
          <>
            {/* Conversation Starter Info */}
            <div className="flex flex-col items-center py-10 space-y-2">
              <Avatar imageUrl={recipient?.imageUrl} name={recipient?.fullname} className="w-16 h-16 text-xl" />
              <p className="text-sm text-zinc-400">This is the start of your chat with <b>{recipient?.fullname}</b></p>
            </div>

            {messages.map((msg: message) => {
              const isOwn = msg.senderId === user?._id;
              return (
                <div key={msg._id} className={`flex w-full ${isOwn ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`group flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[75%]`}>
                    <div className={`px-4 py-2.5 text-sm shadow-sm transition-all ${
                      isOwn 
                        ? "bg-blue-600 text-white rounded-2xl rounded-tr-none" 
                        : "bg-zinc-800 text-zinc-100 rounded-2xl rounded-tl-none border border-zinc-700/50"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-zinc-600 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

      {/* Input Area */}
      <div className="p-4 bg-zinc-950 border-t border-zinc-800/50">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-1.5 pl-4 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all">
            <button type="button" className="text-zinc-500 hover:text-zinc-300 transition">
              <Plus size={20} />
            </button>
            
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm h-9 text-zinc-100 placeholder:text-zinc-500"
              placeholder={`Message ${recipient?.fullname || '...'}`}
            />

            <button type="button" className="text-zinc-500 hover:text-zinc-300 transition px-1">
              <Smile size={20} />
            </button>

            <Button 
              type="submit" 
              disabled={!message.trim()}
              className="rounded-xl h-9 w-9 p-0 bg-blue-600 hover:bg-blue-500 text-white transition-all disabled:opacity-50 disabled:bg-zinc-800"
            >
              <Send size={16} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;