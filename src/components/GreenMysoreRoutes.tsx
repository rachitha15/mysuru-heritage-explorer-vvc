import React from "react";
import { Leaf, Clock, MapPin, Sparkles, Navigation, ShieldCheck } from "lucide-react";
import { GREEN_MYSORE_ROUTES, GreenRoute } from "../data/augmentedMetadata";
import { HeritageSite } from "../types";

interface GreenMysoreRoutesProps {
  heritageSites: HeritageSite[];
  activeSite: HeritageSite;
  onSelectSiteById: (id: string) => void;
}

export default function GreenMysoreRoutes({
  heritageSites,
  activeSite,
  onSelectSiteById
}: GreenMysoreRoutesProps) {
  const [selectedRouteId, setSelectedRouteId] = React.useState<string>(GREEN_MYSORE_ROUTES[0].id);

  const selectedRoute = GREEN_MYSORE_ROUTES.find(r => r.id === selectedRouteId) || GREEN_MYSORE_ROUTES[0];

  return (
    <div className="space-y-4">
      {/* Intro Bannner */}
      <div className="bg-emerald-50/80 border border-emerald-200/50 rounded-2xl p-4 flex gap-3">
        <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-700 h-fit">
          <Leaf className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-black text-emerald-900 uppercase font-mono tracking-wider">
            Green Mysore Initiatives
          </h4>
          <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
            Protect our city's heritage! Traveling via eco-conscious modes like 
            shared cycles, electric auto shuttle buggies, or clean walking corridors reduces smog and protects century-old stone monuments from acidic soot.
          </p>
        </div>
      </div>

      {/* Select buttons for routes */}
      <div className="grid grid-cols-3 gap-2">
        {GREEN_MYSORE_ROUTES.map((route) => {
          const isActive = route.id === selectedRouteId;
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-700 border-emerald-800 text-white shadow-xs"
                  : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
              }`}
            >
              <span className={`text-[9px] font-mono font-bold uppercase ${isActive ? "text-emerald-200" : "text-emerald-600"}`}>
                {route.transportMode}
              </span>
              <span className="text-[10px] font-black line-clamp-1 mt-1 leading-tight">
                {route.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Route Detail Card */}
      <div className="bg-[#FAF9F5] border border-stone-220 rounded-2xl p-4 space-y-4">
        {/* Title and stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200/60">
          <div>
            <h5 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {selectedRoute.name}
            </h5>
            <p className="text-[10px] text-stone-500 mt-0.5 mt-1">
              {selectedRoute.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <div className="bg-white border border-stone-200 px-2 py-1 rounded-lg text-center">
              <span className="text-[9px] font-mono text-stone-400 block uppercase">Duration</span>
              <span className="text-[10px] font-black text-stone-700 flex items-center gap-1 justify-center">
                <Clock className="w-3 h-3 text-stone-450" />
                {selectedRoute.duration}
              </span>
            </div>
            <div className="bg-emerald-100 border border-emerald-200/50 px-2 py-1 rounded-lg text-center">
              <span className="text-[9px] font-mono text-emerald-700 block uppercase">CO₂ Footprint Saved</span>
              <span className="text-[10px] font-black text-emerald-800 flex items-center gap-1 justify-center">
                <Leaf className="w-3 h-3 text-emerald-600" />
                {selectedRoute.co2Saved}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Stops Timeline */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">
            Stops Circuit (Click to focus map / unlock awards):
          </p>

          <div className="relative pl-6 space-y-4">
            {/* Connection line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-dashed border-l border-emerald-400/50" />

            {selectedRoute.stops.map((stopName, idx) => {
              // Find coordinates/data
              const matchingSite = heritageSites.find(
                s => s.name.toLowerCase().includes(stopName.toLowerCase()) || 
                     stopName.toLowerCase().includes(s.name.toLowerCase()) ||
                     s.id.includes(stopName.toLowerCase().replace(/ /g, "_"))
              );

              const isUserCurrentlyHere = matchingSite?.id === activeSite.id;

              return (
                <div 
                  key={stopName} 
                  className={`relative flex items-start gap-3 p-1.5 rounded-lg transition-all ${
                    isUserCurrentlyHere 
                      ? "bg-amber-50/80 border border-amber-200/50" 
                      : "hover:bg-stone-100/60"
                  }`}
                >
                  {/* Timeline bullet */}
                  <div className={`absolute left-[-21px] top-1.5 w-[11px] h-[11px] rounded-full border-2 flex items-center justify-center transition-all ${
                    isUserCurrentlyHere
                      ? "bg-amber-500 border-amber-600"
                      : "bg-white border-emerald-500"
                  }`} />

                  {/* Stop Information */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] text-stone-400 font-mono block">Stop {idx + 1}</span>
                    <h6 className="text-xs font-bold text-stone-800 truncate">{stopName}</h6>
                    {matchingSite && (
                      <p className="text-[10px] text-stone-500 line-clamp-1 italic mt-0.5">
                        📍 {matchingSite.recommendedMerchant.offer}
                      </p>
                    )}
                  </div>

                  {/* Focus Action Trigger */}
                  {matchingSite ? (
                    <button
                      onClick={() => onSelectSiteById(matchingSite.id)}
                      className={`px-2 py-1 rounded-md text-[9px] font-bold font-mono uppercase tracking-wide flex items-center gap-1 cursor-pointer transition-all ${
                        isUserCurrentlyHere
                          ? "bg-amber-600 text-white"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/30"
                      }`}
                    >
                      <Navigation className="w-2.5 h-2.5" />
                      {isUserCurrentlyHere ? "Current" : "Focus"}
                    </button>
                  ) : (
                    <span className="text-[9px] text-stone-400 font-mono italic">Offline Stop</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Carbon score message */}
        <div className="bg-emerald-900 text-emerald-100 p-3 rounded-xl flex items-center gap-2 justify-between">
          <div className="text-[10px] leading-tight">
            <span className="font-bold block">🌿 Green Travel Score Boost:</span>
            <span>By choosing this route, you reduce traffic wear and prevent {selectedRoute.co2Saved} of toxic dust carbon particles.</span>
          </div>
          <div className="bg-emerald-800 text-emerald-200 text-xs px-2 py-1.5 rounded-lg shrink-0 font-mono font-black border border-emerald-600">
            +{selectedRoute.stops.length * 20} EXP
          </div>
        </div>
      </div>
    </div>
  );
}
