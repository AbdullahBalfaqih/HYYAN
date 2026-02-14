"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CloudRain, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type PlantState = {
  stage: number; // 1 to 5
  health: number; // 3: Healthy, 2: Wilting, 1: Dying, 0: Dead
  lastDate: string;
};

export function PlantCharacter() {
  const [plant, setPlant] = useState<PlantState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("hayan_plant_v1");
    const now = new Date();
    const todayStr = now.toDateString();

    if (saved) {
      const state: PlantState = JSON.parse(saved);
      const lastDate = new Date(state.lastDate);
      
      // Calculate day difference
      const diffTime = now.getTime() - lastDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Same day login
        setPlant(state);
      } else if (diffDays === 1) {
        // Consecutive day! Grow and heal
        const newStage = Math.min(state.stage + 1, 5);
        const newState = { stage: newStage, health: 3, lastDate: todayStr };
        setPlant(newState);
        localStorage.setItem("hayan_plant_v1", JSON.stringify(newState));
      } else if (diffDays > 1) {
        // Missed days! Wilt
        const healthLoss = diffDays;
        const newHealth = Math.max(state.health - healthLoss, 0);
        const newState = { ...state, health: newHealth, lastDate: todayStr };
        setPlant(newState);
        localStorage.setItem("hayan_plant_v1", JSON.stringify(newState));
      }
    } else {
      // First time
      const newState = { stage: 1, health: 3, lastDate: todayStr };
      setPlant(newState);
      localStorage.setItem("hayan_plant_v1", JSON.stringify(newState));
    }
  }, []);

  if (!mounted || !plant) return null;

  const getPlantVisual = () => {
    if (plant.health === 0) return "💀";
    switch (plant.stage) {
      case 1: return "🌱";
      case 2: return "🌿";
      case 3: return "🪴";
      case 4: return "🌳";
      case 5: return "🍎🌳";
      default: return "🌱";
    }
  };

  const getStatusMessage = () => {
    if (plant.health === 0) return "للأسف، ماتت نبتتك. ابدأ من جديد غداً!";
    if (plant.health === 1) return "نبتتك تحتضر! اسقها بحضورك الآن.";
    if (plant.health === 2) return "بدأت الأوراق تذبل.. لا تغب عنا.";
    if (plant.stage === 5) return "يا لروعتك! شجرتك مثمرة وتفتخر بك.";
    return "نبتتك تنمو بجمال، استمر في الحضور!";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] p-6 mb-8 border-none shadow-2xl transition-colors duration-1000",
        plant.health === 3 ? "bg-primary/10 border-primary/20" : 
        plant.health === 0 ? "bg-zinc-900" : "bg-orange-500/10 border-orange-500/20"
      )}
    >
      <div className="flex items-center gap-6" dir="rtl">
        <div className="relative">
          <div 
            className={cn(
              "text-7xl flex items-center justify-center w-24 h-24 rounded-full bg-white/50 backdrop-blur-md shadow-inner transition-all",
              plant.health === 2 && "sepia-[0.5]",
              plant.health === 1 && "sepia-[0.8] grayscale-[0.5]",
              plant.health === 0 && "grayscale"
            )}
          >
            {getPlantVisual()}
          </div>
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-xl text-foreground">رفيقك الأخضر</h3>
          </div>
          <p className={cn(
            "text-sm font-bold leading-tight",
            plant.health < 3 ? "text-orange-600" : "text-muted-foreground"
          )}>
            {getStatusMessage()}
          </p>
          
          <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden mt-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(plant.stage / 5) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Decorative Icons */}
      <div className="absolute top-2 left-2 opacity-10">
        {plant.health === 3 ? <Sun className="h-12 w-12" /> : <CloudRain className="h-12 w-12" />}
      </div>
    </motion.div>
  );
}