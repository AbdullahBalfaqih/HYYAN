"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudSun, 
  Wind, 
  Calendar, 
  Trees, 
  Info, 
  Sun,
  Palmtree,
  Apple,
  Loader2,
  Clock,
  CloudRain,
  MapPin,
  Sparkles
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const TREE_DATA = [
  { 
    name: "النخيل (الأحساء والقطيف)", 
    desc: "الأبرز بلا منازع، والأحساء من أكبر واحات النخيل في العالم. تشمل أصناف الخلاص والرزيز والشيشي.",
    icon: Palmtree,
    tags: ["يتحمل الحرارة", "إنتاج محلي"],
    bgImage: "https://res.cloudinary.com/ddznxtb6f/image/upload/v1770890299/Screenshot_2026-02-12_125803_gikyk3.png"
  },
  { 
    name: "الحمضيات", 
    desc: "برتقال، ليمون، نارنج، يوسفي. تزدهر شتاءً وبداية الربيع في القطيف والأحساء.",
    icon: Apple,
    tags: ["شتاءً", "ربيعاً"],
    bgImage: "https://res.cloudinary.com/ddznxtb6f/image/upload/v1770890371/Screenshot_2026-02-12_125920_df6pvc.png"
  },
  { 
    name: "المانجو", 
    desc: "يزرع في أجزاء من الأحساء والساحل الدافئ. إنتاجه صيفي بامتياز.",
    icon: Trees,
    tags: ["صيفياً"],
    bgImage: "https://res.cloudinary.com/ddznxtb6f/image/upload/v1770890267/Screenshot_2026-02-12_125713_fiwyi7.png"
  },
  { 
    name: "أشجار السدر (والغاف)", 
    desc: "أشجار تتحمل الملوحة والحر، مثالية للتشجير الحضري وزيادة الغطاء النباتي.",
    icon: Sun,
    tags: ["تحمل عالي", "زينة"],
    bgImage: "https://res.cloudinary.com/ddznxtb6f/image/upload/v1770890327/Screenshot_2026-02-12_125838_ty4wek.png"
  }
];

const CALENDAR_DATA = [
  { month: "يناير", event: "ذروة موسم الحمضيات (قطاف برتقال/ليمون). عناية وتقليم." },
  { month: "فبراير", event: "استمرار الحمضيات. بدء تجهيز مزارع النخيل للتلقيح." },
  { month: "مارس", event: "تلقيح النخيل (مرحلة مهمة). نهاية موسم أغلب الحمضيات." },
  { month: "أبريل", event: "عقد ثمار النخيل. نمو مبكر للمانجو." },
  { month: "مايو", event: "اشتداد الحرارة. متابعة ريّ النخيل والمانجو." },
  { month: "يونيو", event: "بداية نضج بعض أصناف الرطب المبكرة. المانجو يبدأ." },
  { month: "يوليو", event: "موسم الرطب (بداية حصاد مبكر لبعض الأصناف). ذروة المانجو." },
  { month: "أغسطس", event: "ذروة تمور الخلاص في الأحساء. استمرار الرطب." },
  { month: "سبتمبر", event: "استمرار حصاد التمور المتأخرة. تجهيز الزراعات الشتوية." },
  { month: "أكتوبر", event: "زراعة شتوية. تحضير أشجار الحمضيات للإزهار." },
  { month: "نوفمبر", event: "نضج الحمضيات المبكرة. طقس مناسب لغرس الأشجار الجديدة." },
  { month: "ديسمبر", event: "موسم الحمضيات يعود بقوة. تقليم وزراعة شتلات." }
];

