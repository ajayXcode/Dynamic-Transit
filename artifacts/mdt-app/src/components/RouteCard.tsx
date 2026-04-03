
import { RouteResult, RouteSegment } from "../logic/router";
import { MODE_COLORS, MODE_NAMES, MODE_MARATHI } from "../logic/sathi";
import { NODES } from "../data/mumbaiGraph";
import { Clock, DollarSign, Leaf, ArrowRight, Users, CloudRain } from "lucide-react";

interface Props {
  route: RouteResult;
  isMarathi: boolean;
  origin: string;
  destination: string;
}

function ModeChip({ segment, isMarathi }: { segment: RouteSegment; isMarathi: boolean }) {
  const color = MODE_COLORS[segment.mode] ?? "#6B7280";
  const name = isMarathi ? (MODE_MARATHI[segment.mode] ?? segment.mode) : (MODE_NAMES[segment.mode] ?? segment.mode);
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {name}
      <span className="opacity-80">~{Math.round(segment.duration)}m</span>
    </div>
  );
}

export function RouteCard({ route, isMarathi, origin, destination }: Props) {
  const originNode = NODES[origin];
  const destNode = NODES[destination];
  const crowdLabel = route.path.some(id => (NODES[id]?.crowdFactor ?? 0) > 0.85) ? "Very Crowded" : "Moderate";
  const floodRisk = route.path.some(id => NODES[id]?.floodProne);
  const monsoonScore = floodRisk ? 6 : 9;

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-750 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="text-orange-400">{isMarathi ? originNode?.marathi ?? origin : originNode?.name ?? origin}</span>
          <ArrowRight size={14} className="text-slate-400" />
          <span className="text-orange-400">{isMarathi ? destNode?.marathi ?? destination : destNode?.name ?? destination}</span>
        </div>
        <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          route.transfers === 0 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
        }`}>
          {route.transfers === 0 ? (isMarathi ? "थेट" : "Direct") : `${route.transfers} ${isMarathi ? "बदल" : "Transfer"}${route.transfers > 1 ? "s" : ""}`}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 divide-x divide-slate-700 border-b border-slate-700">
        <div className="px-3 py-2.5 flex flex-col items-center">
          <Clock size={14} className="text-orange-400 mb-1" />
          <div className="text-white font-bold text-lg">{route.totalDuration}</div>
          <div className="text-slate-400 text-xs">{isMarathi ? "मिनिट" : "min"}</div>
        </div>
        <div className="px-3 py-2.5 flex flex-col items-center">
          <span className="text-green-400 font-bold text-xs mb-1">₹</span>
          <div className="text-white font-bold text-lg">{route.totalCost}</div>
          <div className="text-slate-400 text-xs">{isMarathi ? "खर्च" : "fare"}</div>
        </div>
        <div className="px-3 py-2.5 flex flex-col items-center">
          <Leaf size={14} className="text-green-400 mb-1" />
          <div className="text-white font-bold text-lg">{route.co2Saved}g</div>
          <div className="text-slate-400 text-xs">{isMarathi ? "CO₂ बचत" : "CO₂ saved"}</div>
        </div>
        <div className="px-3 py-2.5 flex flex-col items-center">
          <span className="text-blue-400 font-bold text-xs mb-1">vs cab</span>
          <div className="text-white font-bold text-lg">₹{route.cabEquivalentCost}</div>
          <div className="text-slate-400 text-xs">{isMarathi ? "택시खर्च" : "cab cost"}</div>
        </div>
      </div>

      {/* Route segments */}
      <div className="px-4 py-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {route.segments.filter(s => s.mode !== "walk" || route.segments.length === 1).map((seg, i) => (
            <ModeChip key={i} segment={seg} isMarathi={isMarathi} />
          ))}
        </div>

        {/* Step-by-step */}
        <div className="space-y-1.5">
          {route.segments.map((seg, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <div
                className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: MODE_COLORS[seg.mode] ?? "#6B7280" }}
              />
              <div className="text-slate-300">
                <span className="font-medium text-white">{NODES[seg.from]?.name ?? seg.from}</span>
                <span className="text-slate-500 mx-1">→</span>
                <span className="font-medium text-white">{NODES[seg.to]?.name ?? seg.to}</span>
                <span className="text-slate-400 ml-1">
                  via {MODE_NAMES[seg.mode] ?? seg.mode} · {Math.round(seg.duration)}m · ₹{seg.cost}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer indicators */}
      <div className="px-4 py-2 border-t border-slate-700 flex gap-3 text-xs">
        <div className="flex items-center gap-1 text-slate-400">
          <Users size={11} />
          <span>{crowdLabel}</span>
        </div>
        <div className={`flex items-center gap-1 ${floodRisk ? "text-blue-400" : "text-green-400"}`}>
          <CloudRain size={11} />
          <span>{isMarathi ? "पाऊस सुरक्षा" : "Monsoon Safety"}: {monsoonScore}/10</span>
        </div>
        <div className="ml-auto text-slate-500">
          {isMarathi ? `रिक्षापेक्षा ₹${route.cabEquivalentCost - route.totalCost} बचत` : `₹${route.cabEquivalentCost - route.totalCost} saved vs cab`}
        </div>
      </div>
    </div>
  );
}
