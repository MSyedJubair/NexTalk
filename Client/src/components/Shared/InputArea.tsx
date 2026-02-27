import { Plus, Send, Smile } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useState, type FormEvent } from "react";
import { socket } from "@/lib/socket";
import { UserContext } from "@/Context/UserContext";
import type { User } from "@/Types";


interface Props {
  id: string;
  recipient: User;
}


const InputArea = ({id, recipient}:Props) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

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
  return (
    <div className="p-4 bg-zinc-950 border-t border-zinc-800/50">
      <form onSubmit={sendMessage} className="max-w-4xl mx-auto">
        <div className="relative flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-1.5 pl-4 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all">
          <button
            type="button"
            className="text-zinc-500 hover:text-zinc-300 transition"
          >
            <Plus size={20} />
          </button>

          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm h-9 text-zinc-100 placeholder:text-zinc-500"
            placeholder={`Message ${recipient?.fullname || "..."}`}
          />

          <button
            type="button"
            className="text-zinc-500 hover:text-zinc-300 transition px-1"
          >
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
  );
};

export default InputArea;
