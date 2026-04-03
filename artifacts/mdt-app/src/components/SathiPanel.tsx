
import { useEffect, useRef } from "react";
import { MessageCircle, Zap } from "lucide-react";

interface SathiMessage {
  text: string;
  timestamp: number;
  type: "info" | "warning" | "route" | "crisis";
}

interface Props {
  messages: SathiMessage[];
  isMarathi: boolean;
  isLoading: boolean;
}

const TYPE_COLORS = {
  info: "border-blue-500 bg-blue-500/10",
  warning: "border-yellow-500 bg-yellow-500/10",
  route: "border-green-500 bg-green-500/10",
  crisis: "border-red-500 bg-red-500/10",
};

const IDLE_MESSAGES_EN = [
  "Namaste! Mera naam Sathi hai. Mumbai ka transit network mera ghar hai! Kahan jaana hai?",
  "Arre, type karo yaar — kahan se kahan jaana hai? Main best route dhundhunga!",
  "Mumbai mein 8M+ log roz commute karte hain. Chalein, tumhara route ready karein!",
];

const IDLE_MESSAGES_MR = [
  "नमस्ते! मी साथी आहे. मुंबईचे ट्रान्झिट नेटवर्क मला माहीत आहे! कुठे जायचे आहे?",
  "अरे, सांग मला — कुठून कुठे जायचे आहे? मी सर्वोत्तम मार्ग शोधतो!",
];

export function SathiPanel({ messages, isMarathi, isLoading }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const idleMessages = isMarathi ? IDLE_MESSAGES_MR : IDLE_MESSAGES_EN;
  const displayMessages = messages.length > 0 ? messages : [{
    text: idleMessages[Math.floor(Date.now() / 10000) % idleMessages.length],
    timestamp: Date.now(),
    type: "info" as const
  }];

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
          🤖
        </div>
        <div>
          <div className="text-white font-bold text-sm">MDT Sathi</div>
          <div className="text-orange-100 text-xs">{isMarathi ? "तुमचा मुंबई मार्गदर्शक" : "Your Mumbai Transit Guide"}</div>
        </div>
        <div className="ml-auto">
          {isLoading ? (
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          ) : (
            <Zap size={16} className="text-orange-200" />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-3 max-h-48 overflow-y-auto space-y-2">
        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-lg border-l-2 px-3 py-2 text-sm text-slate-200 ${TYPE_COLORS[msg.type]}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
