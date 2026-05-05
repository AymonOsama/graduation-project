import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// استيراد الأيقونات اللازمة من مكتبة Font Awesome
import { 
  FaMicrochip, FaVideo, FaMobileAlt, FaLaptop, FaCamera, 
  FaHdd, FaTv, FaMemory, FaHeadphones, FaMouse, FaKeyboard, 
  FaMicrophone, FaGamepad, FaServer, FaFan, FaDesktop
} from 'react-icons/fa';

const Categories = () => {
  // مصفوفة البيانات: تحتوي على كل تفاصيل الأقسام (الاسم، الأيقونة، العدد، الألوان، والتاغ)
  const categories = [
    { name: "Processors", icon: FaMicrochip, count: "120+", color: "from-blue-600 to-cyan-500", tag: "High-End" },
    { name: "Graphics Cards", icon: FaVideo, count: "85+", color: "from-purple-600 to-pink-500", tag: "RTX / RX" },
    { name: "RAM Memory", icon: FaMemory, count: "130+", color: "from-red-600 to-rose-600", tag: "DDR5" },
    { name: "Motherboards", icon: FaServer, count: "95+", color: "from-slate-700 to-slate-900", tag: "Z790 / X670" },
    { name: "Laptops", icon: FaLaptop, count: "210+", color: "from-amber-500 to-orange-600", tag: "Gaming" },
    { name: "Smartphones", icon: FaMobileAlt, count: "450+", color: "from-emerald-500 to-teal-600", tag: "Latest" },
    { name: "Storage (SSD)", icon: FaHdd, count: "300+", color: "from-cyan-500 to-blue-500", tag: "Gen 5" },
    { name: "Monitors", icon: FaTv, count: "75+", color: "from-indigo-500 to-purple-600", tag: "OLED / IPS" },
    { name: "Cooling & Fans", icon: FaFan, count: "115+", color: "from-sky-400 to-blue-400", tag: "Liquid" },
    { name: "PC Cases", icon: FaDesktop, count: "60+", color: "from-zinc-700 to-zinc-900", tag: "E-ATX" },
    { name: "Gaming Mice", icon: FaMouse, count: "180+", color: "from-green-500 to-emerald-600", tag: "Lightspeed" },
    { name: "Keyboards", icon: FaKeyboard, count: "140+", color: "from-pink-600 to-rose-500", tag: "Custom" },
    { name: "Headsets", icon: FaHeadphones, count: "220+", color: "from-violet-500 to-purple-500", tag: "Spatial" },
    { name: "Microphones", icon: FaMicrophone, count: "45+", color: "from-red-500 to-orange-500", tag: "XLR" },
    { name: "Consoles", icon: FaGamepad, count: "35+", color: "from-blue-800 to-indigo-900", tag: "Next-Gen" },
    { name: "Cameras", icon: FaCamera, count: "55+", color: "from-orange-500 to-yellow-500", tag: "Mirrorless" },
  ];

  // إعدادات Framer Motion للحاوية الكبيرة (تأثير ظهور العناصر بالتدريج)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 } // كل عنصر يظهر بعد التاني بـ 0.05 ثانية
    }
  };

  // إعدادات ظهور كل كارت على حدة
  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // يبدأ شفاف ومنخفض قليلاً
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] py-24 px-8 relative overflow-hidden">
      
      {/* عناصر خلفية جمالية (Blobs) تعطي لمسة عصرية */}
      <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-blue-100/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-purple-100/40 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header: عنوان الصفحة والوصف */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
              Premium Hardware
            </span>
            <h1 className="text-6xl md:text-7xl font-[1000] text-slate-900 tracking-tight leading-none">
              Explore <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-300 to-purple-300">
                Categories
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-400 font-medium text-lg max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-slate-200 px-4"
          >
            Curated selection of the world's most powerful tech components.
          </motion.p>
        </div>

        {/* شبكة الأقسام (Grid System) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            
            /* 
               تحويل الاسم لرابط صديق للمتصفح (Slug):
               مثال: "Graphics Cards" تصبح "graphics-cards"
            */
            const urlSlug = cat.name.toLowerCase().replace(/\s+/g, '-');

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -12, transition: { duration: 0.2 } }} // تأثير الارتفاع عند تمرير الماوس
                className="group cursor-pointer"
              >
                {/* 
                   استخدام Link هنا لضمان أن الكارت بالكامل ينقلك لصفحة التفاصيل.
                   المسار ديناميكي بناءً على الـ slug اللي عملناه فوق.
                */}
                <Link to={`/CategoriesPgPd/${urlSlug}`}>
                  <div className="h-full bg-white/70 backdrop-blur-md rounded-[2.5rem] p-9 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500 relative overflow-hidden">
                    
                    {/* نمط شبكي خفيف يظهر عند الـ Hover فقط */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
                      <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#grid-pattern)" /></svg>
                    </div>

                    {/* حاوية الأيقونة مع تأثير التوهج الخلفي (Glow) */}
                    <div className="relative mb-10">
                      <motion.div 
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-2xl relative z-10`}
                      >
                        <Icon size={28} />
                      </motion.div>
                      {/* الطبقة اللي بتعمل الـ Glow تحت الأيقونة */}
                      <div className={`absolute inset-0 blur-2xl opacity-40 ${cat.color.split(' ')[0]} rounded-full`} />
                    </div>

                    {/* نصوص الكارت */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                          {cat.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {/* التاغ (مثل High-End أو DDR5) */}
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">
                          {cat.tag}
                        </span>
                        {/* عدد المنتجات */}
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                          {cat.count} Items
                        </p>
                      </div>
                    </div>

                    {/* زر "View Specs" الذي يتحرك للأعلى عند تمرير الماوس */}
                    <div className="mt-8 overflow-hidden">
                      <motion.div 
                        className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-tighter transition-all"
                        initial={{ y: 40 }} // مختفي للأسفل
                        whileHover={{ x: 5 }} // يتحرك لليمين قليلاً عند الـ Hover
                        animate={{ y: 0 }} // يظهر في مكانه الطبيعي
                      >
                        View Specs <span className="text-blue-600">→</span>
                      </motion.div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* تعريف الـ Pattern المستخدم في الخلفية (SVG Definition) */}
      <svg className="hidden">
        <defs>
          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
      </svg>
    </div>
  );
};

export default Categories;