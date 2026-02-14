
"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trees, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  Loader2, 
  Navigation,
  X,
  Plus,
  Leaf,
  Calendar,
  ExternalLink
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { MOCK_ADOPTED_TREES } from "@/lib/mock-data";

const TREE_TYPES = [
  "نخلة (خلاص)", "سدر", "غاف", "ليمون حساوي", "نارنج", "ياسمين هندي", "لبخ"
];

export default function TreeAdoptionPage() {
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    type: ""
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getGPSLocation = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "غير مدعوم",
        description: "متصفحك لا يدعم تحديد الموقع الجغرافي.",
      });
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocating(false);
        toast({
          title: "تم تحديد الموقع",
          description: "تم جلب إحداثيات الشجرة بنجاح.",
        });
      },
      (error) => {
        console.error(error);
        setLocating(false);
        toast({
          variant: "destructive",
          title: "فشل تحديد الموقع",
          description: "يرجى السماح بالوصول للموقع من الإعدادات.",
        });
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !location) {
      toast({
        variant: "destructive",
        title: "بيانات ناقصة",
        description: "يرجى رفع صورة وتحديد الموقع الجغرافي للشجرة.",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "مبروك! 🎉",
        description: `لقد تم تبني الشجرة "${formData.name}" بنجاح.`,
      });
      // Reset form
      setFormData({ name: "", type: "" });
      setImage(null);
      setLocation(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 pb-32 text-right" dir="rtl">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-primary font-headline tracking-tight">الأشجار</h1>
        <p className="text-muted-foreground font-bold">ساهم في زيادة الغطاء النباتي ووثق أثرك البيئي.</p>
      </div>

      <Tabs defaultValue="my-nursery" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/30 rounded-[2rem] p-1 h-16 mb-8">
          <TabsTrigger value="my-nursery" className="rounded-2xl font-black text-lg data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">مشتلي</TabsTrigger>
          <TabsTrigger value="adopt" className="rounded-2xl font-black text-lg data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">تبني شجرة</TabsTrigger>
        </TabsList>

        <TabsContent value="adopt">
          <Card className="rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden p-8">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Tree Info */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-black mr-1 text-lg text-right block">اسم الشجرة</Label>
                    <div className="relative">
                      <Leaf className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                      <Input 
                        className="rounded-2xl h-14 pr-12 border-primary/10 bg-secondary/30 font-bold text-right" 
                        placeholder="مثلاً: نخلة فهد"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-black mr-1 text-lg text-right block">نوع الشجرة</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                      <SelectTrigger className="rounded-2xl h-14 border-primary/10 bg-secondary/30 font-bold text-right">
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl" dir="rtl">
                        {TREE_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-4 text-right">
                  <Label className="font-black mr-1 text-lg block">صورة الشجرة</Label>
                  {!image ? (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/20 bg-primary/5 rounded-[2.5rem] cursor-pointer hover:bg-primary/10 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                          <Camera className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm font-black text-primary/60">اضغط لرفع صورة الشجرة</p>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                  ) : (
                    <div className="relative w-full h-64 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                      <img src={image} alt="Tree" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setImage(null)}
                        className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-destructive transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* GPS Location */}
                <div className="space-y-4 text-right">
                  <Label className="font-black mr-1 text-lg block">موقع الشجرة</Label>
                  <div className="flex flex-col gap-4">
                    <div className="map-btn-wrapper">
                      <svg height="0" width="0">
                        <filter id="land">
                          <feTurbulence
                            result="turb"
                            numOctaves="7"
                            baseFrequency="0.006"
                            type="fractalNoise"
                          ></feTurbulence>
                          <feDisplacementMap
                            yChannelSelector="G"
                            xChannelSelector="R"
                            scale="700"
                            in="SourceGraphic"
                            in2="turb"
                          ></feDisplacementMap>
                        </filter>
                      </svg>

                      <div 
                        className="map-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          getGPSLocation();
                        }}
                      >
                        {locating ? "جاري التحديد..." : "تحديد موقعي الحالي"}
                      </div>

                      <div className="pinpoint"></div>
                      <div className="map-container">
                        <div className="map fold-1"></div>
                        <div className="map fold-2"></div>
                        <div className="map fold-3"></div>
                        <div className="map fold-4"></div>
                      </div>
                    </div>

                    {location && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/10 rounded-2xl p-4 flex flex-col items-center justify-center text-primary border border-primary/20"
                      >
                        <span className="text-[10px] font-black">إحداثيات الشجرة المؤكدة</span>
                        <span className="text-sm font-black">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full rounded-[2rem] h-20 text-2xl font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/30 border-none transition-all active:scale-95 mt-4"
                >
                  {loading ? (
                    <><Loader2 className="h-8 w-8 animate-spin ml-3" /> جاري الحفظ...</>
                  ) : (
                    <>تأكيد التبني</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-nursery" className="space-y-6">
          <div className="grid gap-8 max-w-2xl mx-auto">
            {MOCK_ADOPTED_TREES.map((tree, i) => (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-[3.5rem] border-none shadow-2xl overflow-hidden bg-white group transition-all">
                  <div className="relative h-64 w-full">
                    <Image 
                      src={tree.image} 
                      alt={tree.name} 
                      fill 
                      className="object-cover transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 bg-[#638C5A] text-white p-3 rounded-2xl shadow-lg backdrop-blur-sm z-10">
                      <Trees className="h-6 w-6" />
                    </div>
                  </div>
                  <CardContent className="p-10 space-y-6 text-right">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-foreground">{tree.name}</h3>
                      <div className="flex items-center gap-2 text-primary font-bold justify-start">
                        <Leaf className="h-4 w-4" />
                        <span className="text-sm">{tree.type}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-dashed border-gray-200 pt-8 mt-2">
                      <div className="flex items-center justify-between">
                        {/* Location Link on Right (Relative to RTL context) */}
                        <Button 
                          variant="ghost" 
                          className="rounded-xl font-black text-[#638C5A] hover:bg-primary/5 hover:text-primary gap-2 p-0 flex items-center"
                          onClick={() => window.open(`https://www.google.com/maps?q=${tree.location.lat},${tree.location.lng}`, '_blank')}
                        >
                          <span className="text-lg">الموقع</span>
                          <MapPin className="h-5 w-5" />
                        </Button>

                        {/* Date on Left (Relative to RTL context) */}
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span className="text-sm font-bold">تبنيتها في {tree.date}</span>
                          <Calendar className="h-5 w-5 text-primary/60" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {MOCK_ADOPTED_TREES.length === 0 && (
            <div className="text-center py-20 space-y-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Trees className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="font-black text-xl text-muted-foreground">لم تتبنَ أي شجرة بعد</p>
              <Button 
                variant="outline" 
                className="rounded-2xl font-black border-primary text-primary"
                onClick={() => document.querySelector('[value="adopt"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))}
              >
                ابدأ التبني الآن
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
