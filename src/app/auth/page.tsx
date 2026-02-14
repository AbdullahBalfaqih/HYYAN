"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Lock, 
  ScanFace,
  Calendar,
  Clock,
  MapPin
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { sendWelcomeEmail } from "@/app/actions/auth";

const LOGO_URL = "https://res.cloudinary.com/ddznxtb6f/image/upload/v1771018883/_PhotoFixerBot_21-38-30_UTC-removebg-preview_crjeoy.png";

const CITIES = ["الخبر", "الدمام", "الأحساء", "الظهران", "القطيف"];

const SeedIcon = () => (
  <svg className="seed" viewBox="0 0 512.004 512.004" xmlns="http://www.w3.org/2000/svg" fill="#000000">
    <g>
      <path style={{ fill: '#e5c11f' }} d="M370.114,157.811C351.523,65.174,307.456,0,256,0c-51.447,0-95.514,65.174-114.114,157.811 c41.057,46.036,72.854,122.827,92.328,199.477C251.065,406.528,256,461.356,256,512c0-50.644,4.935-105.472,21.786-154.712 C297.269,280.638,329.057,203.847,370.114,157.811"></path>
      <path style={{ fill: '#AF6D2D' }} d="M256.002,512.004c0-138.664-77.241-397.241-194.207-397.241 C-19.966,351.668,96.373,512.004,256.002,512.004"></path>
      <path style={{ fill: '#864D18' }} d="M185.347,471.952c-1.121,0-2.26-0.221-3.363-0.671c-31.603-13.065-58.033-34.278-78.539-63.047 c-41.393-58.068-52.515-141.047-31.329-233.657c1.086-4.758,5.826-7.733,10.575-6.63c4.749,1.086,7.724,5.817,6.638,10.567 c-20.047,87.623-9.931,165.57,28.495,219.471c18.556,26.033,42.408,45.197,70.894,56.973c4.511,1.863,6.656,7.027,4.793,11.529 C192.1,469.895,188.816,471.952,185.347,471.952"></path>
      <path style={{ fill: '#AF6D2D' }} d="M256.002,512.004c0-138.664,77.241-397.241,194.207-397.241 C531.97,351.668,415.631,512.004,256.002,512.004"></path>
      <path style={{ fill: '#B49377' }} d="M184.403,141.249c-0.83,0-1.66-0.124-2.498-0.362c-4.67-1.377-7.353-6.285-5.976-10.964 c11.714-39.812,28.637-71.318,47.634-88.691c3.593-3.302,9.181-3.046,12.473,0.556c3.293,3.593,3.037,9.181-0.556,12.473 c-16.419,15.007-31.947,44.403-42.611,80.649C191.739,138.751,188.216,141.249,184.403,141.249"></path>
    </g>
  </svg>
);

