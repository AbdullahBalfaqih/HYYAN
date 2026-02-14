
import { 
  Trophy, 
  Star, 
  Leaf, 
  Zap, 
  ShieldCheck, 
  Coffee, 
  Ticket, 
  ShoppingBag,
  Trees,
  Dumbbell,
  Footprints,
  Trash2,
  MapPin,
  Building
} from "lucide-react";

// 1. جدول المستخدمين (UserProfiles) - 5 سجلات
export const MOCK_USERS = [
  { 
    uid: "u1", 
    name: "فهد الأحمد", 
    email: "fahad@eco.sa", 
    neighborhood: "حي الكورنيش", 
    city: "الخبر", 
    points: 2450, 
    level: 5, 
    rank: 1, 
    qualification: "بكالوريوس",
    badges: ["صديق البيئة", "بطل المشي", "خبير الفرز"]
  },
  { 
    uid: "u2", 
    name: "سارة الدوسري", 
    email: "sara@eco.sa", 
    neighborhood: "حي الحزام الذهبي", 
    city: "الخبر", 
    points: 2100, 
    level: 4, 
    rank: 2, 
    qualification: "ماجستير",
    badges: ["خبير الفرز"]
  },
  { 
    uid: "u3", 
    name: "خالد القحطاني", 
    email: "khaled@eco.sa", 
    neighborhood: "حي العقربية", 
    city: "الخبر", 
    points: 1980, 
    level: 4, 
    rank: 3, 
    qualification: "دكتوراه",
    badges: ["بطل التشجير"]
  },
  { 
    uid: "u4", 
    name: "نورة العتيبي", 
    email: "noura@eco.sa", 
    neighborhood: "حي العليا", 
    city: "الخبر", 
    points: 1780, 
    level: 3, 
    rank: 4, 
    qualification: "بكالوريوس",
    badges: ["موفر الطاقة"]
  },
  { 
    uid: "u5", 
    name: "محمد السبيعي", 
    email: "mohammed@eco.sa", 
    neighborhood: "حي الجسر", 
    city: "الخبر", 
    points: 1650, 
    level: 3, 
    rank: 5, 
    qualification: "ثانوي",
    badges: ["حارس الحي"]
  }
];

// المستخدم الحالي للتطبيق (أول سجل)
export const MOCK_USER_PROFILE = {
  ...MOCK_USERS[0],
  nextLevelPoints: 3000
};

// 2. جدول الأوسمة (Badges) - أيقونات تتناسب مع المسمى
export const MOCK_BADGES = [
  { name: "صديق البيئة", icon: Trees, color: "bg-primary/20 text-primary" },
  { name: "بطل المشي", icon: Footprints, color: "bg-primary/20 text-primary" },
  { name: "خبير الفرز", icon: Trash2, color: "bg-primary/20 text-primary" },
];

// 3. جدول التحديات المكتملة / تغذية النشاط (ChallengeEntries) - 5 سجلات
export const MOCK_ACTIVITY_FEED = [
  { name: "خالد القحطاني", neighborhood: "حي العقربية", action: "زرع شجرة سدر أمام منزله", time: "منذ ٥ د", points: 300, initial: "خ" },
  { name: "سارة الدوسري", neighborhood: "حي الحزام الذهبي", action: "أكملت تحدي المشي اليومي (١٠ كم)", time: "منذ ١٥ د", points: 100, initial: "س" },
  { name: "فهد الأحمد", neighborhood: "حي الكورنيش", action: "قام بفرز النفايات المنزلية بنجاح", time: "منذ ٣٠ د", points: 150, initial: "ف" },
  { name: "نورة العتيبي", neighborhood: "حي العليا", action: "وثقت مبادرة تنظيف الممر العام", time: "منذ ساعة", points: 200, initial: "ن" },
  { name: "محمد السبيعي", neighborhood: "حي الجسر", action: "استخدم حقائب قماشية بدلاً من البلاستيك", time: "منذ ساعتين", points: 50, initial: "م" }
];

