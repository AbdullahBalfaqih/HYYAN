
"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Save, 
  Loader2 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const KHOBAR_NEIGHBORHOODS = [
  "الخبر الشمالية", "البندرية", "الحمراء", "الكورنيش", "العقربية", "الثقبة", "الروابي", "الأحياء الوسطى",
  "الخبر الجنوبية", "الصدفة", "الراكة الجنوبية", "العليا", "الخزامى", "اليرموك", "الأحياء الشرقية",
  "الكورنيش الجنوبي", "مدينة العمال", "الأحياء الغربية", "مدينة الملك فهد السكنية", "مدينة سلطان",
  "الهدا", "الجسر", "الأحياء الحديثة", "الحزام الذهبي"
];

export default function PersonalInfoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "فهد الأحمد",
    email: "fahad@example.com",
    phone: "501234567",
    neighborhood: "الكورنيش"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث معلوماتك الشخصية بنجاح.",
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
        <h1 className="text-3xl font-black text-foreground">المعلومات الشخصية</h1>
      </div>

      <Card className="rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden p-8 dark:bg-zinc-900">
        <CardContent className="p-0">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-black mr-1">الاسم الكامل</Label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  className="rounded-2xl h-14 pr-12 border-primary/10 bg-secondary/30 font-bold" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-black mr-1">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="email"
                  className="rounded-2xl h-14 pr-12 border-primary/10 bg-secondary/30 font-bold" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-black mr-1">رقم الجوال</Label>
              <div className="relative flex items-center">
                <div className="absolute right-4 flex items-center gap-2 pointer-events-none border-l pl-3 border-primary/10 h-6">
                  <span className="text-sm font-bold text-muted-foreground">+966</span>
                </div>
                <Input 
                  type="tel"
                  className="rounded-2xl h-14 pr-24 border-primary/10 bg-secondary/30 font-bold" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-black mr-1">الحي (الخبر)</Label>
              <div className="relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Select 
                  value={formData.neighborhood}
                  onValueChange={(val) => setFormData({...formData, neighborhood: val})}
                >
                  <SelectTrigger className="rounded-2xl h-14 pr-12 border-primary/10 bg-secondary/30 font-bold">
                    <SelectValue placeholder="اختر الحي" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl max-h-[300px]">
                    {KHOBAR_NEIGHBORHOODS.map((hood) => (
                      <SelectItem key={hood} value={hood}>{hood}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-[2rem] h-16 text-xl font-black bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 border-none mt-4"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="ml-3 h-6 w-6 animate-spin" /> جاري الحفظ...</>
              ) : (
                <><Save className="ml-3 h-6 w-6" /> حفظ التغييرات</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
