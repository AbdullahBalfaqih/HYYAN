"use client"

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Wind, 
  Trash2, 
  Trees, 
  Zap, 
  Users, 
  Droplets,
  Footprints,
  XCircle,
  CloudUpload,
  School,
  Camera,
  Share2,
  Lightbulb,
  Clock
} from "lucide-react";
import { WasteAnalysis } from "@/components/WasteAnalysis";
import { StepsTracker } from "@/components/StepsTracker";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { id: 'greening', label: 'التشجير', icon: Trees },
  { id: 'air', label: 'جودة الهواء', icon: Wind },
  { id: 'waste', label: 'النفايات', icon: Trash2 },
  { id: 'energy', label: 'الطاقة والمياه', icon: Zap },
  { id: 'community', label: 'المجتمع', icon: Users },
];

const CHALLENGES_DATA = {
  greening: [
    { title: "ازرع شجرة", description: "ازرع نبتة أو شجرة أمام منزلك وشاركنا الصورة لتوثيق الأثر.", points: 300, icon: Trees },
    { title: "تحدي الرعاية (30 يوم)", description: "حافظ على نبتتك حية وبصحة جيدة لمدة شهر كامل بمتابعة يومية.", points: 450, icon: Droplets },
  ],
  air: [
    { title: "يوم بلا سيارة", description: "استخدم المشي أو الدراجة للذهاب إلى العمل أو المتجر بدلاً من السيارة.", points: 200, icon: Footprints },
    { title: "تجنب وقت الذروة", description: "قلل من استخدام السيارة في أوقات الزحام لتقليل الانبعاثات.", points: 50, icon: Clock }
  ],
  waste: [
    { title: "إعادة استخدام المواد", description: "حول مواد قديمة في منزلك لاستخدام جديد ومفيد.", points: 15, icon: Trash2 },
    { title: "تنظيف الممرات العامة", description: "ساهم في إزالة القمامة والأوراق من ممرات حيك السكني.", points: 20, icon: Footprints },
    { title: "إعادة التدوير في المدارس", description: "ساهم في تنظيم حاويات إعادة التدوير في مدرستك.", points: 30, icon: School },
    { title: "أسبوع بلا بلاستيك", description: "تجنب استخدام المواد البلاستيكية وحيدة الاستخدام لمدة أسبوع.", points: 500, icon: Trash2 },
  ],
  energy: [
    { title: "إطفاء الكهرباء غير المستخدمة", description: "صور توثق إطفاء الأنوار والأجهزة في الأماكن غير المستخدمة.", points: 10, icon: Lightbulb },
    { title: "الحد من استهلاك المياه", description: "راقب استهلاك المياه في المنزل وشاركنا طرق ترشيدك.", points: 10, icon: Droplets },
  ],
  community: [
    { title: "توثيق مشروع بيئي", description: "صور قبل وبعد لمشروع تنظيف أو تشجير قمت به في حيك.", points: 20, icon: Camera },
    { title: "مشاركة محتوى توعوي", description: "انشر نصائح بيئية على وسائل التواصل وشاركنا لقطة شاشة.", points: 10, icon: Share2 },
  ]
};

function ChallengesContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'greening';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="container mx-auto p-6 space-y-12 pb-32 md:pb-12 text-right" dir="rtl">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div className="space-y-3">
          <h1 className="text-4xl font-black font-headline text-foreground tracking-tight text-primary">تحديات الاستدامة</h1>
          <p className="text-muted-foreground font-black text-lg">بطل البيئة ينفذ التحديات ويجمع النقاط.</p>
        </div>
      </motion.div>

      <Separator className="bg-primary/10 h-[1.5px]" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center gap-2 mb-10 overflow-hidden px-1">
          <TabsList className="flex-1 justify-start overflow-x-auto h-auto bg-transparent border-none rounded-none scrollbar-hide gap-4 pb-2">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl rounded-[2rem] px-8 py-4 flex items-center gap-3 border border-transparent bg-black text-white/70 hover:text-white transition-all font-black text-sm whitespace-nowrap h-14"
              >
                <cat.icon className="h-5 w-5" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {Object.entries(CHALLENGES_DATA).map(([catId, challenges]) => (
          <TabsContent key={catId} value={catId} className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {catId === 'air' && <StepsTracker />}
              {catId === 'waste' && (
                <div className="grid gap-10 lg:grid-cols-1 mb-12">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black font-headline text-foreground px-4">تحليل فرز النفايات الذكي</h3>
                    <WasteAnalysis />
                  </div>
                </div>
              )}
              
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {challenges.map((challenge, index) => (
                  <ChallengeItem 
                    key={index}
                    {...challenge}
                    isWhite={index % 2 === 0}
                  />
                ))}
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default function ChallengesPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-10 text-center font-black">جاري التحميل...</div>}>
      <ChallengesContent />
    </Suspense>
  );
}

function ChallengeItem({ title, description, points, icon: Icon, isWhite }: any) {
  const [image, setImage] = useState<string | null>(null);
  const [isDocumented, setIsDocumented] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsDocumented(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <Card className={cn(
        "rounded-[3.5rem] border-none shadow-2xl shadow-black/5 overflow-visible relative p-8 pt-14 flex flex-col items-center transition-all duration-500 h-full",
        isWhite ? "bg-white text-foreground" : "bg-black text-white"
      )}>
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-[1.5rem] bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 z-20">
          <Icon className="h-8 w-8" strokeWidth={2.5} />
        </div>

        <CardContent className="p-0 w-full space-y-6 flex flex-col items-center">
          <div className="text-center space-y-3">
            <h4 className={cn("text-2xl font-black tracking-tight leading-tight", !isWhite ? "text-white" : "text-foreground")}>
              {title}
            </h4>
            <Badge className="bg-transparent border-2 border-accent text-accent font-black px-6 py-1.5 rounded-full text-[11px] shadow-none">
              {points}+ نقطة
            </Badge>
          </div>
          
          <p className={cn("text-sm font-bold leading-relaxed text-center px-4", !isWhite ? "text-gray-400" : "text-muted-foreground")}>
            {description}
          </p>
          
          <div className="w-full flex flex-col items-center gap-6 py-2">
            {image ? (
              <div className="flex flex-col items-center gap-6">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative w-44 h-44 rounded-[3rem] overflow-hidden border-4 border-primary/20 shadow-2xl group"
                >
                  <img src={image} alt="Uploaded" className="object-cover w-full h-full" />
                  {!isDocumented && (
                    <button 
                      className="absolute top-3 right-3 bg-white/95 p-2 rounded-full text-destructive shadow-lg hover:scale-110 transition-transform z-30"
                      onClick={() => setImage(null)}
                    >
                      <XCircle className="h-6 w-6" />
                    </button>
                  )}
                  {isDocumented && (
                    <div className="absolute bottom-0 inset-x-0 bg-primary/95 text-white text-center py-2.5 text-[10px] font-black backdrop-blur-sm">
                      تم التوثيق بنجاح! ✓
                    </div>
                  )}
                </motion.div>

                {!isDocumented && (
                  <motion.button 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onClick={() => setIsDocumented(true)}
                    className="btn-doc"
                  >
                    <div className="wrapper-doc">
                      <p className="text-doc">توثيق</p>
                      {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className={`flower flower${i}`}>
                          <div className="petal one"></div>
                          <div className="petal two"></div>
                          <div className="petal three"></div>
                          <div className="petal four"></div>
                        </div>
                      ))}
                    </div>
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="w-44 h-44">
                 <label 
                    htmlFor={`file-${title}-${!isWhite ? 'dark' : 'light'}`} 
                    className={cn(
                      "cursor-pointer border-2 border-dashed rounded-[3rem] w-full h-full flex flex-col items-center justify-center gap-4 transition-all group",
                      !isWhite 
                        ? "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40" 
                        : "border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/30"
                    )}
                  >
                    <motion.div 
                      whileHover={{ rotate: 15 }}
                      className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center transition-transform",
                        !isWhite ? "bg-white/10 text-white" : "bg-primary/10 text-primary"
                      )}
                    >
                      <CloudUpload className="h-7 w-7" />
                    </motion.div>
                    <p className={cn(
                      "font-black text-[11px] text-center px-4 leading-tight",
                      !isWhite ? "text-white/70" : "text-foreground/70"
                    )}>
                      رفع الصورة لتوثيق التحدي
                    </p>
                    <input id={`file-${title}-${!isWhite ? 'dark' : 'light'}`} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}