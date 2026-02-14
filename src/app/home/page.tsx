
"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Wind, 
  Trash2, 
  Trees, 
  Trophy, 
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Users,
  Heart,
  X,
  Droplets
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_USER_PROFILE, MOCK_ACTIVITY_FEED } from "@/lib/mock-data";
import { PlantCharacter } from "@/components/PlantCharacter";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200"
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto p-6 space-y-10 pb-28 md:pb-10 text-right" dir="rtl">
      {/* User Stats Summary */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h2 className="text-lg font-black text-foreground leading-none">مرحباً {MOCK_USER_PROFILE.name.split(' ')[0]}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="h-3 w-3 text-accent fill-accent" />
              <span className="text-[10px] font-black text-accent">بطل مستوى {MOCK_USER_PROFILE.level}</span>
            </div>
          </div>
        </div>

        <div 
          onClick={() => router.push('/rewards')}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-primary/5 cursor-pointer active:scale-95 transition-all"
        >
          <Trophy className="h-4 w-4 text-accent" />
          <span className="text-sm font-black text-foreground">{MOCK_USER_PROFILE.points.toLocaleString()}</span>
          <span className="text-[10px] font-black text-muted-foreground mr-1">نقطة</span>
        </div>
      </motion.div>

      <Separator className="bg-primary/10 h-[1.5px]" />

      {/* Plant Character Section */}
      <PlantCharacter />

      {/* Hero Section with Automatic Slideshow */}
      <motion.section 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-[3.5rem] shadow-2xl shadow-black/5 flex flex-col items-center min-h-[550px] justify-center text-center p-8"
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image 
                src={HERO_IMAGES[currentImageIndex]}
                alt="حيّان Hero"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 w-full flex flex-col items-center justify-between h-full py-4 space-y-12">
          {/* Top Badge */}
          <div className="bg-white px-8 py-2.5 rounded-full flex items-center gap-2 shadow-xl border border-primary/10">
             <Zap className="h-5 w-5 fill-primary text-primary" />
             <span className="font-black text-primary text-sm">تحدي الأسبوع</span>
          </div>

          {/* Titles */}
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight drop-shadow-md">
              اجعل حيك
            </h2>
            <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-tight drop-shadow-md">
              أكثر خضرة!
            </h2>
          </div>

          {/* Main Button */}
          <Button asChild className="w-full max-w-sm rounded-[2.5rem] h-20 text-2xl font-black bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/40 border-none transition-transform active:scale-95">
            <Link href="/challenges">استكشف التحديات</Link>
          </Button>
        </div>
      </motion.section>

      <Separator className="bg-primary/10 h-[1.5px]" />

      {/* Community Activity Feed - Alternating Colors */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-2xl font-black font-headline text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            نشاط الجيران
          </h3>
        </div>
        <div className="space-y-4">
          {MOCK_ACTIVITY_FEED.map((activity, i) => {
            const isWhite = i % 2 === 0;
            return (
              <Card 
                key={i} 
                className={cn(
                  "rounded-[2.5rem] border-none shadow-xl shadow-black/5 overflow-hidden transition-all duration-500",
                  isWhite ? "bg-white" : "bg-black"
                )}
              >
                <div className="p-6 flex items-center gap-5">
                  <Avatar className={cn(
                    "h-14 w-14 border-2 transition-transform",
                    isWhite ? "border-primary/10" : "border-white/10"
                  )}>
                    <AvatarFallback className={cn(
                      "font-black text-lg",
                      isWhite ? "bg-secondary text-primary" : "bg-white/10 text-primary"
                    )}>
                      {activity.initial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <p className={cn(
                      "text-base font-black leading-tight",
                      isWhite ? "text-slate-800" : "text-white"
                    )}>
                      {activity.name} <span className={cn(
                        "text-xs font-bold mr-1",
                        isWhite ? "text-muted-foreground" : "text-gray-400"
                      )}>من {activity.neighborhood}</span>
                    </p>
                    <p className={cn(
                      "text-sm font-bold",
                      isWhite ? "text-primary" : "text-primary/90"
                    )}>
                      {activity.action}
                    </p>
                    <p className={cn(
                      "text-[10px] font-bold",
                      isWhite ? "text-muted-foreground" : "text-gray-500"
                    )}>
                      {activity.time}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "border-2 font-black text-[11px] px-4 py-1.5 rounded-full transition-all bg-transparent",
                      isWhite ? "border-primary text-primary" : "border-primary/60 text-primary"
                    )}>
                      {activity.points}+
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator className="bg-primary/10 h-[1.5px]" />

      {/* Categories with Premium Custom Icons */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-2xl font-black font-headline text-foreground">الفئات</h3>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
          {[
            { 
              label: 'الهواء', 
              tab: 'air',
              svg: <svg viewBox="0 0 24 24" className="h-9 w-9 fill-none stroke-current stroke-[2.5]" xmlns="http://www.w3.org/2000/svg"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M16 14v7M8 14v7M12 16v5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            },
            { 
              label: 'النفايات', 
              tab: 'waste',
              svg: <svg viewBox="0 0 24 24" className="h-9 w-9 fill-none stroke-current stroke-[2.5]" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            },
            { 
              label: 'التشجير', 
              tab: 'greening',
              svg: <svg viewBox="0 0 24 24" className="h-9 w-9 fill-none stroke-current stroke-[2.5]" xmlns="http://www.w3.org/2000/svg"><path d="M12 19V5M5 11l7-7 7 7M5 19l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            },
            { 
              label: 'الطاقة', 
              tab: 'energy',
              svg: <svg viewBox="0 0 24 24" className="h-9 w-9 fill-none stroke-current stroke-[2.5]" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            },
          ].map((cat, i) => (
            <motion.div 
              key={i} 
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(`/challenges?tab=${cat.tab}`)}
              className="flex flex-col items-center gap-3 min-w-[90px] cursor-pointer"
            >
              <div className="w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-xl bg-black text-primary border-none">
                {cat.svg}
              </div>
              <span className="text-sm font-black text-muted-foreground">{cat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
