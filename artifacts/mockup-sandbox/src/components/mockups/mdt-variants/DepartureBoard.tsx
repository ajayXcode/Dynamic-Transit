import React, { useState } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";

export function DepartureBoard() {
  const [origin, setOrigin] = useState("CSMT");
  const [destination, setDestination] = useState("ANDHERI");
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);

  const stations = ["CSMT", "CHURCHGATE", "ANDHERI", "BORIVALI", "KALYAN", "VIRAR", "DADAR"];

  const routes = [
    { dest: "ANDHERI", mode: "CENTRAL+METRO", time: "28 MIN", fare: "RS 15", status: "ON TIME", statusColor: "text-[#00FF00]" },
    { dest: "KALYAN", mode: "CENTRAL LINE", time: "65 MIN", fare: "RS 25", status: "DELAYED 10M", statusColor: "text-[#FF0000]" },
    { dest: "VIRAR", mode: "WESTERN LINE", time: "80 MIN", fare: "RS 35", status: "ON TIME", statusColor: "text-[#00FF00]" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#FFB000] font-mono uppercase p-4 flex flex-col gap-6 selection:bg-[#FFB000] selection:text-[#0a0a0a]">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 15s linear infinite;
          }
          .scanline {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0) 50%,
              rgba(0, 0, 0, 0.2) 50%,
              rgba(0, 0, 0, 0.2)
            );
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 50;
          }
        `}
      </style>
      <div className="scanline" />

      {/* Ticker */}
      <div className="bg-[#111] border-2 border-[#FFB000] p-2 overflow-hidden flex items-center shrink-0">
        <div className="font-bold mr-4 shrink-0 border-r-2 border-[#FFB000] pr-4">MDT SATHI_</div>
        <div className="overflow-hidden w-full relative h-6">
          <span className="animate-marquee absolute top-0 text-[#FFB000]">
            BHAI -- WESTERN LINE RUNNING SLOW TODAY -- USE METRO AT ANDHERI -- TENSION MAT LE
          </span>
        </div>
      </div>

      {/* Advisory */}
      <div className="bg-[#3a0a0a] border-2 border-[#FF0000] p-3 flex items-center gap-3 text-[#FF0000] shrink-0">
        <AlertTriangle className="animate-pulse" />
        <div>
          <div className="font-bold">SERVICE ADVISORY</div>
          <div className="text-sm">TRACK MAINTENANCE BETWEEN DADAR AND KURLA. EXPECT 15 MIN DELAYS ON CENTRAL LINE.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Selectors & Map */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Station Selectors */}
          <div className="border-2 border-[#FFB000] p-4 flex flex-col gap-4 bg-[#111]">
            <div className="text-xl border-b-2 border-[#FFB000] pb-2 mb-2">ROUTE PLANNER</div>
            
            <div className="relative">
              <div className="text-[#555] mb-1">ORIGIN</div>
              <button 
                onClick={() => setIsOriginOpen(!isOriginOpen)}
                className="w-full border-2 border-[#FFB000] bg-black p-3 flex justify-between items-center hover:bg-[#1a1a1a]"
              >
                <span className={origin ? "" : "animate-pulse"}>{origin || "SELECT ORIGIN STATION"}</span>
                <ChevronDown />
              </button>
              {isOriginOpen && (
                <div className="absolute z-10 w-full border-2 border-t-0 border-[#FFB000] bg-black max-h-48 overflow-y-auto">
                  {stations.map(s => (
                    <button 
                      key={s} 
                      className="w-full text-left p-3 hover:bg-[#FFB000] hover:text-black"
                      onClick={() => { setOrigin(s); setIsOriginOpen(false); }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="text-[#555] mb-1 mt-2">DESTINATION</div>
              <button 
                onClick={() => setIsDestOpen(!isDestOpen)}
                className="w-full border-2 border-[#FFB000] bg-black p-3 flex justify-between items-center hover:bg-[#1a1a1a]"
              >
                <span className={destination ? "" : "animate-pulse"}>{destination || "SELECT DEST STATION"}</span>
                <ChevronDown />
              </button>
              {isDestOpen && (
                <div className="absolute z-10 w-full border-2 border-t-0 border-[#FFB000] bg-black max-h-48 overflow-y-auto">
                  {stations.map(s => (
                    <button 
                      key={s} 
                      className="w-full text-left p-3 hover:bg-[#FFB000] hover:text-black"
                      onClick={() => { setDestination(s); setIsDestOpen(false); }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button className="mt-4 w-full bg-[#FFB000] text-black font-bold p-3 hover:bg-[#e09b00] transition-colors">
              EXECUTE SEARCH
            </button>
          </div>

          {/* Schematic Diagram */}
          <div className="border-2 border-[#FFB000] p-4 bg-[#111] flex-1 flex flex-col">
            <div className="text-xl border-b-2 border-[#FFB000] pb-2 mb-4">SYSTEM SCHEMATIC</div>
            <div className="flex-1 relative min-h-[200px] flex items-center justify-center bg-black border border-[#333]">
              <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                {/* Lines */}
                <line x1="40" y1="20" x2="40" y2="180" stroke="#FF0000" strokeWidth="4" /> {/* Central */}
                <line x1="80" y1="20" x2="80" y2="180" stroke="#0000FF" strokeWidth="4" /> {/* Western */}
                <line x1="40" y1="100" x2="160" y2="100" stroke="#800080" strokeWidth="4" /> {/* Metro */}
                <line x1="120" y1="100" x2="160" y2="180" stroke="#FFA500" strokeWidth="4" /> {/* Harbour */}

                {/* Stations */}
                <circle cx="40" cy="40" r="4" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
                <circle cx="40" cy="100" r="6" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
                <circle cx="40" cy="160" r="4" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
                
                <circle cx="80" cy="40" r="4" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
                <circle cx="80" cy="100" r="6" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
                <circle cx="80" cy="160" r="4" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />

                <circle cx="120" cy="100" r="4" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
                <circle cx="160" cy="100" r="4" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
                <circle cx="140" cy="140" r="4" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
                <circle cx="160" cy="180" r="4" fill="#0a0a0a" stroke="#FFB000" strokeWidth="2" />
              </svg>
              {/* Legend */}
              <div className="absolute bottom-2 right-2 text-[10px] bg-black/80 p-2 border border-[#333]">
                <div className="flex items-center gap-2"><div className="w-3 h-1 bg-[#FF0000]"></div> CENTRAL</div>
                <div className="flex items-center gap-2"><div className="w-3 h-1 bg-[#0000FF]"></div> WESTERN</div>
                <div className="flex items-center gap-2"><div className="w-3 h-1 bg-[#800080]"></div> METRO</div>
                <div className="flex items-center gap-2"><div className="w-3 h-1 bg-[#FFA500]"></div> HARBOUR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timetable */}
        <div className="border-2 border-[#FFB000] bg-[#111] lg:col-span-2 flex flex-col">
          <div className="text-2xl border-b-2 border-[#FFB000] p-4 bg-[#FFB000] text-black font-bold tracking-widest">
            DEPARTURES: {origin}
          </div>
          
          <div className="flex-1 p-4 overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 text-[#555] border-b-2 border-[#333] pb-2 mb-4 font-bold tracking-widest text-sm">
                <div className="col-span-3">DESTINATION</div>
                <div className="col-span-3">MODE</div>
                <div className="col-span-2">TIME</div>
                <div className="col-span-1">FARE</div>
                <div className="col-span-2">STATUS</div>
                <div className="col-span-1">CROWD</div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col gap-4">
                {routes.map((route, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-4 items-center border-b border-[#222] pb-4 text-lg">
                    <div className="col-span-3 font-bold tracking-wider">{route.dest}</div>
                    <div className="col-span-3 text-[#AAA]">{route.mode}</div>
                    <div className="col-span-2">{route.time}</div>
                    <div className="col-span-1">{route.fare}</div>
                    <div className={`col-span-2 ${route.statusColor} font-bold animate-pulse`}>
                      {route.status}
                    </div>
                    <div className="col-span-1 text-xs whitespace-pre">
                      {idx === 0 ? <span className="text-[#00FF00]">[|||  ]</span> : 
                       idx === 1 ? <span className="text-[#FF0000]">[|||||]</span> : 
                       <span className="text-[#FFB000]">[||   ]</span>}
                    </div>
                  </div>
                ))}
                
                {/* Empty slots to fill the board */}
                {[...Array(5)].map((_, i) => (
                  <div key={`empty-${i}`} className="grid grid-cols-12 gap-4 items-center border-b border-[#222] pb-4 text-lg text-[#333]">
                    <div className="col-span-3">---</div>
                    <div className="col-span-3">---</div>
                    <div className="col-span-2">-- MIN</div>
                    <div className="col-span-1">RS --</div>
                    <div className="col-span-2">---</div>
                    <div className="col-span-1">[     ]</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t-2 border-[#FFB000] flex justify-between text-sm text-[#555]">
            <div>SYSTEM TIME: {new Date().toLocaleTimeString('en-US', { hour12: false })}</div>
            <div>STATUS: ONLINE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
