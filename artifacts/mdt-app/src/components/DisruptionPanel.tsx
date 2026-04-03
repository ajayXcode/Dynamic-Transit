
import { DisruptionScenario } from "../logic/sathi";

interface Props {
  disruptions: DisruptionScenario[];
  onToggle: (id: string) => void;
  isMarathi: boolean;
}

const SEVERITY_COLORS = {
  low: "text-green-400 bg-green-400/10 border-green-400/30",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  high: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  critical: "text-red-400 bg-red-400/10 border-red-400/30",
};

export function DisruptionPanel({ disruptions, onToggle, isMarathi }: Props) {
  const activeCount = disruptions.filter(d => d.active).length;

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div>
          <div className="text-white font-bold text-sm">
            {isMarathi ? "🚧 संकट सिम्युलेटर" : "🚧 Crisis Simulator"}
          </div>
          <div className="text-slate-400 text-xs">
            {isMarathi ? "व्यत्यय सक्रिय करा आणि पुन्हा मार्ग पहा" : "Toggle disruptions to test rerouting"}
          </div>
        </div>
        {activeCount > 0 && (
          <div className="text-xs font-bold px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-400/30">
            {activeCount} {isMarathi ? "सक्रिय" : "Active"}
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        {disruptions.map(d => (
          <button
            key={d.id}
            onClick={() => onToggle(d.id)}
            className={`w-full text-left rounded-lg border p-3 transition-all duration-200 ${
              d.active
                ? SEVERITY_COLORS[d.severity]
                : "border-slate-700 bg-slate-700/30 text-slate-400 hover:border-slate-500"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{d.icon}</span>
                <div>
                  <div className={`text-xs font-semibold ${d.active ? "" : "text-slate-300"}`}>
                    {isMarathi ? d.marathi : d.name}
                  </div>
                  {d.active && (
                    <div className="text-xs opacity-75 mt-0.5 max-w-48 truncate">
                      {d.description}
                    </div>
                  )}
                </div>
              </div>
              <div className={`shrink-0 w-8 h-4 rounded-full transition-colors ${
                d.active ? "bg-red-500" : "bg-slate-600"
              } flex items-center`}>
                <div className={`w-3 h-3 rounded-full bg-white mx-0.5 transition-transform ${
                  d.active ? "translate-x-4" : "translate-x-0"
                }`} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
