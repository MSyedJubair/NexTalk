import { MessageSquare, ShieldCheck, Zap } from "lucide-react";

const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col min-h-screen justify-center items-center bg-zinc-950 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700">
        {/* Animated Icon Container */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl animate-bounce-slow">
            <MessageSquare size={48} className="text-blue-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-4xl font-extrabold mb-3 text-center tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-zinc-500">
          Welcome to NexTalk
        </h1>
        
        <p className="text-zinc-400 text-center max-w-sm px-6 leading-relaxed mb-10">
          Select a conversation from the sidebar to start messaging. 
          Connect with friends in real-time.
        </p>

        {/* Feature Tags */}
        <div className="flex gap-4">
          <FeatureTag icon={<Zap size={14} />} text="Fast" />
          <FeatureTag icon={<ShieldCheck size={14} />} text="Secure" />
        </div>

        {/* Visual Cue for Sidebar */}
        <div className="mt-12 flex items-center gap-2 text-zinc-600 animate-pulse">
          <div className="w-8 h-px bg-zinc-800" />
          <span className="text-[10px] uppercase tracking-[0.2em]">Select a chat to begin</span>
          <div className="w-8 h-px bg-zinc-800" />
        </div>
      </div>
    </div>
  );
};

const FeatureTag = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
    <span className="text-blue-500">{icon}</span>
    {text}
  </div>
);

export default WelcomeScreen;