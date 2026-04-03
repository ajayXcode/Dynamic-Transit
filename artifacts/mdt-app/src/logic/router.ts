
import { TransitEdge, buildAdjacencyList } from "../data/mumbaiGraph";

export interface RouteSegment {
  from: string;
  to: string;
  mode: string;
  duration: number;
  cost: number;
  co2: number;
  waypoints: [number, number][];
  lineId?: string;
}

export interface RouteResult {
  segments: RouteSegment[];
  totalDuration: number;
  totalCost: number;
  totalCo2: number;
  transfers: number;
  cabEquivalentCost: number;
  co2Saved: number;
  path: string[];
}

const TRANSFER_PENALTY: Record<string, number> = {
  same: 0,
  local_to_metro: 7,
  local_to_bus: 5,
  metro_to_bus: 3,
  local_to_walk: 2,
  any_to_ferry: 10,
  metro_to_metro: 3,
  monorail_to_local: 5,
};

function getModeFamily(mode: string): string {
  if (mode.startsWith("local")) return "local";
  if (mode.startsWith("metro")) return "metro";
  if (mode === "monorail") return "monorail";
  if (mode === "ferry") return "ferry";
  if (mode === "bus") return "bus";
  return "walk";
}

function getTransferPenalty(from: string, to: string): number {
  if (from === to) return 0;
  const key = `${from}_to_${to}`;
  if (TRANSFER_PENALTY[key] !== undefined) return TRANSFER_PENALTY[key];
  if (from === "walk" || to === "walk") return 1;
  if (to === "ferry" || from === "ferry") return TRANSFER_PENALTY["any_to_ferry"];
  if (to === "metro" || from === "metro") return TRANSFER_PENALTY["local_to_metro"];
  return 5;
}

export function dijkstra(
  origin: string,
  destination: string,
  edges: TransitEdge[],
  isPeak = false
): RouteResult | null {
  const adj = buildAdjacencyList(edges);

  const dist: Record<string, number> = {};
  const prev: Record<string, { node: string; edge: TransitEdge } | null> = {};
  const visited = new Set<string>();
  const lastMode: Record<string, string> = {};

  const allNodes = new Set<string>();
  edges.forEach(e => { allNodes.add(e.from); allNodes.add(e.to); });
  allNodes.forEach(n => { dist[n] = Infinity; prev[n] = null; });

  dist[origin] = 0;

  const pq: Array<{ node: string; cost: number }> = [{ node: origin, cost: 0 }];

  while (pq.length > 0) {
    pq.sort((a, b) => a.cost - b.cost);
    const { node } = pq.shift()!;

    if (visited.has(node)) continue;
    visited.add(node);

    if (node === destination) break;

    const neighbors = adj[node] || [];
    for (const edge of neighbors) {
      if (!edge.active) continue;

      const modeFamily = getModeFamily(edge.mode);
      const prevModeFamily = lastMode[node] ? getModeFamily(lastMode[node]) : modeFamily;
      const transferCost = getTransferPenalty(prevModeFamily, modeFamily);

      const edgeDuration = isPeak
        ? edge.duration * edge.peakFactor
        : edge.duration;

      const newCost = dist[node] + edgeDuration + transferCost;

      if (newCost < dist[edge.to]) {
        dist[edge.to] = newCost;
        prev[edge.to] = { node, edge };
        lastMode[edge.to] = edge.mode;
        pq.push({ node: edge.to, cost: newCost });
      }
    }
  }

  if (dist[destination] === Infinity) return null;

  const path: string[] = [];
  const segments: RouteSegment[] = [];
  let current = destination;

  while (prev[current]) {
    const { node, edge } = prev[current]!;
    path.unshift(current);
    segments.unshift({
      from: node,
      to: current,
      mode: edge.mode,
      duration: isPeak ? edge.duration * edge.peakFactor : edge.duration,
      cost: edge.cost,
      co2: edge.co2,
      waypoints: edge.waypoints,
      lineId: edge.lineId
    });
    current = node;
  }
  path.unshift(origin);

  const totalDuration = segments.reduce((s, seg) => s + seg.duration, 0);
  const totalCost = segments.reduce((s, seg) => s + seg.cost, 0);
  const totalCo2 = segments.reduce((s, seg) => s + seg.co2, 0);
  const transfers = segments.reduce((s, seg, i) => {
    if (i === 0) return s;
    return getModeFamily(segments[i - 1].mode) !== getModeFamily(seg.mode) ? s + 1 : s;
  }, 0);

  const distanceKm = totalDuration * 0.5;
  const cabEquivalentCost = Math.round(distanceKm * 12 + 50);
  const cabCo2 = distanceKm * 180;
  const co2Saved = Math.round(cabCo2 - totalCo2);

  return {
    segments,
    totalDuration: Math.round(totalDuration),
    totalCost,
    totalCo2,
    transfers,
    cabEquivalentCost,
    co2Saved,
    path
  };
}

export function findMultipleRoutes(
  origin: string,
  destination: string,
  edges: TransitEdge[],
  isPeak = false,
  count = 3
): RouteResult[] {
  const results: RouteResult[] = [];
  const primary = dijkstra(origin, destination, edges, isPeak);
  if (!primary) return [];
  results.push(primary);

  if (count > 1) {
    const altEdges = edges.map(e => {
      const segmentUsed = primary.segments.some(
        s => s.from === e.from && s.to === e.to && s.mode === e.mode
      );
      if (segmentUsed && e.mode !== "walk") {
        return { ...e, duration: e.duration * 1.8 };
      }
      return e;
    });
    const alt = dijkstra(origin, destination, altEdges, isPeak);
    if (alt && alt.totalDuration !== primary.totalDuration) {
      results.push(alt);
    }
  }

  return results;
}
