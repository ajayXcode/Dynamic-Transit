import React, { useState } from "react";
import { Search, Navigation, AlertTriangle, Zap, Train, Info, Radio, Settings2, BarChart3, Clock, IndianRupee, Map as MapIcon, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export function Cockpit() {
  const [routeActive, setRouteActive] = useState(true);
  const [activeDisruptions, setActiveDisruptions] = useState<Record<string, boolean>>({
    "Central Line Mega Block": true,
    "Western Line Flooding": false,
    "Harbour Line Delays": false,
    "Metro Line 3 Testing": false,
    "BEST Bus Strike": false,
  });

  const toggleDisruption = (name: string) => {
    setActiveDisruptions((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden select-none flex flex-col">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Map Elements - Mumbai Coastline approx */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M 300 0 Q 320 200, 280 400 T 250 800 L 0 800 L 0 0 Z" fill="#0f172a" />
          <path d="M 300 0 Q 320 200, 280 400 T 250 800" fill="none" stroke="#334155" strokeWidth="2" />
        </svg>

        {/* Route visualization */}
        <AnimatePresence>
          {routeActive && (
            <motion.svg 
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full z-10" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central Line - Red */}
              <motion.path 
                d="M 400 600 Q 420 400, 450 200" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="4" 
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              {/* Western Line - Blue (Alternative) */}
              <path d="M 350 650 Q 330 400, 310 150" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />
              
              {/* Nodes */}
              <circle cx="400" cy="600" r="6" fill="#f97316" className="animate-pulse" />
              <text x="415" y="605" fill="#f97316" className="text-xs font-mono font-bold tracking-wider uppercase">CSMT</text>
              
              <circle cx="450" cy="200" r="6" fill="#f97316" className="animate-pulse" />
              <text x="465" y="205" fill="#f97316" className="text-xs font-mono font-bold tracking-wider uppercase">ANDHERI</text>

              {/* Transfer point */}
              <circle cx="423" cy="360" r="4" fill="#ffffff" />
              <text x="435" y="365" fill="#ffffff" className="text-[10px] font-mono opacity-70 uppercase">DADAR (T)</text>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Dynamic Radars */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 border border-slate-800 rounded-full opacity-20 animate-[spin_10s_linear_infinite]" />
        <div className="absolute top-1/4 left-1/3 w-64 h-64 border border-orange-500/20 rounded-full opacity-40 animate-[spin_7s_linear_infinite_reverse]" />
      </div>

      {/* TOP LEFT: Command Input */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="absolute top-6 left-6 w-[320px] z-20"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5">
          <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/40">
            <div className="flex items-center gap-2 text-orange-500">
              <Navigation className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Routing Engine</span>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono bg-orange-500/10 text-orange-400 border-orange-500/20">SYS: ONLINE</Badge>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="space-y-3 relative">
              <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-slate-700/50 z-0"></div>
              
              <div className="relative z-10">
                <Label className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 block font-mono">Origin</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-orange-500 bg-slate-900"></div>
                  <Input 
                    defaultValue="CSMT"
                    className="pl-8 bg-slate-950/50 border-slate-700/50 text-white font-mono uppercase h-9 text-sm focus-visible:ring-orange-500/50"
                  />
                </div>
              </div>
              
              <div className="relative z-10">
                <Label className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 block font-mono">Destination</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"></div>
                  <Input 
                    defaultValue="ANDHERI"
                    className="pl-8 bg-slate-950/50 border-slate-700/50 text-white font-mono uppercase h-9 text-sm focus-visible:ring-orange-500/50"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button 
                onClick={() => setRouteActive(!routeActive)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-9 rounded-md font-mono text-xs uppercase tracking-wider transition-colors"
              >
                {routeActive ? 'Recalculate' : 'Execute Route'}
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 border-slate-700/50 bg-slate-900/50 hover:bg-slate-800 hover:text-orange-400">
                <Settings2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TOP RIGHT: Crisis Matrix */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 right-6 w-[280px] z-20"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5">
          <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between bg-red-950/20">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Crisis Matrix</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-mono text-red-400">ACTIVE</span>
            </div>
          </div>
          
          <ScrollArea className="h-[220px]">
            <div className="p-3 space-y-1">
              {Object.entries(activeDisruptions).map(([name, isActive]) => (
                <div 
                  key={name}
                  className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors ${
                    isActive 
                      ? 'bg-red-950/30 border-red-900/50 text-red-200' 
                      : 'bg-slate-900/40 border-slate-800/50 text-slate-400 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-mono uppercase tracking-wide leading-tight">{name}</span>
                    {isActive && <span className="text-[9px] font-mono text-red-400/80">IMPACT: SEVERE</span>}
                  </div>
                  <Switch 
                    checked={isActive}
                    onCheckedChange={() => toggleDisruption(name)}
                    className={isActive ? 'data-[state=checked]:bg-red-600' : ''}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </motion.div>

      {/* BOTTOM CENTER: Sathi Ticker */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-2xl z-20"
      >
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full py-2 px-4 shadow-xl shadow-black/50 flex items-center gap-4 mx-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 shrink-0">
            <Radio className="w-4 h-4 text-orange-500 animate-pulse" />
          </div>
          <div className="flex-1 overflow-hidden relative h-6 flex items-center">
            <motion.div 
              className="text-sm font-mono text-orange-100 whitespace-nowrap"
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              [MDT SATHI] Bhai, Western Line pe rush hai! Central pakad lo -- faster today. Expect +15m delay near Dadar due to Mega Block.
            </motion.div>
          </div>
          <Badge variant="outline" className="shrink-0 text-[10px] font-mono border-orange-500/20 text-orange-400 uppercase">
            Live Feed
          </Badge>
        </div>
      </motion.div>

      {/* BOTTOM: Telemetry Panel */}
      <AnimatePresence>
        {routeActive && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
            className="absolute bottom-6 left-6 right-6 z-20 flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-4xl bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/5 pointer-events-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
              
              {/* Primary Route Info */}
              <div className="p-5 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Selected Vector</span>
                  </div>
                  <Badge className="bg-orange-500 text-black hover:bg-orange-400 font-mono text-[10px] rounded-sm uppercase">Optimal</Badge>
                </div>
                <div className="flex items-end gap-3 mb-1">
                  <h2 className="text-3xl font-mono text-white tracking-tight">28<span className="text-xl text-slate-400">MIN</span></h2>
                  <div className="flex items-center gap-1 text-slate-300 pb-1">
                    <IndianRupee className="w-3 h-3 text-slate-500" />
                    <span className="font-mono text-lg">15</span>
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  Central Line <ChevronRight className="w-3 h-3 inline text-slate-600" /> 2 Transfers
                </p>
              </div>

              {/* Telemetry Stats */}
              <div className="p-5 flex-1 grid grid-cols-2 gap-4 bg-slate-950/30">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3" /> ETA
                  </span>
                  <div className="font-mono text-lg text-slate-200">09:42 AM</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Zap className="w-3 h-3" /> CO2 Impact
                  </span>
                  <div className="font-mono text-lg text-emerald-400">-4.2kg</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> Crowding
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-1.5 w-full bg-red-900/50 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[85%]"></div>
                    </div>
                    <span className="text-xs font-mono text-red-400">85%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Risk Factor
                  </span>
                  <div className="font-mono text-sm text-yellow-400 uppercase">Elevated</div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
