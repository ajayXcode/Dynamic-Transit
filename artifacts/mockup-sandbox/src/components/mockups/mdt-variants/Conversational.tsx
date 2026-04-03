import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, MapPin, Clock, IndianRupee, Leaf, AlertTriangle } from "lucide-react";

export function Conversational() {
  return (
    <div className="flex h-screen w-full bg-[#0a192f] text-slate-200 font-['Inter',sans-serif]">
      {/* Left / Main Chat Area */}
      <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] max-w-3xl mx-auto h-full border-x border-slate-800/50 bg-[#0f213b] shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-slate-800 bg-[#0f213b]/90 backdrop-blur z-10 sticky top-0">
          <Avatar className="h-10 w-10 border-2 border-teal-500/30">
            <AvatarImage src="/__mockup/images/sathi-avatar.png" alt="Sathi" />
            <AvatarFallback className="bg-teal-900 text-teal-200">S</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-slate-100 text-lg">MDT Sathi</h1>
            <p className="text-xs text-teal-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        {/* Chat Thread */}
        <ScrollArea className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col gap-6 pb-6">
            
            {/* User Message */}
            <div className="flex flex-col items-end gap-1 w-full mt-4">
              <div className="bg-slate-700/60 text-slate-100 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[75%] shadow-sm">
                <p>CSMT to Andheri</p>
              </div>
              <span className="text-[10px] text-slate-500 mr-1">09:41 AM</span>
            </div>

            {/* Sathi Message 1 */}
            <div className="flex items-start gap-3 w-full">
              <Avatar className="h-8 w-8 mt-1 border border-teal-500/20 shrink-0">
                <AvatarImage src="/__mockup/images/sathi-avatar.png" alt="Sathi" />
                <AvatarFallback className="bg-teal-900">S</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 max-w-[85%] sm:max-w-[80%]">
                <div className="bg-[#1e3a5f] border border-[#2a4b7c] text-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-md">
                  <p className="mb-3">Got it! Here's your best route &mdash; 28 min via Central Line, only Rs 15.</p>
                  
                  {/* Route Card inside Bubble */}
                  <Card className="bg-[#0f213b] border-slate-700 mb-3 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-red-500 to-red-600" />
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-slate-200 text-sm">Central Line</p>
                          <p className="text-xs text-slate-400">Fast Local</p>
                        </div>
                        <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">Direct</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-300 mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-400" />
                          <span>28 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                          <span>15</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Leaf className="w-3.5 h-3.5 text-green-400" />
                          <span>0.2kg CO2</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Map Attachment */}
                  <div className="relative rounded-lg overflow-hidden border border-slate-700 cursor-pointer group">
                    <img 
                      src="/__mockup/images/mumbai-map-thumb.png" 
                      alt="Route Map" 
                      className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-0">
                        <MapPin className="w-4 h-4 mr-2" />
                        View Full Map
                      </Button>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 ml-1">09:41 AM</span>
              </div>
            </div>

            {/* Sathi Message 2 (Alert) */}
            <div className="flex items-start gap-3 w-full">
              <Avatar className="h-8 w-8 mt-1 border border-teal-500/20 shrink-0">
                <AvatarImage src="/__mockup/images/sathi-avatar.png" alt="Sathi" />
                <AvatarFallback className="bg-teal-900">S</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 max-w-[85%] sm:max-w-[80%]">
                <div className="bg-[#1e3a5f] border border-[#2a4b7c] text-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-md">
                  <p>Bhai, light crowd today on Central &mdash; good day to travel!</p>
                </div>
                
                {/* Crisis Alert Bubble */}
                <div className="bg-red-950/40 border border-red-900/50 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-md mt-1 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold text-sm">Disruption Alert</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">
                    Heavy rain reported near Dadar. Trains running 10-15 mins late.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="bg-red-900/60 hover:bg-red-800 text-red-100 border border-red-800/50 text-xs h-8">
                      Find alternate route
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-8">
                      I'll wait
                    </Button>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 ml-1">09:42 AM</span>
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-[#0f213b]/90 backdrop-blur border-t border-slate-800 z-10">
          
          {/* Quick Reply Chips */}
          <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-hide">
            <Badge variant="secondary" className="bg-[#1e3a5f] hover:bg-[#2a4b7c] text-teal-100 border-teal-900/30 cursor-pointer whitespace-nowrap py-1.5 px-3">
              Churchgate to Virar
            </Badge>
            <Badge variant="secondary" className="bg-[#1e3a5f] hover:bg-[#2a4b7c] text-teal-100 border-teal-900/30 cursor-pointer whitespace-nowrap py-1.5 px-3">
              Dadar to Thane
            </Badge>
            <Badge variant="secondary" className="bg-[#1e3a5f] hover:bg-[#2a4b7c] text-teal-100 border-teal-900/30 cursor-pointer whitespace-nowrap py-1.5 px-3">
              Bandstand to Juhu
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input 
                placeholder="Where to, boss?" 
                className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 rounded-full pl-4 pr-10 h-12 focus-visible:ring-teal-500/50"
              />
            </div>
            <Button size="icon" className="h-12 w-12 rounded-full bg-teal-600 hover:bg-teal-500 text-white shrink-0 shadow-lg shadow-teal-900/20">
              <Send className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
