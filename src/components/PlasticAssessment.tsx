
"use client"

import { useState } from 'react';
import { plasticUseAssessment, PlasticUseAssessmentOutput } from '@/ai/flows/plastic-use-assessment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, Trophy, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function PlasticAssessment() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlasticUseAssessmentOutput | null>(null);
  const { toast } = useToast();

  const handleAssessment = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    try {
      const output = await plasticUseAssessment({ description });
      setResult(output);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تقييم النص. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <Textarea 
        placeholder="مثال: قمت هذا الأسبوع باستبدال الأكياس البلاستيكية بأكياس قماشية، واستخدمت مطارة مياه قابلة لإعادة التعبئة بدلاً من القوارير البلاستيكية..."
        className="min-h-[120px] rounded-2xl border-primary/20 bg-background resize-none focus-visible:ring-primary text-right font-bold"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      
      {!result ? (
        <Button 
          className="w-full rounded-[1.5rem] h-12 bg-primary/20 text-primary hover:bg-primary/30 border-none font-black flex items-center justify-center gap-2" 
          onClick={handleAssessment} 
          disabled={loading || !description}
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> جاري التقييم...</>
          ) : (
            <>
              <span>إرسال للتقييم</span>
              <Send className="h-4 w-4 rotate-180" />
            </>
          )}
        </Button>
      ) : (
        <div className="space-y-4 p-5 rounded-[2rem] bg-accent/5 border border-accent/20 animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="font-black text-foreground">نتيجتك: {result.score}/100</span>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={cn("h-4 w-4", s <= Math.round(result.score/20) ? "fill-accent text-accent" : "text-muted")} />
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
             <div className="flex justify-between text-xs font-black text-muted-foreground">
               <span>مدى الالتزام</span>
               <span>{result.score}%</span>
             </div>
             <Progress value={result.score} className="h-2 rounded-full" />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground font-bold border-r-4 border-accent pr-4 py-2 bg-white/50 rounded-l-xl">
            {result.assessment}
          </p>

          <Button 
            variant="outline" 
            className="w-full rounded-2xl h-10 text-xs font-black border-accent/20 text-accent hover:bg-accent/5" 
            onClick={() => { setDescription(''); setResult(null); }}
          >
            تحديث الجهود
          </Button>
        </div>
      )}
    </div>
  );
}
