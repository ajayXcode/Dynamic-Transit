
import { useCallback } from "react";
import { ArrowUpDown, Search, Navigation } from "lucide-react";
import { useStore } from "../store/useStore";
import { StationSearch } from "../components/StationSearch";
import { RouteCard } from "../components/RouteCard";
import { SathiPanel } from "../components/SathiPanel";
import { DisruptionPanel } from "../components/DisruptionPanel";
import { MapView } from "../components/MapView";
import { StatsBar } from "../components/StatsBar";
import { dijkstra } from "../logic/router";
import {
  generateSathiMessage,
  generateCrisisMessage,
} from "../logic/sathi";
import { NODES } from "../data/mumbaiGraph";

export default function Home() {
  const {
    origin, destination, route, isLoading, isPeak, isMarathi, isOffline,
    disruptions, sathiMessages, edges,
    setOrigin, setDestination, setRoute, setLoading,
    togglePeak, toggleMarathi, toggleDisruption, swapOriginDestination,
    addSathiMessage, resetSathiMessages,
  } = useStore();

  const handleSearch = useCallback(() => {
    if (!origin || !destination) {
      addSathiMessage(
        isMarathi ? "भाऊ, दोन्ही स्थानके निवडा!" : "Arre yaar, select both origin and destination first!",
        "warning"
      );
      return;
    }
    if (origin === destination) {
      addSathiMessage(
        isMarathi ? "एकाच ठिकाणी का जायचे?" : "Bhai, origin and destination are the same! Where do you want to go? 😄",
        "warning"
      );
      return;
    }

    setLoading(true);
    resetSathiMessages();

    setTimeout(() => {
      const result = dijkstra(origin, destination, edges, isPeak);
      setRoute(result);

      const activeDisruptions = disruptions.filter(d => d.active);
      const msg = generateSathiMessage(result, activeDisruptions, origin, destination, isMarathi);
      addSathiMessage(msg, result ? "route" : "warning");

      if (activeDisruptions.length > 0 && result) {
        activeDisruptions.forEach(d => {
          addSathiMessage(generateCrisisMessage(d, isMarathi), "crisis");
        });
      }

      setLoading(false);
    }, 400);
  }, [origin, destination, edges, isPeak, isMarathi, disruptions]);

  const handleDisruptionToggle = useCallback((id: string) => {
    const disruption = disruptions.find(d => d.id === id);
    if (!disruption) return;

    toggleDisruption(id);

    const nowActive = !disruption.active;
    if (nowActive) {
      addSathiMessage(generateCrisisMessage(disruption, isMarathi), "crisis");
    } else {
      addSathiMessage(
        isMarathi ? `${disruption.marathi} बंद केला. रस्ता पुन्हा उघडला!` : `${disruption.name} deactivated. Routes reopened!`,
        "info"
      );
    }

    if (origin && destination) {
      setTimeout(() => {
        const newEdges = useStore.getState().edges;
        const result = dijkstra(origin, destination, newEdges, isPeak);
        setRoute(result);
        if (nowActive) {
          const msg = generateSathiMessage(result, useStore.getState().disruptions.filter(d => d.active), origin, destination, isMarathi);
          addSathiMessage(msg, "route");
        }
      }, 100);
    }
  }, [disruptions, origin, destination, isPeak, isMarathi]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <StatsBar
        isOffline={isOffline}
        isPeak={isPeak}
        isMarathi={isMarathi}
        onTogglePeak={togglePeak}
        onToggleMarathi={toggleMarathi}
      />

      {/* Hero Header */}
      <div className="px-4 pt-6 pb-4 bg-gradient-to-b from-slate-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="text-3xl">🚇</div>
            <div>
              <h1 className="text-2xl font-black text-white">
                {isMarathi ? "मुंबई डायनॅमिक ट्रान्झिट" : "Mumbai Dynamic Transit"}
              </h1>
              <p className="text-slate-400 text-sm">
                {isMarathi ? "AI-शक्ती असलेले स्मार्ट ट्रान्झिट प्लॅनर" : "AI-powered Smart Transit Planner · MDT v2.0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search Box */}
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 space-y-3">
              <div className="text-sm font-semibold text-slate-300 mb-2">
                {isMarathi ? "🗺️ मार्ग शोधा" : "🗺️ Plan Your Route"}
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">
                    {isMarathi ? "सुरुवात" : "From"}
                  </label>
                  <StationSearch
                    value={origin}
                    onChange={setOrigin}
                    placeholder={isMarathi ? "सुरुवातीचे स्थानक..." : "Origin station..."}
                    isMarathi={isMarathi}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={swapOriginDestination}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors"
                    title="Swap"
                  >
                    <ArrowUpDown size={14} />
                  </button>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">
                    {isMarathi ? "मंजिल" : "To"}
                  </label>
                  <StationSearch
                    value={destination}
                    onChange={setDestination}
                    placeholder={isMarathi ? "गंतव्य स्थानक..." : "Destination station..."}
                    isMarathi={isMarathi}
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isLoading || !origin || !destination}
                className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-orange-500 hover:bg-orange-400 text-white"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search size={15} />
                )}
                {isMarathi ? "मार्ग शोधा" : "Find Best Route"}
              </button>

              {/* Quick shortcuts */}
              <div className="border-t border-slate-700 pt-3">
                <div className="text-xs text-slate-500 mb-2">{isMarathi ? "जलद निवड:" : "Quick picks:"}</div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { from: "CSMT", to: "ANDHERI", label: "CSMT → Andheri" },
                    { from: "CHURCHGATE", to: "VIRAR", label: "Churchgate → Virar" },
                    { from: "CSMT", to: "KALYAN", label: "CSMT → Kalyan" },
                    { from: "ANDHERI", to: "BKC", label: "Andheri → BKC" },
                    { from: "GATEWAY", to: "ELEPHANTA", label: "Gateway → Elephanta" },
                  ].map(q => (
                    <button
                      key={q.label}
                      className="text-xs px-2 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
                      onClick={() => {
                        setOrigin(q.from);
                        setDestination(q.to);
                      }}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sathi Panel */}
            <SathiPanel
              messages={sathiMessages}
              isMarathi={isMarathi}
              isLoading={isLoading}
            />

            {/* Disruption Panel */}
            <DisruptionPanel
              disruptions={disruptions}
              onToggle={handleDisruptionToggle}
              isMarathi={isMarathi}
            />

            {/* Mode Legend */}
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-4">
              <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                {isMarathi ? "मार्ग रंग" : "Line Colors"}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { mode: "local_central", label: "Central Line", color: "#E74C3C" },
                  { mode: "local_western", label: "Western Line", color: "#3498DB" },
                  { mode: "local_harbour", label: "Harbour Line", color: "#E67E22" },
                  { mode: "metro1", label: "Metro Line 1", color: "#9B59B6" },
                  { mode: "metro2", label: "Metro Line 2", color: "#2ECC71" },
                  { mode: "monorail", label: "Monorail", color: "#F39C12" },
                  { mode: "ferry", label: "Ferry", color: "#1ABC9C" },
                  { mode: "bus", label: "Bus", color: "#95A5A6" },
                ].map(item => (
                  <div key={item.mode} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-300">{isMarathi ? "" : item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Map + Route */}
          <div className="lg:col-span-2 space-y-4">
            {/* Map */}
            <MapView route={route} edges={edges} isMarathi={isMarathi} />

            {/* Route Result */}
            {route && (
              <RouteCard
                route={route}
                isMarathi={isMarathi}
                origin={origin}
                destination={destination}
              />
            )}

            {!route && !isLoading && (
              <div className="rounded-xl bg-slate-800/50 border border-slate-700 border-dashed p-8 text-center">
                <Navigation size={32} className="mx-auto text-slate-600 mb-3" />
                <div className="text-slate-500 font-medium">
                  {isMarathi ? "मार्ग शोधण्यासाठी स्थानके निवडा" : "Select stations and click 'Find Best Route'"}
                </div>
                <div className="text-slate-600 text-sm mt-1">
                  {isMarathi ? "Dijkstra algorithm वापरून सर्वोत्तम मार्ग मिळेल" : "Powered by Dijkstra algorithm with multi-modal routing"}
                </div>
              </div>
            )}

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: isMarathi ? "दैनंदिन प्रवासी" : "Daily Commuters", value: "8M+", icon: "👥" },
                { label: isMarathi ? "स्थानके" : "Stations Mapped", value: "50+", icon: "🗺️" },
                { label: isMarathi ? "CO₂ बचत" : "CO₂ Saved Daily", value: "240T", icon: "🌿" },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl bg-slate-800 border border-slate-700 p-3 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-orange-400 font-black text-xl">{stat.value}</div>
                  <div className="text-slate-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
