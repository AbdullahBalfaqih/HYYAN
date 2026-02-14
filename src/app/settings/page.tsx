"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  HelpCircle, 
  ChevronLeft,
  LogOut,
  Moon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const handleToggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast({
      title: checked ? "تم تفعيل الوضع الليلي" : "تم إيقاف الوضع الليلي",
      description: "تم تحديث مظهر التطبيق بنجاح.",
    });
  };

  const handleAction = (title: string) => {
    toast({
      title: "قيد التطوير",
      description: `خيار "${title}" سيكون متاحاً بالكامل قريباً.`,
    });
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      router.push('/auth');
    }, 4000);
  };

  return (
    <div className="container mx-auto p-6 space-y-10 pb-32 md:pb-12 text-right" dir="rtl">
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

      {/* Account Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-foreground px-2">الحساب</h3>
        <Card className="rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden dark:bg-zinc-900">
          <CardContent className="p-0">
            <Link href="/settings/personal-info">
              <div className="flex items-center justify-between p-6 hover:bg-secondary/20 transition-all cursor-pointer group active:scale-[0.98]">
                <div className="flex items-center gap-5">
                   <ChevronLeft className="h-6 w-6 text-muted-foreground/50 rotate-180" />
                   <span className="font-black text-foreground text-lg">المعلومات الشخصية</span>
                </div>
                <div className="w-14 h-14 bg-primary/5 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <User className="h-7 w-7" />
                </div>
              </div>
            </Link>
            
            <Separator className="bg-primary/5 mx-6 w-auto" />
            
            <Link href="/settings/security">
              <div className="flex items-center justify-between p-6 hover:bg-secondary/20 transition-all cursor-pointer group active:scale-[0.98]">
                <div className="flex items-center gap-5">
                   <ChevronLeft className="h-6 w-6 text-muted-foreground/50 rotate-180" />
                   <span className="font-black text-foreground text-lg">كلمة المرور والأمان</span>
                </div>
                <div className="w-14 h-14 bg-primary/5 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <Shield className="h-7 w-7" />
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Preferences Section - Icons on Left, Toggles on Right */}
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-foreground px-2">التفضيلات</h3>
        <Card className="rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden dark:bg-zinc-900">
          <CardContent className="p-0">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="notif-toggle" 
                    className="toggle-plant-input" 
                    hidden 
                    checked={notifications} 
                    onChange={(e) => setNotifications(e.target.checked)} 
                  />
                  <label htmlFor="notif-toggle" className="toggle-plant">
                    <div className="toggle-plant__circle"></div>
                  </label>
                </div>
                <span className="font-black text-foreground text-lg">التنبيهات</span>
              </div>
              <div className="w-14 h-14 bg-[#F0F7EF] dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <Bell className="h-7 w-7" />
              </div>
            </div>

            <Separator className="bg-primary/5 mx-6 w-auto" />

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="dark-toggle" 
                    className="toggle-plant-input" 
                    hidden 
                    checked={darkMode} 
                    onChange={(e) => handleToggleDarkMode(e.target.checked)} 
                  />
                  <label htmlFor="dark-toggle" className="toggle-plant">
                    <div className="toggle-plant__circle"></div>
                  </label>
                </div>
                <span className="font-black text-foreground text-lg">الوضع الليلي</span>
              </div>
              <div className="w-14 h-14 bg-[#F0F7EF] dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <Moon className="h-7 w-7" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-foreground px-2">النظام</h3>
        <Card className="rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden dark:bg-zinc-900">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-6 hover:bg-secondary/20 transition-colors cursor-pointer group active:scale-[0.98]" onClick={() => handleAction('اللغة')}>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                   <ChevronLeft className="h-6 w-6 text-muted-foreground/50 rotate-180" />
                   <span className="text-sm font-bold text-primary">العربية</span>
                </div>
                <span className="font-black text-foreground text-lg">اللغة</span>
              </div>
              <div className="w-14 h-14 bg-primary/5 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <Globe className="h-7 w-7" />
              </div>
            </div>
            <Separator className="bg-primary/5 mx-6 w-auto" />
            <div className="flex items-center justify-between p-6 hover:bg-secondary/20 transition-colors cursor-pointer group active:scale-[0.98]" onClick={() => handleAction('مركز المساعدة')}>
              <div className="flex items-center gap-5">
                <ChevronLeft className="h-6 w-6 text-muted-foreground/50 rotate-180" />
                <span className="font-black text-foreground text-lg">مركز المساعدة</span>
              </div>
              <div className="w-14 h-14 bg-primary/5 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <HelpCircle className="h-7 w-7" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logout Button */}
      <div className="pt-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              className="w-full rounded-[2rem] h-20 bg-black text-white hover:bg-black/90 font-black flex justify-between px-8 shadow-2xl active:scale-[0.98] transition-all"
            >
              <ChevronLeft className="h-6 w-6 rotate-180" />
              <div className="flex items-center gap-4">
                <span className="text-xl">تسجيل الخروج</span>
                <LogOut className="h-7 w-7 rotate-180" />
              </div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-[3rem] text-right border-none p-10 shadow-2xl" dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-black text-2xl text-foreground">تأكيد الخروج</AlertDialogTitle>
              <AlertDialogDescription className="font-bold text-lg text-muted-foreground mt-2">
                هل أنت متأكد من رغبتك في تسجيل الخروج من حيّان؟
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row gap-4 mt-8">
              <AlertDialogCancel className="flex-1 rounded-2xl h-14 font-black border-none bg-secondary text-lg">إلغاء</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleLogout}
                className="flex-1 rounded-2xl h-14 bg-black hover:bg-black/90 text-white font-black text-lg"
              >
                خروج
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
