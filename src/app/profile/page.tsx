"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  LogOut, 
  Trophy, 
  Star, 
  History, 
  Zap,
  TrendingUp,
  ChevronLeft,
  ArrowRight,
  User,
  Trees,
  Footprints,
  Trash2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MOCK_USER_PROFILE, MOCK_USER_ACTIVITIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const BADGES_DATA = [
  { name: "صديق البيئة", icon: Trees },
  { name: "بطل المشي", icon: Footprints },
  { name: "خبير الفرز", icon: Trash2 },
];

export default function ProfilePage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const userStats = [
    { label: "المستوى", value: MOCK_USER_PROFILE.level.toString(), icon: Zap },
    { label: "ترتيبي", value: MOCK_USER_PROFILE.rank.toString(), icon: Star },
    { label: "نقاطي", value: MOCK_USER_PROFILE.points.toLocaleString(), icon: Trophy },
  ];

  const progressPercentage = Math.round((MOCK_USER_PROFILE.points / MOCK_USER_PROFILE.nextLevelPoints) * 100);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      router.push('/auth');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background text-right pb-32" dir="rtl">
      {/* Farewell Overlay - Swapped Visuals */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center overflow-hidden"
          >
            <div className="cell">
              <div className="card">
                <span className="flower-loader">Loading…</span>
              </div>
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 space-y-4"
            >
              <p className="text-primary font-bold text-lg">جاري تسجيل الخروج...</p>
              <p className="text-white/60 font-bold text-sm">شكراً لمساهمتك في جعل حيك أكثر اخضراراً</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified Profile Header - Single Header */}
      <div className="w-full bg-black h-24 flex items-center justify-between px-6 shadow-2xl sticky top-0 z-[70]">
        <button 
          onClick={() => router.push('/settings')}
          className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <Settings className="h-7 w-7" />
        </button>
        <h1 className="text-2xl font-black text-primary font-headline tracking-tight">
          الملف الشخصي
        </h1>
        <button 
          onClick={() => router.push('/home')}
          className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ArrowRight className="h-7 w-7" />
        </button>
      </div>

      <div className="container mx-auto p-6 space-y-10 pt-8">
        {/* User Info Section */}
        <div className="flex flex-col items-center space-y-2 mb-4">
          <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl">
             <User className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-black text-foreground">{MOCK_USER_PROFILE.name}</h2>
          <p className="text-sm font-bold text-muted-foreground">{MOCK_USER_PROFILE.email}</p>
          <Badge className="bg-secondary text-primary border-none px-4 py-1 font-black rounded-full mt-2">
            {MOCK_USER_PROFILE.neighborhood}، {MOCK_USER_PROFILE.city}
          </Badge>
        </div>

        {/* Stats Grid - Black Cards, White Text, Green Non-filled Icons */}
        <div className="grid grid-cols-3 gap-4">
          {userStats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5 bg-black text-center p-5">
                <CardContent className="p-0 space-y-3 flex flex-col items-center">
                  <div className="p-3 rounded-2xl bg-white/5 border border-primary/20">
                    <stat.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-black text-white leading-none">{stat.value}</p>
                    <p className="text-[10px] font-black text-white/60">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Level Progress Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-[3.5rem] border-none bg-[#A3D139] p-8 shadow-xl overflow-hidden relative">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="space-y-1 text-right">
                  <h3 className="text-xl font-black text-[#1A2E05]">مستوى البطل</h3>
                  <p className="text-sm font-bold text-[#1A2E05]/70">
                    {MOCK_USER_PROFILE.points} من {MOCK_USER_PROFILE.nextLevelPoints} نقطة
                  </p>
                </div>
                <Button 
                  asChild
                  className="bg-[#C5E672] hover:bg-[#B5D662] text-[#1A2E05] font-black rounded-2xl h-12 px-6 border-none shadow-sm"
                >
                  <Link href="/challenges">استكشف التحديات</Link>
                </Button>
              </div>

              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    fill="transparent"
                    stroke="#8DB62C"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="58"
                    fill="transparent"
                    stroke="#1A2E05"
                    strokeWidth="8"
                    strokeDasharray={364}
                    initial={{ strokeDashoffset: 364 }}
                    animate={{ strokeDashoffset: 364 - (364 * progressPercentage) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black text-[#1A2E05]">{progressPercentage}%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <Separator className="bg-primary/10 h-[1.5px]" />

        {/* Achievements Badges */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-2xl font-black font-headline text-foreground">أوسمتي</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {BADGES_DATA.map((badge, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-md border-4 border-white">
                  <badge.icon className="h-10 w-10 text-white" />
                </div>
                <span className="text-[11px] font-black text-muted-foreground text-center leading-tight">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <Separator className="bg-primary/10 h-[1.5px]" />

        {/* Recent Activity - Alternating Colors */}
        <section className="space-y-6">
          <h3 className="text-2xl font-black font-headline text-foreground px-2 flex items-center gap-3">
            <History className="h-6 w-6 text-primary" />
            النشاط الأخير
          </h3>
          <div className="space-y-4">
            {MOCK_USER_ACTIVITIES.map((activity, i) => {
              const isBlack = i % 2 === 0;
              return (
                <Card 
                  key={i} 
                  className={cn(
                    "rounded-[2.5rem] border-none shadow-lg shadow-black/5 overflow-hidden transition-all active:scale-[0.98]",
                    isBlack ? "bg-black text-white" : "bg-white text-foreground"
                  )}
                >
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                        isBlack ? "bg-white/10 text-primary" : "bg-secondary text-primary"
                      )}>
                        <TrendingUp className="h-7 w-7" />
                      </div>
                      <div className="text-right">
                        <h4 className={cn(
                          "font-black text-sm leading-tight",
                          isBlack ? "text-white" : "text-foreground"
                        )}>
                          {activity.title}
                        </h4>
                        <p className={cn(
                          "text-[10px] font-bold mt-1",
                          isBlack ? "text-gray-400" : "text-muted-foreground"
                        )}>
                          {activity.date}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-black px-4 py-1.5 rounded-full text-[11px] border-primary text-primary bg-transparent",
                        isBlack && "border-primary/60"
                      )}
                    >
                      {activity.points}+
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Logout Action */}
        <div className="space-y-4 pb-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                className="w-full rounded-[2rem] h-16 bg-black text-white hover:bg-black/90 font-black flex justify-between px-8 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <LogOut className="h-6 w-6 rotate-180" />
                  <span>تسجيل الخروج</span>
                </div>
                <ChevronLeft className="h-5 w-5 rotate-180" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2.5rem] text-right border-none shadow-2xl" dir="rtl">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-black text-xl text-foreground">هل أنت متأكد من تسجيل الخروج؟</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-muted-foreground">
                  سيتم تسجيل خروجك من حسابك، وستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى بياناتك وتحدياتك.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-row gap-3">
                <AlertDialogCancel className="flex-1 rounded-xl h-12 font-black border-none bg-secondary">إلغاء</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleLogout}
                  className="flex-1 rounded-xl h-12 bg-black hover:bg-black/90 text-white font-black"
                >
                  خروج
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
