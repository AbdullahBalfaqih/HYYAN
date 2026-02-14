
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Footprints, Route, Flame, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

export function StepsTracker() {
  const [steps, setSteps] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<'default' | 'granted' | 'denied' | 'unsupported'>('default')
  const lastStepTime = useRef(0)
  const lastMagnitude = useRef(0)
  const goal = 10000
  const { toast } = useToast()

  const handleMotion = (event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity
    if (!acc) return

    const x = acc.x || 0
    const y = acc.y || 0
    const z = acc.z || 0
    
    const magnitude = Math.sqrt(x * x + y * y + z * z)
    const now = Date.now()
    
    if (magnitude > 10.5 && (magnitude - lastMagnitude.current) > 0.8 && now - lastStepTime.current > 250) {
      setSteps(prev => prev + 1)
      lastStepTime.current = now
    }
    
    lastMagnitude.current = magnitude
  }

  const startTracking = async () => {
    if (typeof window === 'undefined') return;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOS && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceMotionEvent as any).requestPermission()
        if (response === 'granted') {
          setPermissionStatus('granted')
          window.addEventListener('devicemotion', handleMotion)
          setIsTracking(true)
        } else {
          setPermissionStatus('denied')
          toast({
            variant: "destructive",
            title: "تم رفض الوصول",
            description: "يرجى السماح بالوصول للمستشعرات من إعدادات المتصفح.",
          })
        }
      } catch (error) {
        setPermissionStatus('denied')
      }
    } else if ('DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleMotion)
      setIsTracking(true)
      setPermissionStatus('granted')
    } else {
      setPermissionStatus('unsupported')
      toast({
        variant: "destructive",
        title: "جهاز غير مدعوم",
        description: "متصفحك لا يدعم مستشعرات الحركة المطلوبة.",
      })
    }
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('devicemotion', handleMotion)
    }
  }, [])

  const progress = (steps / goal) * 100
  const calories = (steps * 0.04).toFixed(1)
  const distance = (steps * 0.0008).toFixed(2)

  return (
    <div className="space-y-8 bg-black p-8 rounded-[3.5rem] shadow-2xl text-right relative overflow-hidden" dir="rtl">
      {/* Header with no fill for icon and goal */}
      <div className="flex justify-between items-center">
        {/* Left: Icon Circle (No Fill) */}
        <div className="w-14 h-14 bg-transparent border-2 border-primary/20 rounded-full flex items-center justify-center text-primary">
          <Footprints className="h-7 w-7" />
        </div>

        {/* Center: Title Only */}
        <div className="text-center flex-1">
          <h3 className="font-black text-2xl text-white leading-tight">نشاطي اليومي</h3>
        </div>

        {/* Right: Goal Capsule (No Fill) */}
        <div className="bg-transparent border-2 border-primary/20 text-primary px-6 py-3 rounded-full flex flex-col items-center justify-center min-w-[100px]">
          <span className="text-[10px] font-black leading-none">هدف:</span>
          <span className="text-lg font-black leading-none mt-1">{goal.toLocaleString()}</span>
        </div>
      </div>

      <Separator className="bg-white/10 h-[1px]" />

      {/* Main Circular Ring display */}
      <div className="relative flex justify-center py-6">
        <svg className="w-72 h-72 -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="120"
            fill="transparent"
            stroke="#1A1A1A"
            strokeWidth="18"
          />
          <motion.circle
            cx="144"
            cy="144"
            r="120"
            fill="transparent"
            stroke="#638C5A"
            strokeWidth="18"
            strokeDasharray={754}
            initial={{ strokeDashoffset: 754 }}
            animate={{ strokeDashoffset: 754 - (754 * Math.min(progress, 100)) / 100 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
          <motion.div
            key={steps}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-[5.5rem] font-black text-white tabular-nums tracking-tighter leading-none">
              {steps}
            </span>
            <span className="text-xl font-black text-gray-400 mt-2">خطوة</span>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards: Transparent, icons are green */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="p-4 flex flex-col items-center gap-2 bg-transparent"
        >
          <div className="text-primary mb-1">
            <Route className="h-10 w-10" />
          </div>
          <div className="text-center space-y-0.5">
            <p className="text-3xl font-black text-white">{distance}</p>
            <p className="text-[11px] font-black text-primary/80 tracking-wide">كيلومتر</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="p-4 flex flex-col items-center gap-2 bg-transparent"
        >
          <div className="text-primary mb-1">
            <Flame className="h-10 w-10" />
          </div>
          <div className="text-center space-y-0.5">
            <p className="text-3xl font-black text-white">{calories}</p>
            <p className="text-[11px] font-black text-primary/80 tracking-wide">سعرة حرارية</p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!isTracking ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4"
          >
            <button
              onClick={startTracking}
              className="w-full bg-[#638C5A] text-white font-black py-6 rounded-[2rem] shadow-xl shadow-primary/20 flex items-center justify-center transition-all text-xl hover:bg-primary/90 active:scale-95"
            >
              بداية التتبع
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white/5 py-5 rounded-[2rem] flex flex-col items-center justify-center gap-2 border border-white/10 shadow-inner"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-lg font-black text-white">جاري رصد نشاطك...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {progress >= 100 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-primary/10 border-2 border-primary/30 border-dashed p-8 rounded-[2.5rem] text-center mt-4"
          >
            <Trophy className="h-14 w-14 text-primary mx-auto mb-4 animate-bounce" />
            <p className="text-2xl font-black text-primary">بطل الاستدامة اليوم! 🎉</p>
            <p className="text-sm font-bold text-gray-400 mt-2">لقد حققت هدفك وحصلت على +100 نقطة لمجتمعك</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