const PlantIcon = () => (
  <svg className="plant" viewBox="0 0 512.002 512.002" xmlns="http://www.w3.org/2000/svg" fill="#000000">
    <g>
      <path style={{ fill: '#8B4513' }} d="M252.899,512.002c-4.504,0-8.313-3.471-8.643-8.036c-7.706-104.222,3.662-160.516,11.186-197.762 c8.669-42.947,12.635-62.551-18.276-109.698c-2.629-4.009-1.51-9.39,2.499-12.019c4.009-2.629,9.39-1.519,12.019,2.499 c34.816,53.118,29.826,77.815,20.766,122.654c-7.775,38.487-18.415,91.205-10.891,193.041c0.356,4.782-3.237,8.947-8.01,9.294 C253.333,511.994,253.116,512.002,252.899,512.002"></path>
      <g>
        <path style={{ fill: '#91CF96' }} d="M252.908,512.002c0-81.651-45.481-234.305-114.35-234.305 C90.422,417.187,158.917,512.002,252.908,512.002"></path>
        <path style={{ fill: '#91CF96' }} d="M252.908,512.002c0-81.651-45.481-234.305,114.35-234.305 C415.394,417.187,346.899,512.002,252.908,512.002"></path>
        <path style={{ fill: '#91CF96' }} d="M270.264,277.697c-1.927,0-3.81-0.642-5.346-1.84c-2.013-1.579-3.237-3.966-3.332-6.517 c-2.994-81.868,59.184-115.538,118.376-119.747c2.3-0.148,4.565,0.599,6.3,2.1c1.736,1.51,2.803,3.645,2.968,5.944 c0.876,12.314-16.419,98.807-117.187,119.877C271.453,277.636,270.854,277.697,270.264,277.697"></path>
        <path style={{ fill: '#91CF96' }} d="M244.332,200.401c-0.963,0-1.927-0.165-2.846-0.495c-65.38-23.535-89.183-69.068-97.644-103.12 c-10.865-43.728-0.946-85.001,7.194-93.948c2.291-2.517,5.84-3.463,9.068-2.421c18.701,6.014,115.252,67.098,92.898,192.738 c-0.061,0.347-0.148,0.694-0.252,1.033c-0.694,2.265-2.308,4.209-4.434,5.268C247.074,200.071,245.703,200.401,244.332,200.401"></path>
      </g>
      <g>
        <path style={{ fill: '#5ABA63' }} d="M270.264,277.697c-2.187,0-4.382-0.824-6.075-2.482c-3.419-3.35-3.48-8.843-0.121-12.271 l53.404-54.524c3.358-3.428,8.852-3.48,12.271-0.13c3.428,3.35,3.489,8.843,0.13,12.271l-53.413,54.532 C274.768,276.829,272.512,277.697,270.264,277.697"></path>
        <path style={{ fill: '#5ABA63' }} d="M244.467,200.311c-3.15,0-6.187-1.718-7.732-4.712l-39.224-76.436 c-2.196-4.261-0.503-9.494,3.758-11.681c4.261-2.204,9.494-0.503,11.681,3.758l39.233,76.427c2.187,4.27,0.503,9.502-3.758,11.689 C247.157,200.008,245.795,200.311,244.467,200.311"></path>
      </g>
    </g>
  </svg>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "الخبر",
    neighborhood: "",
    age: "",
    birthDate: ""
  });
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!isLogin) {
      await sendWelcomeEmail(formData.name, formData.email);
    }

    setTimeout(() => {
      router.push("/home");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4 relative overflow-x-hidden pt-8">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="logout-flower-view"
            >
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className={`logout-petal-view lp${i}`} />
              ))}
              <div className="logout-center-view" />
            </motion.div>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white font-black text-2xl tracking-widest mt-8"
            >
              جاري تسجيل الدخول
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md z-10 py-2"
      >
        <div className="flex flex-col items-center mb-4">
          <motion.div className="w-64 h-64 mb-1">
            <Image src={LOGO_URL} alt="Logo" width={256} height={256} className="object-contain" priority />
          </motion.div>
          <p className="text-primary font-black text-2xl mt-0 tracking-tight">حيك يحيا بسلوكك</p>
        </div>

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-background mb-4">
          <CardContent className="p-6">
            <div className="flex bg-secondary/50 p-1 rounded-2xl mb-6">
              <button 
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${isLogin ? "bg-primary shadow-lg text-white" : "text-muted-foreground"}`}
              >
                دخول
              </button>
              <button 
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${!isLogin ? "bg-primary shadow-lg text-white" : "text-muted-foreground"}`}
              >
                حساب جديد
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4" dir="rtl">
              <AnimatePresence mode="wait">
                {!isLogin ? (
                  <motion.div 
                    key="signup-fields"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3"
                  >
                    <div className="space-y-1">
                      <Label className="font-black mr-1 text-sm text-right block w-full">الاسم الكامل</Label>
                      <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="rounded-2xl h-11 pr-11 border-primary/10 bg-secondary/30 text-sm font-bold text-right" 
                          placeholder="كيف نناديك؟" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="font-black mr-1 text-sm text-right block w-full">المدينة</Label>
                        <Select value={formData.city} onValueChange={(v) => setFormData({...formData, city: v})}>
                          <SelectTrigger className="rounded-2xl h-11 border-primary/10 bg-secondary/30 text-sm font-bold text-right">
                            <SelectValue placeholder="اختر المدينة" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl">
                            {CITIES.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="font-black mr-1 text-sm text-right block w-full">الحي</Label>
                        <Input 
                          className="rounded-2xl h-11 border-primary/10 bg-secondary/30 text-sm font-bold text-right" 
                          placeholder="اسم الحي"
                          required
                          value={formData.neighborhood}
                          onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="font-black mr-1 text-sm text-right block w-full">تاريخ الميلاد</Label>
                        <div className="relative">
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="date"
                            className="rounded-2xl h-11 pr-10 border-primary/10 bg-secondary/30 text-sm font-bold text-right" 
                            required
                            value={formData.birthDate}
                            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="font-black mr-1 text-sm text-right block w-full">العمر</Label>
                        <div className="relative">
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="number"
                            className="rounded-2xl h-11 pr-10 border-primary/10 bg-secondary/30 text-sm font-bold text-right" 
                            placeholder="العمر"
                            required
                            value={formData.age}
                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="space-y-1">
                <Label className="font-black mr-1 text-sm text-right block w-full">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    className="rounded-2xl h-11 pr-11 border-primary/10 bg-secondary/30 text-sm font-bold text-right" 
                    placeholder="name@example.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="font-black mr-1 text-sm text-right block w-full">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    className="rounded-2xl h-11 pr-11 border-primary/10 bg-secondary/30 text-sm font-bold text-right" 
                    placeholder="••••••••" 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-black text-muted-foreground">تذكرني دائماً</span>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider">
                    <SeedIcon />
                    <PlantIcon />
                  </span>
                </label>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <button 
                    type="submit" 
                    className="button_01 w-full"
                    disabled={isLoading}
                  >
                    <span>{isLogin ? "تسجيل الدخول" : "إنشاء الحساب"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="tree">
                      <path fill="#593B39" d="M592 267.2h-126.4c-9.28 0-16.64 7.36-16.64 16.64v546.56c0 9.28 7.36 16.64 16.64 16.64h126.4c9.28 0 16.64-7.36 16.64-16.64V284.16c0-9.28-7.36-16.96-16.64-16.96z"></path>
                      <path fill="#FF944C" d="M921.408 896H140.352a466.4 466.4 0 0 1 390.528-210.88c163.392 0 307.136 83.84 390.528 210.88z"></path>
                      <path fill="#96C34A" d="M509.44 271.68H193.6c-17.28 0-31.36-15.68-27.84-32.32 15.36-81.28 87.36-143.68 172.8-143.68 86.496 0 159.136 63.552 173.44 146.144 14.336-82.592 86.976-146.144 173.44-146.144 85.44 0 157.44 62.4 172.8 143.68 3.2 16.96-10.56 32.32-27.84 32.32H509.44z"></path>
                      <path fill="#608842" d="M504 291.2l-98.24 98.24-98.24 98.24c-11.84 11.52-31.68 10.56-40.96-3.2-44.8-65.28-38.08-156.48 19.84-214.4 57.92-57.92 148.8-64.64 214.4-19.84 6.72 4.544 10.432 11.712 11.04 19.2a24.48 24.48 0 0 1 10.4-17.28c63.68-43.52 152-36.8 208.32 19.2 56.32 56.32 62.72 144.64 19.2 208.32-8.96 13.12-28.48 14.4-39.68 2.88l-95.36-95.36-95.36-95.36a26.656 26.656 0 0 1-7.648-16.576 27.296 27.296 0 0 1-7.712 15.936z"></path>
                      <path fill="#8B5C56" d="M528 351.68a63.68 63.68 0 1 1-127.36 0 63.68 63.68 0 0 1 127.36 0zM655.68 416a64 64 0 1 1-128 0 64 64 0 0 1 128 0z"></path>
                      <path fill="#00A6ED" d="M960.64 884.16c-0.32-16.32-16.32-33.92-32.64-34.24-32.64-0.32-46.4-17.92-84.16-17.92-55.04 0-55.04 32-110.08 32s-55.04-32-110.4-32c-55.04 0-55.04 32-110.4 32-55.04 0-55.04-32-110.4-32-55.04 0-55.04 32-110.08 32s-55.04-32-110.4-32c-44.16 0-62.08 20.16-92.48 28.16-15.04 4.16-25.6 17.92-25.6 33.28 0 19.2 15.36 34.56 34.56 34.56H931.2c16 0 29.12-12.8 29.44-28.8 0.32-5.12 0.32-10.24 0-15.04z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 690" className="wave">
                      <defs>
                        <linearGradient y2="50%" x2="100%" y1="50%" x1="0%" id="gradient">
                          <stop stopColor="#8ed1fc" offset="5%"></stop>
                          <stop stopColor="#0693e3" offset="95%"></stop>
                        </linearGradient>
                      </defs>
                      <path transform="rotate(-180 720 350)" className="transition-all duration-300 ease-in-out delay-150 path-0" fillOpacity="0.53" fill="url(#gradient)" strokeWidth="0" stroke="none" d="M 0,700 C 0,700 0,233 0,233 C 59.66609412572997,227.46856750257643 119.33218825145994,221.93713500515287 180,209 C 240.66781174854006,196.06286499484713 302.33734111989014,175.720027481965 378,194 C 453.66265888010986,212.279972518035 543.3184472689796,269.1827550669872 620,288 C 696.6815527310204,306.8172449330128 760.388869804191,287.54895225008585 837,272 C 913.611130195809,256.45104774991415 1003.1260735142562,244.62143593266921 1061,257 C 1118.8739264857438,269.3785640673308 1145.106836138784,305.96530401923735 1203,306 C 1260.893163861216,306.03469598076265 1350.4465819306079,269.5173479903813 1440,233 C 1440,233 1440,700 1440,700 Z"></path>
                      <path transform="rotate(-180 720 350)" className="transition-all duration-300 ease-in-out delay-150 path-1" fillOpacity="1" fill="url(#gradient)" strokeWidth="0" stroke="none" d="M 0,700 C 0,700 0,466 0,466 C 85.70594297492269,460.8663689453796 171.41188594984538,455.7327378907591 229,478 C 286.5881140501546,500.2672621092409 316.0583991755411,549.935417382343 387,551 C 457.9416008244589,552.064582617657 570.3545173479904,504.52559257986945 655,479 C 739.6454826520096,453.47440742013055 796.5235314324974,449.9622122981794 858,449 C 919.4764685675026,448.0377877018206 985.55135692202,449.62555822741325 1045,437 C 1104.44864307798,424.37444177258675 1157.271040879423,397.5355547921676 1222,400 C 1286.728959120577,402.4644452078324 1363.3644795602886,434.23222260391617 1440,466 C 1440,466 1440,700 1440,700 Z"></path>
                    </svg>
                  </button>
                </motion.div>

                <motion.div whileTap={{ scale: 0.95 }}>
                  <button 
                    type="button"
                    className="w-full h-12 rounded-2xl border-2 border-primary/10 flex items-center justify-center gap-3 font-black text-foreground opacity-50 cursor-not-allowed transition-colors"
                  >
                    <ScanFace className="h-6 w-6 text-primary" />
                    <span>الدخول بواسطة Face ID (قريباً)</span>
                  </button>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm font-black text-white">
          {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"} 
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary mr-1 underline underline-offset-4"
          >
            اضغط هنا
          </button>
        </p>
      </motion.div>
    </div>
  );
}
