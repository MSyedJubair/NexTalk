import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser, useGetMessages } from "@/lib/query";
import { socket } from "@/lib/socket";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useParams } from "react-router";
import { type message } from "@/Types";

const Chat = () => {
  const { id } = useParams();

  const { data: user } = useGetCurrentUser();
  const { data: msgData, isLoading } = useGetMessages(id!);

  const [messages, setMessages] = useState<message[]>([]);
  const [message, setMessage] = useState("");

  const bottomRef = useRef(null);

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

    setMessage(""); // clear input
  };

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", user._id);
  }, [user?._id]);

  useEffect(() => {
    if (!isLoading) {
      setMessages([...msgData.messages]);
    }
  }, [msgData, isLoading, id]);

  useEffect(() => {
    const handleMessage = (newMessage: message) => {
      setMessages((prev) => [...prev, newMessage]);
      console.log("Received Msg:", newMessage);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
    console.log("scrolled!!!");
  }, [messages]);

  return (
    <div className="flex w-full flex-col h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-zinc-900/70 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Chat</h2>
          <p className="text-xs text-zinc-400">Realtime conversation</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {isLoading ? (
          <Spinner />
        ) : messages && messages.length > 0 ? (
          messages.map((msg: message) => {
            const isOwn = msg.senderId === user?._id;

            return (
              <div
                key={msg._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-md px-5 py-3 text-sm rounded-2xl shadow-md transition-all ${
                    isOwn
                      ? "bg-blue-600/90 text-white rounded-br-md"
                      : "bg-zinc-800 text-zinc-100 rounded-bl-md border border-zinc-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
            No messages yet
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="sticky bottom-0 backdrop-blur-md bg-zinc-900/80 border-t border-zinc-800 px-6 py-4"
      >
        <div className="flex items-center gap-3 bg-zinc-800/70 border border-zinc-700 rounded-full px-4 py-2 focus-within:border-blue-500 transition">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm text-zinc-100 placeholder:text-zinc-500"
            placeholder="Type a message..."
          />

          <Button
            type="submit"
            className="rounded-full px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
