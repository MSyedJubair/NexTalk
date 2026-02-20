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
    <div className="flex flex-col w-full h-screen bg-zinc-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-zinc-700 font-semibold text-lg">
        Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    isOwn
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-zinc-700 text-white rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-zinc-400 text-sm">No messages yet</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form
        className="p-4 border-t border-zinc-700 flex gap-2"
        onSubmit={sendMessage}
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-zinc-800 border-zinc-600 text-white"
          placeholder="Type a message..."
        />

        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