export default function EnvironmentGuidePage() {
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentAdvice, setCurrentAdvice] = useState("");
  const [weatherData, setWeatherData] = useState<{ temp: number; wind: number; condition: string } | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const now = new Date();
    const monthIndex = now.getMonth();
    setCurrentMonth(months[monthIndex]);
    
    setFormattedDate(now.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long' }));
    setFormattedTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));

    const adviceMap: Record<string, string> = {
      "يناير": "استمتع بموسم الحمضيات وقطاف الليمون الحساوي!",
      "فبراير": "الجو معتدل جداً! ينصح ببدء تجهيز النخيل للتلقيح والاستمتاع بقطاف ليمون الشرقية.",
      "مارس": "وقت تلقيح النخيل قد حان، اهتم بالأشجار المثمرة.",
      "أغسطس": "الحرارة عالية، تأكد من ري الأشجار في المساء وحصاد تمور الخلاص.",
      "نوفمبر": "أفضل وقت لغرس الأشجار الجديدة في حيك!",
    };
    setCurrentAdvice(adviceMap[months[monthIndex]] || "استمتع بالأجواء وراقب دورة الطبيعة في حيك.");

    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=26.4207&longitude=50.0888&current_weather=true');
        const data = await res.json();
        if (data.current_weather) {
          setWeatherData({
            temp: Math.round(data.current_weather.temperature),
            wind: data.current_weather.windspeed,
            condition: "مشمس"
          });
        }
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-12 pb-32 md:pb-12 text-right" dir="rtl">
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-black font-headline text-foreground tracking-tight">دليل حيّان البيئي</h1>
        <p className="text-muted-foreground font-black text-lg">رفيقك الذكي للاستدامة والزراعة في المنطقة الشرقية.</p>
      </div>

      <Separator className="bg-primary/10 h-[1.5px]" />

      {/* Weather Card - Enlarged & Arabic */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-center"
      >
        <div className="hayan-weather-card">
          <section className="hayan-info-section">
            <div className="hayan-bg-design">
              <div className="hayan-circle-obj"></div>
              <div className="hayan-circle-obj"></div>
              <div className="hayan-circle-obj"></div>
            </div>
            
            {/* Left Side: Time, Date, City (Translated) */}
            <div className="hayan-left-side" dir="ltr">
              <div>
                <div className="hayan-hour-text text-left">{formattedTime || "00:00"}</div>
                <div className="hayan-date-text text-left">{formattedDate || "---"}</div>
              </div>
              <div className="hayan-city-name text-left">المنطقة الشرقية</div>
            </div>

            {/* Right Side: Weather info (Translated) */}
            <div className="hayan-right-side" dir="ltr">
              <div className="hayan-weather-row">
                <div className="hayan-weather-icon-box">
                  <svg stroke="#ffffff" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z" fill="#ffffff"></path>
                  </svg>
                </div>
                <div className="font-bold text-sm">مشمس</div>
              </div>
              <div className="hayan-temperature-text">{weatherData?.temp ?? '--'}°</div>
              <div className="hayan-range-text">42° / 28°</div>
            </div>
          </section>
          
          <section className="hayan-days-footer">
            <button className="hayan-day-btn">
              <span className="hayan-day-label">الجمعة</span>
              <span className="hayan-day-icon-small"><Sun className="w-full h-full text-white" /></span>
            </button>
            <button className="hayan-day-btn">
              <span className="hayan-day-label">الخميس</span>
              <span className="hayan-day-icon-small"><CloudRain className="w-full h-full text-white" /></span>
            </button>
            <button className="hayan-day-btn">
              <span className="hayan-day-label">الأربعاء</span>
              <span className="hayan-day-icon-small"><CloudRain className="w-full h-full text-white" /></span>
            </button>
            <button className="hayan-day-btn">
              <span className="hayan-day-label">الثلاثاء</span>
              <span className="hayan-day-icon-small"><Sun className="w-full h-full text-white" /></span>
            </button>
          </section>
        </div>
      </motion.div>

      {/* Advice Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-4">
           <Badge className="bg-primary text-white font-black px-6 py-2 rounded-full border-none shadow-lg">نصيحة {currentMonth}</Badge>
           <div className="flex items-center gap-2 text-primary font-black">
             <Wind className="h-5 w-5" />
             <span>{weatherData?.wind ?? '--'} كم/س</span>
           </div>
        </div>
        <h2 className="text-2xl font-black text-foreground leading-tight mb-4">
          {currentAdvice}
        </h2>
      </motion.div>

      <Separator className="bg-primary/10 h-[1.5px]" />

      {/* Main Content Tabs */}
      <Tabs defaultValue="trees" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/30 rounded-2xl p-1 h-14 mb-10">
          <TabsTrigger value="trees" className="rounded-xl font-black text-lg data-[state=active]:bg-white data-[state=active]:shadow-md">أشجار الشرقية</TabsTrigger>
          <TabsTrigger value="calendar" className="rounded-xl font-black text-lg data-[state=active]:bg-white data-[state=active]:shadow-md">التقويم السنوي</TabsTrigger>
        </TabsList>

        <TabsContent value="trees" className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {TREE_DATA.map((tree, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Card className="rounded-[3rem] border-none shadow-xl bg-white overflow-hidden h-full flex flex-col relative group">
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={tree.bgImage} 
                      alt={tree.name} 
                      fill 
                      className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-white/10" />
                  </div>

                  <div className="relative z-10 p-10 h-full flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-4 rounded-2xl bg-white/95 border border-primary/20 text-primary shadow-xl">
                          <tree.icon className="h-8 w-8" />
                        </div>
                        <div className="flex gap-2">
                          {tree.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[11px] font-black rounded-full px-4 py-1.5 bg-primary/20 text-primary border-none shadow-none">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4">
                        <h4 className="text-3xl font-black text-foreground drop-shadow-md">{tree.name}</h4>
                        <p className="text-base font-bold text-foreground mt-4 leading-relaxed bg-white/80 p-6 rounded-2xl backdrop-blur-xl border border-white/50 shadow-lg">{tree.desc}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <Card className="rounded-[3rem] border-none bg-black p-10 text-white shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-primary/20 text-primary">
                <Info className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-white text-2xl">بماذا تشتهر الشرقية؟</h4>
                <p className="text-lg font-bold text-gray-400 leading-relaxed">تمور الأحساء (الخلاص) هي علامة تجارية عالمية، وحمضيات القطيف تشتهر بجودتها العالية منذ القدم.</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="rounded-[3.5rem] border-none shadow-2xl bg-white overflow-hidden">
            <ScrollArea className="h-[600px] w-full p-8">
              <div className="space-y-6">
                {CALENDAR_DATA.map((item, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start gap-8 p-8 rounded-[2.5rem] transition-all ${currentMonth === item.month ? 'bg-primary/10 border-r-8 border-primary shadow-inner' : 'bg-secondary/20'}`}
                  >
                    <div className="min-w-[100px] text-center">
                      <span className={`text-2xl font-black ${currentMonth === item.month ? 'text-primary' : 'text-foreground'}`}>{item.month}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-muted-foreground leading-relaxed">{item.event}</p>
                    </div>
                    {currentMonth === item.month && (
                      <Badge className="bg-primary text-white font-black px-6 py-2 rounded-full text-xs border-none shadow-lg">الشهر الحالي</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
