
"use client"

import { useState } from "react";
import { 
  Lock, 
  ShieldCheck, 
  ChevronRight, 
  Save, 
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SecurityPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "كلمات المرور الجديدة غير متطابقة.",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم تحديث الأمان",
        description: "تم تغيير كلمة المرور بنجاح.",
      });
      router.push('/settings');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 pb-32 text-right" dir="rtl">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => router.back()} className="p-2 hover:bg-secondary rounded-xl transition-colors">
          <ChevronRight className="h-7 w-7" />
        </button>
        <h1 className="text-3xl font-black text-foreground">كلمة المرور والأمان</h1>
      </div>

      <Card className="rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden p-8 dark:bg-zinc-900">
        <CardContent className="p-0">
          <div className="bg-secondary/20 p-6 rounded-[2rem] mb-8 flex items-center gap-4 border border-primary/5">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="font-black text-foreground">أمان الحساب عالي</p>
              <p className="text-xs font-bold text-muted-foreground">اخر تغيير قبل 3 أشهر</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-black mr-1">كلمة المرور الحالية</Label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type={showPass ? "text" : "password"}
                  className="rounded-2xl h-14 pr-12 border-primary/10 bg-secondary/30 font-bold" 
                  placeholder="••••••••"
                  required
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Separator className="bg-primary/5" />

            <div className="space-y-2">
              <Label className="font-black mr-1">كلمة المرور الجديدة</Label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="password"
                  className="rounded-2xl h-14 pr-12 border-primary/10 bg-secondary/30 font-bold" 
                  placeholder="••••••••"
                  required
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-black mr-1">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="password"
                  className="rounded-2xl h-14 pr-12 border-primary/10 bg-secondary/30 font-bold" 
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-[2rem] h-16 text-xl font-black bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 border-none mt-6"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="ml-3 h-6 w-6 animate-spin" /> جاري التحديث...</>
              ) : (
                <><Save className="ml-3 h-6 w-6" /> تحديث كلمة المرور</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
