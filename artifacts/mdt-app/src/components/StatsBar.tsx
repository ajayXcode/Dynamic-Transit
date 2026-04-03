
import { Train, Wifi, WifiOff, Clock } from "lucide-react";

interface Props {
  isOffline: boolean;
  isPeak: boolean;
  isMarathi: boolean;
  onTogglePeak: () => void;
  onToggleMarathi: () => void;
}

export function StatsBar({ isOffline, isPeak, isMarathi, onTogglePeak, onToggleMarathi }: Props) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs overflow-x-auto">
      <div className="flex items-center gap-1.5 text-orange-400 font-bold shrink-0">
        <Train size={14} />
        <span>MDT v2.0</span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {isOffline ? (
          <><WifiOff size={12} className="text-red-400" /><span className="text-red-400">Offline</span></>
        ) : (
          <><Wifi size={12} className="text-green-400" /><span className="text-green-400">Live</span></>
        )}
      </div>

      <div className="flex items-center gap-1 text-slate-400 shrink-0">
        <Clock size={12} />
        <span>{timeStr}</span>
      </div>

      <div className="flex items-center gap-1 text-slate-400 shrink-0">
        <span>8M+ daily commuters</span>
      </div>

      <div className="ml-auto flex items-center gap-2 shrink-0">
        <button
          onClick={onTogglePeak}
          className={`px-2.5 py-1 rounded-full font-semibold transition-colors ${
            isPeak ? "bg-red-500/20 text-red-400 border border-red-400/30" : "bg-slate-700 text-slate-400"
          }`}
        >
          {isPeak ? "⏰ Peak" : "🌙 Off-Peak"}
        </button>
        <button
          onClick={onToggleMarathi}
          className={`px-2.5 py-1 rounded-full font-semibold transition-colors ${
            isMarathi ? "bg-orange-500/20 text-orange-400 border border-orange-400/30" : "bg-slate-700 text-slate-400"
          }`}
        >
          {isMarathi ? "मराठी" : "EN"}
        </button>
      </div>
    </div>
  );
}
