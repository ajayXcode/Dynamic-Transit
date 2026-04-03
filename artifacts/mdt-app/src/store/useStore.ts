
import { create } from "zustand";
import { RouteResult } from "../logic/router";
import { DisruptionScenario, DISRUPTIONS } from "../logic/sathi";
import { TransitEdge, EDGES, NODES, initializeOfflineData } from "../data/mumbaiGraph";

interface SathiMessage {
  text: string;
  timestamp: number;
  type: "info" | "warning" | "route" | "crisis";
}

interface MDTStore {
  origin: string;
  destination: string;
  route: RouteResult | null;
  isLoading: boolean;
  isPeak: boolean;
  isMarathi: boolean;
  isOffline: boolean;
  disruptions: DisruptionScenario[];
  sathiMessages: SathiMessage[];
  edges: TransitEdge[];
  activeRouteIndex: number;

  setOrigin: (s: string) => void;
  setDestination: (s: string) => void;
  setRoute: (r: RouteResult | null) => void;
  setLoading: (v: boolean) => void;
  togglePeak: () => void;
  toggleMarathi: () => void;
  toggleDisruption: (id: string) => void;
  addSathiMessage: (msg: string, type?: SathiMessage["type"]) => void;
  resetSathiMessages: () => void;
  setActiveRouteIndex: (i: number) => void;
  swapOriginDestination: () => void;
}

export const useStore = create<MDTStore>((set, get) => {
  const offline = initializeOfflineData();
  return {
    origin: "",
    destination: "",
    route: null,
    isLoading: false,
    isPeak: (() => {
      const h = new Date().getHours();
      return (h >= 7 && h <= 10) || (h >= 17 && h <= 21);
    })(),
    isMarathi: false,
    isOffline: !navigator.onLine,
    disruptions: DISRUPTIONS,
    sathiMessages: [],
    edges: offline.edges as TransitEdge[],
    activeRouteIndex: 0,

    setOrigin: (s) => set({ origin: s }),
    setDestination: (s) => set({ destination: s }),
    setRoute: (r) => set({ route: r }),
    setLoading: (v) => set({ isLoading: v }),
    togglePeak: () => set(s => ({ isPeak: !s.isPeak })),
    toggleMarathi: () => set(s => ({ isMarathi: !s.isMarathi })),
    swapOriginDestination: () => set(s => ({
      origin: s.destination,
      destination: s.origin,
      route: null,
    })),

    toggleDisruption: (id) => set(s => ({
      disruptions: s.disruptions.map(d =>
        d.id === id ? { ...d, active: !d.active } : d
      ),
      edges: (() => {
        const disruption = s.disruptions.find(d => d.id === id);
        if (!disruption) return s.edges;
        const nowActive = !disruption.active;
        return EDGES.map(e => {
          const lineAffected = disruption.affectedLines.some(
            line => e.lineId === line || e.mode === line || e.mode.startsWith(line.replace("local_", "local_"))
          );
          const nodeAffected =
            disruption.affectedNodes.includes(e.from) ||
            disruption.affectedNodes.includes(e.to);
          if (lineAffected || nodeAffected) {
            return { ...e, active: !nowActive };
          }
          return e;
        });
      })(),
      route: null,
    })),

    addSathiMessage: (text, type = "info") => set(s => ({
      sathiMessages: [
        { text, timestamp: Date.now(), type },
        ...s.sathiMessages.slice(0, 9)
      ]
    })),
    resetSathiMessages: () => set({ sathiMessages: [] }),
    setActiveRouteIndex: (i) => set({ activeRouteIndex: i }),
  };
});
