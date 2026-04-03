
import { useEffect, useRef } from "react";
import { RouteResult } from "../logic/router";
import { NODES, TransitEdge } from "../data/mumbaiGraph";
import { MODE_COLORS } from "../logic/sathi";

interface Props {
  route: RouteResult | null;
  edges: TransitEdge[];
  isMarathi: boolean;
}

declare global {
  interface Window {
    L: any;
  }
}

export function MapView({ route, edges, isMarathi }: Props) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const routeLayerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => initMap();
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    function initMap() {
      if (!containerRef.current || mapRef.current) return;
      const L = window.L;
      const map = L.map(containerRef.current, {
        center: [19.0760, 72.8777],
        zoom: 11,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 18,
      }).addTo(map);

      mapRef.current = map;

      // Add all stations as small dots
      Object.values(NODES).forEach(node => {
        const color = node.crowdFactor > 0.85 ? "#EF4444" : node.crowdFactor > 0.7 ? "#F59E0B" : "#22C55E";
        const dot = L.circleMarker(node.coords, {
          radius: 4,
          fillColor: color,
          color: "#1e293b",
          weight: 1,
          fillOpacity: 0.8,
        });
        dot.bindTooltip(isMarathi ? node.marathi : node.name, { className: "leaflet-dark-tooltip" });
        dot.addTo(map);
        markersRef.current.push(dot);
      });
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (!mapRef.current || !window.L) return;
    const L = window.L;
    const map = mapRef.current;

    if (routeLayerRef.current) {
      routeLayerRef.current.clearLayers();
    } else {
      routeLayerRef.current = L.layerGroup().addTo(map);
    }

    if (!route) return;

    const bounds: [number, number][] = [];

    route.segments.forEach(seg => {
      if (seg.waypoints.length < 2 && seg.mode !== "walk") {
        const fromNode = NODES[seg.from];
        const toNode = NODES[seg.to];
        if (fromNode && toNode) {
          const points: [number, number][] = [fromNode.coords, toNode.coords];
          L.polyline(points, {
            color: MODE_COLORS[seg.mode] ?? "#fff",
            weight: 5,
            opacity: 0.9,
          }).addTo(routeLayerRef.current);
          bounds.push(...points);
        }
      } else if (seg.waypoints.length >= 2) {
        L.polyline(seg.waypoints, {
          color: MODE_COLORS[seg.mode] ?? "#fff",
          weight: 5,
          opacity: 0.9,
        }).addTo(routeLayerRef.current);
        bounds.push(...seg.waypoints);
      }
    });

    if (route.path.length > 0) {
      const originNode = NODES[route.path[0]];
      const destNode = NODES[route.path[route.path.length - 1]];

      if (originNode) {
        L.circleMarker(originNode.coords, {
          radius: 10,
          fillColor: "#22C55E",
          color: "#fff",
          weight: 2,
          fillOpacity: 1,
        }).bindTooltip(isMarathi ? `🚉 ${originNode.marathi}` : `🚉 ${originNode.name}`, { permanent: false }).addTo(routeLayerRef.current);
        bounds.push(originNode.coords);
      }

      if (destNode) {
        L.circleMarker(destNode.coords, {
          radius: 10,
          fillColor: "#EF4444",
          color: "#fff",
          weight: 2,
          fillOpacity: 1,
        }).bindTooltip(isMarathi ? `🏁 ${destNode.marathi}` : `🏁 ${destNode.name}`, { permanent: false }).addTo(routeLayerRef.current);
        bounds.push(destNode.coords);
      }
    }

    if (bounds.length > 0) {
      try {
        map.fitBounds(bounds, { padding: [40, 40], animate: true });
      } catch {}
    }
  }, [route, isMarathi]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-700" style={{ height: "400px" }}>
      <div ref={containerRef} className="w-full h-full" />
      {!route && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 text-slate-400 text-sm">
            {isMarathi ? "मार्ग निवडा आणि नकाशावर पहा" : "Select origin & destination to see route"}
          </div>
        </div>
      )}
    </div>
  );
}
