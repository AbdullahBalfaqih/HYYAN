
"use client"

import { useState } from 'react';
import { wasteSortingAnalysis, WasteSortingAnalysisOutput } from '@/ai/flows/waste-sorting-analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, CheckCircle2, XCircle, Loader2, AlertCircle, CloudUpload, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function WasteAnalysis() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WasteSortingAnalysisOutput | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      const output = await wasteSortingAnalysis({ photoDataUri: image });
      setResult(output);
      toast({
        title: "اكتمل التحليل الذكي",
        description: output.followsRecommendations ? "رائع! لقد قمت بفرز النفايات بشكل صحيح." : "تم التحليل، تفحص الملاحظات للتحسين.",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحليل الصورة. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="border-none shadow-2xl shadow-black/5 bg-white rounded-[3.5rem] overflow-hidden" dir="rtl">
        <CardContent className="p-8 space-y-6 text-right">
          
          <AnimatePresence mode="wait">
            {!image ? (
              <motion.div 
                key="upload-zone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative"
              >
                <label 
                  htmlFor="file-upload-waste" 
                  className="group cursor-pointer border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all rounded-[3rem] p-12 flex flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <CloudUpload className="h-10 w-10 text-primary/60" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-xl text-foreground">اسحب الصورة وأفلتها هنا</p>
                    <p className="text-sm font-bold text-muted-foreground">أو</p>
                    <span className="inline-block mt-2 bg-primary text-white px-8 py-2.5 rounded-2xl font-black shadow-lg shadow-primary/20 group-hover:bg-primary/90 transition-colors">تصفح الصور</span>
                  </div>
                  <input id="file-upload-waste" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </motion.div>
            ) : (
              <motion.div 
                key="preview-zone"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
                   <img src={image} alt="Waste Sorting" className="object-cover w-full h-full" />
                   <button 
                    onClick={() => { setImage(null); setResult(null); }}
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-md hover:bg-destructive text-white p-2.5 rounded-full transition-all active:scale-90"
                   >
                     <XCircle className="h-6 w-6" />
                   </button>
                   {loading && (
                     <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="font-black text-lg animate-pulse">جاري فحص النفايات بالذكاء الاصطناعي...</p>
                     </div>
                   )}
                </div>

                {!result && !loading && (
                  <Button 
                    className="w-full rounded-[2rem] h-16 text-xl font-black shadow-xl bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-3 border-none transition-all active:scale-95" 
                    onClick={runAnalysis} 
                  >
                    <span>ابدأ تحليل الفرز الآن</span>
                    <Sparkles className="h-6 w-6" />
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-8 rounded-[2.5rem] border-2 shadow-sm text-right space-y-4",
                result.followsRecommendations ? "bg-green-50 border-green-100" : "bg-orange-50 border-orange-100"
              )}
            >
              <div className="flex items-center gap-5">
                <div className={cn(
                  "p-4 rounded-2xl shadow-sm",
                  result.followsRecommendations ? "bg-white text-green-600" : "bg-white text-orange-600"
                )}>
                  {result.followsRecommendations ? (
                    <CheckCircle2 className="h-8 w-8" />
                  ) : (
                    <AlertCircle className="h-8 w-8" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-800 text-xl">نتيجة الفرز الذكي</h4>
                  <Badge className={cn(
                    "mt-2 font-black px-4 py-1 rounded-full text-xs border-none",
                    result.followsRecommendations ? "bg-green-600 text-white" : "bg-orange-500 text-white"
                  )}>
                    {result.followsRecommendations ? "فرز مثالي (+150 نقطة)" : "يحتاج لبعض التعديلات"}
                  </Badge>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed font-bold border-r-4 border-primary/20 pr-6 py-2">
                {result.analysisResult}
              </p>
              
              <Button 
                variant="ghost" 
                onClick={() => { setImage(null); setResult(null); }}
                className="w-full font-black text-muted-foreground hover:bg-white/50 rounded-xl"
              >
                إغلاق وتحليل صورة أخرى
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
