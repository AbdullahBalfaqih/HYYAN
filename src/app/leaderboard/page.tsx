
"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, ArrowRight, Coins, Calendar, Users, User, Star, Medal, Leaf, MapPin, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_LEADERBOARD } from "@/lib/mock-data";

const iconMap = {
  trophy: <Trophy className="h-8 w-8 text-[#A65E44]" />,
  star: <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />,
  leaf: <Leaf className="h-8 w-8 text-[#76A36C]" />
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"individuals" | "neighborhoods" | "cities" | "history">("individuals");

  const currentData = activeTab === "individuals" 
    ? MOCK_LEADERBOARD.individuals 
    : activeTab === "neighborhoods" 
      ? MOCK_LEADERBOARD.neighborhoods 
      : activeTab === "cities" 
        ? MOCK_LEADERBOARD.cities 
        : null;

  return (
    <div className="min-h-screen bg-[#FDE2B8] flex flex-col">
      {/* Category Tabs - Large Icons */}
      <div className="px-6 py-6">
        <Tabs defaultValue="individuals" className="w-full" onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-4 bg-white/30 backdrop-blur-md rounded-2xl h-16 p-1.5 gap-2">
            <TabsTrigger value="individuals" className="rounded-xl h-full data-[state=active]:bg-white data-[state=active]:shadow-lg flex items-center justify-center">
              <User className="h-7 w-7 text-slate-700" />
            </TabsTrigger>
            <TabsTrigger value="neighborhoods" className="rounded-xl h-full data-[state=active]:bg-white data-[state=active]:shadow-lg flex items-center justify-center">
              <Users className="h-7 w-7 text-slate-700" />
            </TabsTrigger>
            <TabsTrigger value="cities" className="rounded-xl h-full data-[state=active]:bg-white data-[state=active]:shadow-lg flex items-center justify-center">
              <MapPin className="h-7 w-7 text-slate-700" />
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl h-full data-[state=active]:bg-white data-[state=active]:shadow-lg flex items-center justify-center">
              <Calendar className="h-7 w-7 text-slate-700" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <AnimatePresence mode="wait">
        {activeTab !== "history" && currentData ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col flex-1"
          >
            {/* Podium Section - Matching provided image layout: Left:2, Center:1, Right:3 */}
            <div className="flex justify-center items-end gap-2 px-6 pt-12 pb-8 relative">
              
              {/* Rank 2 (Right in Podium UI) */}
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}
                className="flex flex-col items-center"
              >
                <span className="text-[11px] font-black text-slate-700 mb-2">{currentData.topThree[0].name}</span>
                <Avatar className="w-16 h-16 border-4 border-white mb-2 shadow-lg bg-[#E2E8F0]">
                  <AvatarFallback>{activeTab === 'cities' ? <Building className="h-8 w-8 text-muted-foreground" /> : <User className="h-8 w-8 text-muted-foreground" />}</AvatarFallback>
                </Avatar>
                <div className={cn("w-20 h-28 rounded-t-[2rem] flex flex-col items-center justify-start pt-4 shadow-xl", currentData.topThree[0].color)}>
                  <span className="text-2xl font-black text-white">2</span>
                </div>
              </motion.div>

              {/* Rank 1 (Center) */}
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}
                className="flex flex-col items-center -mt-16 z-10"
              >
                <span className="text-xs font-black text-slate-800 mb-2 relative z-30">{currentData.topThree[1].name}</span>
                <div className="relative mb-2">
                  {/* Fixed Crown positioned to the side to avoid covering the name */}
                  <div className="absolute -top-4 -right-4 text-3xl rotate-[15deg] z-20">👑</div>
                  <Avatar className="w-20 h-20 border-4 border-white shadow-2xl scale-110 bg-[#E2E8F0] relative z-10">
                    <AvatarFallback>{activeTab === 'cities' ? <Building className="h-10 w-10 text-muted-foreground" /> : <User className="h-10 w-10 text-muted-foreground" />}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] px-4 py-1 rounded-full font-black shadow-lg whitespace-nowrap z-20">
                    الفائز
                  </div>
                </div>
                <div className={cn("w-24 h-44 rounded-t-[2.5rem] flex flex-col items-center justify-start pt-6 shadow-2xl", currentData.topThree[1].color)}>
                  <span className="text-3xl font-black text-white">1</span>
                </div>
              </motion.div>

              {/* Rank 3 (Left in Podium UI) */}
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                className="flex flex-col items-center"
              >
                <span className="text-[11px] font-black text-slate-700 mb-2">{currentData.topThree[2].name}</span>
                <Avatar className="w-16 h-16 border-4 border-white mb-2 shadow-lg bg-[#E2E8F0]">
                  <AvatarFallback>{activeTab === 'cities' ? <Building className="h-8 w-8 text-muted-foreground" /> : <User className="h-8 w-8 text-muted-foreground" />}</AvatarFallback>
                </Avatar>
                <div className={cn("w-20 h-24 rounded-t-[2rem] flex flex-col items-center justify-start pt-4 shadow-xl", currentData.topThree[2].color)}>
                  <span className="text-2xl font-black text-white">3</span>
                </div>
              </motion.div>

            </div>

            {/* List Section */}
            <div className="flex-1 bg-white rounded-t-[3.5rem] shadow-2xl p-6 pb-32">
              <div className="space-y-4 max-w-lg mx-auto">
                <div className="flex items-center justify-between px-4 mb-2">
                  <h3 className="font-black text-slate-800 text-lg">قائمة الترتيب</h3>
                  <div className="text-xs font-bold text-muted-foreground">تحديث يومي</div>
                </div>
                {currentData.list.map((item: any, idx) => (
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.rank} 
                    className="flex items-center gap-4 p-4 rounded-[2rem] bg-[#F8F9FA] border border-transparent hover:border-primary/20 transition-all active:scale-95 cursor-pointer"
                  >
                    <div className="w-8 text-center font-black text-slate-400 text-lg">
                      {item.rank.toString().padStart(2, '0')}
                    </div>
                    
                    <Avatar className="w-12 h-12 shadow-sm border-2 border-white bg-muted">
                      <AvatarFallback>
                        {activeTab === 'cities' ? <Building className="h-6 w-6 text-muted-foreground" /> : <User className="h-6 w-6 text-muted-foreground" />}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h4 className="font-black text-slate-800 text-sm">{item.name}</h4>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-accent mt-0.5">
                        <Coins className="h-3 w-3" />
                        {item.points.toLocaleString()} نقطة
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-black text-xs">
                      {item.trendDir !== 'none' && (
                        <div className="flex items-center gap-1">
                          <span className={item.trendDir === 'up' ? "text-green-500" : "text-red-500"}>
                            {item.trend}
                          </span>
                          <div className={cn(
                            "w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent",
                            item.trendDir === 'up' ? "border-b-[8px] border-b-green-500" : "border-t-[8px] border-t-red-500"
                          )} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : activeTab === "history" ? (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 bg-white rounded-t-[3.5rem] shadow-2xl p-6 mt-10 pb-32"
          >
            <div className="space-y-6 max-w-lg mx-auto pt-4">
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-accent" />
                سجل الأبطال السابقين
              </h2>
              {MOCK_LEADERBOARD.history.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="bg-[#F8F9FA] p-6 rounded-[2.5rem] flex items-center justify-between border-2 border-transparent shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm">
                      {iconMap[item.iconId as keyof typeof iconMap]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground mb-1">{item.month}</p>
                      <h4 className="text-lg font-black text-slate-800 leading-tight">{item.winner}</h4>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-accent">مجموع النقاط</p>
                    <p className="text-sm font-black text-slate-800">{item.points}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
