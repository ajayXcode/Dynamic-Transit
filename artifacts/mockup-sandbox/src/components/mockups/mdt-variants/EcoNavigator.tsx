import React, { useState, useEffect } from 'react';
import { Leaf, Navigation2, MapPin, Search, TrendingUp, Award, LeafyGreen, Train, Info } from 'lucide-react';

export function EcoNavigator() {
  const [routeSelected, setRouteSelected] = useState(false);
  const [co2Saved, setCo2Saved] = useState(0);
  const targetCo2 = 420;

  useEffect(() => {
    if (routeSelected) {
      const duration = 1500;
      const steps = 60;
      const stepTime = duration / steps;
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        setCo2Saved(Math.min(Math.round((currentStep / steps) * targetCo2), targetCo2));
        if (currentStep >= steps) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    } else {
      setCo2Saved(0);
    }
  }, [routeSelected]);

  return (
    <div className="flex h-full min-h-[100dvh] w-full flex-col font-['Inter'] bg-[#0f2217] text-slate-100 selection:bg-[#84cc16]/30">
      
      {/* Header */}
      <header className="px-6 py-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#84cc16]/20 p-2 rounded-full">
            <Leaf className="w-5 h-5 text-[#84cc16]" />
          </div>
          <span className="font-semibold text-lg text-white">EcoNav Mumbai</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <Award className="w-4 h-4 text-[#f59e0b]" />
          <span className="text-sm font-medium text-[#f59e0b]">Gold Tier</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-12 space-y-6 mt-4">
        
        {/* Search Section */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="space-y-3 relative">
            <div className="absolute left-[22px] top-[24px] bottom-[24px] w-0.5 bg-white/10 z-0"></div>
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-[#0f2217] rounded-full p-1 border-2 border-white/20">
                <MapPin className="w-4 h-4 text-white/60" />
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 px-4 py-3 flex items-center gap-2 focus-within:border-[#84cc16]/50 focus-within:bg-white/10 transition-colors">
                <input 
                  type="text" 
                  defaultValue="Andheri"
                  className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/40"
                  placeholder="Where are you now?"
                />
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-[#0f2217] rounded-full p-1 border-2 border-[#84cc16]">
                <Navigation2 className="w-4 h-4 text-[#84cc16]" />
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 px-4 py-3 flex items-center gap-2 focus-within:border-[#84cc16]/50 focus-within:bg-white/10 transition-colors">
                <input 
                  type="text" 
                  defaultValue="BKC"
                  className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/40"
                  placeholder="Where to?"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => setRouteSelected(true)}
            className="w-full bg-[#84cc16] hover:bg-[#65a30d] text-[#0f2217] font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Search className="w-5 h-5" />
            Find Greenest Route
          </button>
        </section>

        {routeSelected && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Hero Metric Section */}
            <section className="text-center py-6">
              <div className="inline-flex items-center gap-2 bg-[#84cc16]/10 px-4 py-1.5 rounded-full border border-[#84cc16]/20 mb-4">
                <LeafyGreen className="w-4 h-4 text-[#84cc16]" />
                <span className="text-sm font-medium text-[#84cc16]">Optimal Eco Choice</span>
              </div>
              
              <div className="space-y-1 mb-6">
                <h1 className="text-6xl font-bold text-white tracking-tight">
                  {co2Saved}g
                </h1>
                <p className="text-xl text-white/80 font-medium">CO2 saved today</p>
                <p className="text-[#f59e0b] font-medium mt-2">vs. auto-rickshaw: Rs 240 saved</p>
              </div>

              {/* Carbon Bar */}
              <div className="bg-white/5 rounded-3xl p-5 border border-white/10 text-left space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Your Trip (Metro)</span>
                  <span className="text-white font-medium">40g CO2</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#84cc16] rounded-full transition-all duration-1000 ease-out" style={{ width: '15%' }}></div>
                </div>
                
                <div className="flex justify-between text-sm mt-4">
                  <span className="text-white/60">By Cab</span>
                  <span className="text-white font-medium">460g CO2</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-slate-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </section>

            {/* Practical Details */}
            <section className="bg-[#152e1f] rounded-3xl p-5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#84cc16]/20 p-3 rounded-2xl text-[#84cc16]">
                  <Train className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Metro Line 2</h3>
                  <p className="text-white/60 text-sm">Andheri to BKC</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white text-xl">12 min</div>
                <div className="text-white/60 text-sm">Rs 40</div>
              </div>
            </section>

            {/* Map Area */}
            <section className="rounded-3xl overflow-hidden relative border border-white/10 h-[200px]">
              <img 
                src="/__mockup/images/mdt-eco-map.png" 
                alt="Map showing green route" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2217] via-[#0f2217]/20 to-transparent"></div>
              
              {/* Route Status Card overlaid on map */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0f2217]/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-start gap-3">
                <div className="bg-[#84cc16]/20 p-1.5 rounded-full mt-0.5 shrink-0">
                  <Info className="w-4 h-4 text-[#84cc16]" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Route Status: Clear</h4>
                  <p className="text-xs text-white/60 mt-1">Light rain expected. Metro running on schedule.</p>
                </div>
              </div>
            </section>

            {/* Sathi Eco Coach */}
            <section className="bg-gradient-to-br from-emerald-900/40 to-[#152e1f] rounded-3xl p-5 border border-emerald-500/20 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="relative shrink-0 mt-1">
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Sathi&backgroundColor=0f2217" alt="Sathi" className="w-12 h-12 rounded-full border-2 border-[#84cc16] bg-[#0f2217]" />
                  <div className="absolute -bottom-1 -right-1 bg-[#84cc16] text-[#0f2217] rounded-full p-0.5">
                    <Leaf className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-[#84cc16] mb-1">Your Eco Coach, Sathi</h4>
                  <p className="text-sm text-white/90 leading-relaxed italic">
                    "Arre, great choice taking Metro! That cab would have added 460g CO2 to Mumbai's air."
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Weekly Impact (always visible) */}
        <section className="mt-8">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white/60" />
            Your Impact This Week
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
              <div className="text-2xl font-bold text-white mb-1">2.1kg</div>
              <div className="text-xs text-white/60">CO2 Saved</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
              <div className="text-2xl font-bold text-white mb-1">Rs 1,200</div>
              <div className="text-xs text-white/60">Money Saved</div>
            </div>
            <div className="col-span-2 bg-white/5 border border-white/10 rounded-3xl p-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-white mb-1">0.3 Trees</div>
                <div className="text-xs text-white/60">Equivalent planted</div>
              </div>
              <div className="bg-[#84cc16]/10 p-3 rounded-2xl">
                <LeafyGreen className="w-8 h-8 text-[#84cc16]" />
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
