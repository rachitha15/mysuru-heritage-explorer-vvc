import React from "react";
import { Award, CheckCircle2, Lock, Sparkles, AlertCircle, Compass, Leaf, Shield } from "lucide-react";
import { EXPLO_BADGES, AdventureBadge } from "../data/augmentedMetadata";

interface MysoreExplorerBadgeProps {
  explorerPoints: number;
  completedQuests: {
    viewedWeather: boolean;
    viewedFacilities: boolean;
    spinTried: boolean;
    askedChat: boolean;
    simPresetUsed: boolean;
    sitesSelected: string[]; // unique site ids clicked
  };
  onTryQuest: (questKey: "weather" | "facilities" | "spin" | "chat" | "simulator") => void;
}

export default function MysoreExplorerBadge({
  explorerPoints,
  completedQuests,
  onTryQuest
}: MysoreExplorerBadgeProps) {
  
  // Calculate dynamic score, maximum potential is 120 points
  const currentLevel = explorerPoints >= 100 
    ? "Gold Guardian" 
    : explorerPoints >= 60 
      ? "Silver Explorer" 
      : explorerPoints >= 30 
        ? "Bronze Seeker" 
        : "Novice Traveler";

  // Pre-calculated target scores
  const getBadgeStatus = (badge: AdventureBadge) => {
    return explorerPoints >= badge.pointsRequired;
  };

  const getNextBadgeThreshold = () => {
    if (explorerPoints < 30) return { name: "Bronze Seeker", rem: 30 - explorerPoints, nextPoints: 30 };
    if (explorerPoints < 60) return { name: "Silver Explorer", rem: 60 - explorerPoints, nextPoints: 60 };
    if (explorerPoints < 100) return { name: "Gold Guardian", rem: 100 - explorerPoints, nextPoints: 100 };
    return null;
  };

  const nextInfo = getNextBadgeThreshold();
  const progressPercent = nextInfo 
    ? Math.min(100, (explorerPoints / nextInfo.nextPoints) * 100)
    : 100;

  // Render badge helper icon
  const renderBadgeIcon = (iconType: string, isUnlocked: boolean) => {
    const iconClass = `w-8 h-8 ${isUnlocked ? "text-amber-600 animate-bounce" : "text-stone-300"}`;
    switch (iconType) {
      case "compass": return <Compass className={iconClass} />;
      case "leaf": return <Leaf className={iconClass} />;
      case "award": return <Award className={iconClass} />;
      default: return <Shield className={iconClass} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Profile Rank Card */}
      <div className="bg-stone-900 text-white rounded-2xl p-4 shadow-sm border border-stone-850 relative overflow-hidden">
        {/* Abstract design vector */}
        <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#B8931F]/20 border border-[#D4AF37]/45 rounded-xl text-amber-400">
            <Award className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-extrabold block">
              Passport Rank Level
            </span>
            <h4 className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-1.5">
              {currentLevel}
              <span className="text-[10.5px] font-mono text-stone-300">({explorerPoints} EXP)</span>
            </h4>
          </div>
        </div>

        {/* Progress bar to next */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>Progress Indicator</span>
            {nextInfo ? (
              <span>Need {nextInfo.rem} EXP for {nextInfo.name}</span>
            ) : (
              <span className="text-amber-400 font-black">★ MAX RANK ACHIEVED ★</span>
            )}
          </div>
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Display Shelf */}
      <div className="grid grid-cols-3 gap-2.5">
        {EXPLO_BADGES.map((badge) => {
          const isUnlocked = getBadgeStatus(badge);
          return (
            <div 
              key={badge.id}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between transition-all relative ${
                isUnlocked 
                  ? "bg-amber-50/75 border-amber-300 text-amber-950" 
                  : "bg-stone-50 border-stone-200 text-stone-400 opacity-60"
              }`}
            >
              {/* Lock Indicator badge */}
              <div className="absolute top-1.5 right-1.5">
                {isUnlocked ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Lock className="w-3 h-3 text-stone-400" />
                )}
              </div>

              <div className="my-1.5">
                {renderBadgeIcon(badge.iconType, isUnlocked)}
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-black leading-tight block truncate max-w-full">
                  {badge.name}
                </span>
                <span className="text-[8px] font-mono uppercase tracking-tight block text-stone-500">
                  {badge.badgeLevel} ({badge.pointsRequired}p)
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checklist Quests segment */}
      <div className="bg-white border border-stone-220 rounded-2xl p-4 shadow-3xs space-y-3">
        <h5 className="text-xs font-black text-stone-900 uppercase font-mono tracking-wider flex items-center justify-between">
          <span>Exploration Milestones</span>
          <span className="text-[10px] font-mono font-medium text-stone-500 normal-case">
            Unlock bonus vouchers
          </span>
        </h5>

        <div className="divide-y divide-stone-100">
          
          {/* Milestone 1: Weather Forecast */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-amber-600 font-bold block uppercase">
                Met Forecasts
              </span>
              <h6 className="text-xs font-bold text-stone-800">Check Weather conditions & Best hours</h6>
              <p className="text-[10px] text-stone-500 leading-tight">Click 'Weather forecast' next to the monument select picker.</p>
            </div>
            <button
              onClick={() => onTryQuest("weather")} 
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
                completedQuests.viewedWeather
                  ? "bg-emerald-50 text-emerald-700 font-mono"
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
            >
              {completedQuests.viewedWeather ? "✓ Active Done (+15)" : "Read Forecast"}
            </button>
          </div>

          {/* Milestone 2: Public Facilities */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-emerald-600 font-bold block uppercase">
                Facilities Check
              </span>
              <h6 className="text-xs font-bold text-stone-800">Inspect Public Facilities check-marks</h6>
              <p className="text-[10px] text-stone-500 leading-tight">View restrooms, parking, and EV hubs details below.</p>
            </div>
            <button
              onClick={() => onTryQuest("facilities")} 
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
                completedQuests.viewedFacilities
                  ? "bg-emerald-50 text-emerald-700 font-mono"
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
            >
              {completedQuests.viewedFacilities ? "✓ Active Done (+15)" : "Check Facilities"}
            </button>
          </div>

          {/* Milestone 3: AI Tour Ask */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-amber-600 font-bold block uppercase">
                AI Engagement
              </span>
              <h6 className="text-xs font-bold text-stone-800">Converse with the Royal AI Chatbot</h6>
              <p className="text-[10px] text-stone-500 leading-tight">Type any custom question inside the main travel chat tab.</p>
            </div>
            <button
              onClick={() => onTryQuest("chat")} 
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
                completedQuests.askedChat
                  ? "bg-emerald-50 text-emerald-700 font-mono"
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
            >
              {completedQuests.askedChat ? "✓ Active Done (+20)" : "Send Chat"}
            </button>
          </div>

          {/* Milestone 4: Spin Daily Ticket */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-emerald-600 font-bold block uppercase">
                Fortunes
              </span>
              <h6 className="text-xs font-bold text-stone-800">Spin the Mysore Royal Wheel</h6>
              <p className="text-[10px] text-stone-500 leading-tight">Try your travel fortune on our Spin-Win discount wheel.</p>
            </div>
            <button
              onClick={() => onTryQuest("spin")} 
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
                completedQuests.spinTried
                  ? "bg-emerald-50 text-emerald-700 font-mono"
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
            >
              {completedQuests.spinTried ? "✓ Active Done (+20)" : "Spin Wheel"}
            </button>
          </div>

          {/* Milestone 5: GPS Simulator */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-amber-600 font-bold block uppercase">
                Tech Navigation
              </span>
              <h6 className="text-xs font-bold text-stone-800">Trigger GPS Walk Simulation</h6>
              <p className="text-[10px] text-stone-500 leading-tight">Toggle the simulator preset close/far to trigger walk pathings.</p>
            </div>
            <button
              onClick={() => onTryQuest("simulator")} 
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
                completedQuests.simPresetUsed
                  ? "bg-emerald-50 text-emerald-700 font-mono"
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
            >
              {completedQuests.simPresetUsed ? "✓ Active Done (+20)" : "Open Sim"}
            </button>
          </div>

          {/* Milestone 6: Multi-site check */}
          <div className="py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-[#B8931F] font-bold block uppercase">
                Diverse Vistas
              </span>
              <h6 className="text-xs font-bold text-stone-800">Explore at least 3 separate cities segments</h6>
              <p className="text-[10px] text-stone-500 leading-tight">
                Visited: <span className="font-mono text-stone-700 font-bold">{completedQuests.sitesSelected.length}/3 unique sites</span>
              </p>
            </div>
            <div className={`px-2 py-1.5 rounded-lg text-[10px] font-bold font-mono ${
              completedQuests.sitesSelected.length >= 3 
                ? "bg-emerald-50 text-emerald-700" 
                : "bg-stone-100 text-stone-500"
            }`}>
              {completedQuests.sitesSelected.length >= 3 ? "Complete! (+30)" : "Pending Search"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