// 4. لوحة المتصدرين (Leaderboard)
export const MOCK_LEADERBOARD = {
  individuals: {
    topThree: [
      { rank: 2, name: "سارة الدوسري", points: 2100, color: "bg-black" },
      { rank: 1, name: "فهد الأحمد", points: 2450, color: "bg-primary", winner: true },
      { rank: 3, name: "خالد القحطاني", points: 1980, color: "bg-black" },
    ],
    list: [
      { rank: 4, name: "نورة العتيبي", points: 1780, trend: 3, trendDir: 'up' },
      { rank: 5, name: "محمد السبيعي", points: 1650, trend: 1, trendDir: 'down' },
      { rank: 6, name: "إبراهيم وليد", points: 1540, trend: 2, trendDir: 'up' },
      { rank: 7, name: "منى عبدالله", points: 1420, trend: 1, trendDir: 'down' },
    ]
  },
  neighborhoods: {
    topThree: [
      { rank: 2, name: "حي الحزام الذهبي", points: 12500, color: "bg-black" },
      { rank: 1, name: "حي الكورنيش", points: 15400, color: "bg-primary", winner: true },
      { rank: 3, name: "حي الراكة الجنوبية", points: 11200, color: "bg-black" },
    ],
    list: [
      { rank: 4, name: "حي العليا", points: 9800, trend: 1, trendDir: 'up' },
      { rank: 5, name: "حي الخبر الشمالية", points: 8700, trend: 2, trendDir: 'down' },
      { rank: 6, name: "حي الجسر", points: 7600, trend: 0, trendDir: 'none' },
      { rank: 7, name: "حي البندرية", points: 6400, trend: 1, trendDir: 'up' },
    ]
  },
  cities: {
    topThree: [
      { rank: 2, name: "الدمام", points: 85400, color: "bg-black" },
      { rank: 1, name: "الخبر", points: 92100, color: "bg-primary", winner: true },
      { rank: 3, name: "القطيف", points: 78200, color: "bg-black" },
    ],
    list: [
      { rank: 4, name: "الأحساء", points: 64500, trend: 2, trendDir: 'up' },
      { rank: 5, name: "الجبيل", points: 52100, trend: 1, trendDir: 'down' },
      { rank: 6, name: "الظهران", points: 48900, trend: 0, trendDir: 'none' },
    ]
  },
  history: [
    { month: "فبراير 2024", winner: "حي الكورنيش", points: "18,200", iconId: 'trophy' },
    { month: "يناير 2024", winner: "فهد الأحمد", points: "2,850", iconId: 'star' },
    { month: "ديسمبر 2023", winner: "حي الحزام الذهبي", points: "16,400", iconId: 'leaf' },
  ]
};

// 5. جدول المكافآت (Rewards) - 5 سجلات
export const MOCK_REWARDS = [
  { 
    id: "r1", 
    title: "كوب قهوة مجاني", 
    provider: "عنوان القهوة - الخبر", 
    cost: 500, 
    icon: Coffee, 
    color: "bg-orange-100 text-orange-600",
    category: "قسيمة" 
  },
  { 
    id: "r2", 
    title: "زراعة شجرة باسمك", 
    provider: "مبادرة السعودية الخضراء", 
    cost: 1200, 
    icon: Trees, 
    color: "bg-green-100 text-green-600",
    category: "تبرع" 
  },
  { 
    id: "r3", 
    title: "خصم 20% متجر عضوي", 
    provider: "أرض الطبيعة", 
    cost: 800, 
    icon: Ticket, 
    color: "bg-blue-100 text-blue-600",
    category: "قسيمة" 
  },
  { 
    id: "r4", 
    title: "مجموعة أدوات زراعة", 
    provider: "إيكو كويست", 
    cost: 2500, 
    icon: ShoppingBag, 
    color: "bg-purple-100 text-purple-600",
    category: "منتج" 
  },
  { 
    id: "r5", 
    title: "دخول يومي للنادي", 
    provider: "وقت اللياقة", 
    cost: 1500, 
    icon: Dumbbell, 
    color: "bg-red-100 text-red-600",
    category: "قسيمة" 
  }
];

// 6. جدول البلاغات البيئية (EnvironmentalReports) - 5 سجلات
export const MOCK_RESOLVED_REPORTS = [
  { title: "تراكم نفايات شارع الأمير تركي", hood: "حي الكورنيش", status: "تمت المعالجة", time: "منذ ساعتين" },
  { title: "مخلفات بناء قرب الحديقة العامة", hood: "حي الحزام الذهبي", status: "تمت المعالجة", time: "أمس" },
  { title: "لوحة إرشادية تالفة في الممشى", hood: "حي البندرية", status: "تمت المعالجة", time: "قبل يومين" },
  { title: "تجمع مياه راكدة في الساحة", hood: "حي العقربية", status: "تمت المعالجة", time: "قبل ٣ أيام" },
  { title: "تشوه بصري (كتابات حائطية)", hood: "حي العليا", status: "تمت المعالجة", time: "قبل أسبوع" }
];

// سجلات نشاط المستخدم الشخصي
export const MOCK_USER_ACTIVITIES = [
  { title: "تم فرز النفايات بنجاح", date: "منذ ساعتين", points: "+150" },
  { title: "تحقيق هدف المشي اليومي", date: "أمس", points: "+100" },
  { title: "تقديم بلاغ بيئي معتمد", date: "قبل يومين", points: "+50" },
];

// 7. الأشجار المتبناة (AdoptedTrees)
export const MOCK_ADOPTED_TREES = [
  {
    id: "t1",
    name: "نخلة فهد",
    type: "نخلة (خلاص)",
    date: "٢٠٢٤/٠٢/١٠",
    image: "https://res.cloudinary.com/ddznxtb6f/image/upload/v1771071405/Screenshot_2026-02-14_151614_rwalj3.png",
    location: { lat: 26.4207, lng: 50.0888 }
  }
];
