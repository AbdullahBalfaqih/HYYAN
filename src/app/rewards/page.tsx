
"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Gift, 
  ShoppingBag, 
  Trees, 
  Coffee, 
  Ticket, 
  Star, 
  ChevronLeft,
  Trophy,
  Coins
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MOCK_REWARDS, MOCK_USER_PROFILE } from "@/lib/mock-data";

export default function RewardsPage() {
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState(MOCK_USER_PROFILE.points);

  const handleRedeem = (reward: any) => {
    if (userPoints >= reward.cost) {
      setUserPoints(prev => prev - reward.cost);
      toast({
        title: "تم الاستبدال بنجاح! 🎉",
        description: `لقد حصلت على ${reward.title}. سيتم إرسال التفاصيل لبريدك.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "نقاط غير كافية",
        description: `تحتاج إلى ${reward.cost - userPoints} نقطة إضافية لهذا العرض.`,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-10 pb-32 md:pb-12 text-right" dir="rtl">
      {/* Points Summary Card */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black rounded-[3rem] p-8 text-white flex flex-col items-center space-y-4 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <Coins className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-black">{userPoints.toLocaleString()}</h2>
        </div>
        <p className="font-bold text-gray-400 text-sm">نقاطك المتاحة للاستبدال</p>
        <Badge className="bg-primary/20 text-primary border-none px-4 py-1">مستوى البطل {MOCK_USER_PROFILE.level}</Badge>
      </motion.div>

      <div className="space-y-6">
        <h3 className="text-2xl font-black text-foreground px-2">مكافآت حصرية لك</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {MOCK_REWARDS.map((reward, i) => (
            <motion.div 
              key={reward.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5 bg-white overflow-hidden active:scale-95 transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`${reward.color} p-4 rounded-2xl`}>
                      <reward.icon className="h-8 w-8" />
                    </div>
                    <Badge variant="outline" className="rounded-lg font-black border-primary/20 text-primary">
                      {reward.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 mb-6">
                    <h4 className="text-xl font-black text-foreground">{reward.title}</h4>
                    <p className="text-sm font-bold text-muted-foreground">{reward.provider}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100">
                    <div className="flex items-center gap-1.5 font-black text-accent">
                      <Star className="h-4 w-4 fill-accent" />
                      <span>{reward.cost} نقطة</span>
                    </div>
                    <Button 
                      onClick={() => handleRedeem(reward)}
                      className="rounded-xl h-10 px-6 font-black bg-primary text-white hover:bg-primary/90"
                    >
                      استبدل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
