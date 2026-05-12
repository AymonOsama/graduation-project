import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Sparkles, ArrowUpRight, Zap } from 'lucide-react';

const Section3 = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  // 1. البيانات الافتراضية (Fallback Data)
  const defaultAds = [
    { id: 0, storeName: "TechFix", title: "Professional Gaming Maintenance", desc: "Keep your high-performance gear running at peak efficiency with our specialized care.", cta: "Explore Services", mainIcon: "💻", colors: "from-blue-600 to-indigo-900", stats: "500+ Happy Clients" },
    { id: 1, storeName: "GamerZone", title: "Next-Gen PC Builds", desc: "Custom-built rigs designed for ultimate performance and stunning aesthetics.", cta: "Build Your PC", mainIcon: "🎮", colors: "from-rose-600 to-red-900", stats: "1000+ Units Sold" },
    { id: 2, storeName: "iCloud Egypt", title: "The Ultimate Apple Experience", desc: "Get the latest Apple products with flexible payment plans and official warranty.", cta: "Browse Offers", mainIcon: "📱", colors: "from-amber-500 to-orange-800", stats: "0% Installments Available" }
  ];

  const [ads, setAds] = useState(defaultAds);

  // 2. نظام الفقاعات (Bubble System Logic) - تم إضافته لإصلاح الخطأ
  const bubbles = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      blurAmount: Math.random() * 4 + 2
    })), []);

  // 3. سحب البيانات من الـ Dashboard
  useEffect(() => {
    const savedAds = localStorage.getItem('site_adverts');
    if (savedAds) {
      try {
        const parsedAds = JSON.parse(savedAds);
        const adsArray = [
          { id: 0, ...defaultAds[0], ...parsedAds.slot_1 },
          { id: 1, ...defaultAds[1], ...parsedAds.slot_2 },
          { id: 2, ...defaultAds[2], ...parsedAds.slot_3 }
        ];
        setAds(adsArray);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    }
  }, []);

  const current = ads[active] || defaultAds[0];

  // 4. Auto Rotation Logic
  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => setActive(prev => (prev + 1) % ads.length), 5500);
    return () => clearInterval(timer);
  }, [auto, ads.length]);

  // 5. NAVIGATION
  const navigate = (direction) => {
    setAuto(false);
    setActive(prev => (prev + direction + ads.length) % ads.length);
  };

  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center ltr">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* ==================== HEADER ==================== */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-blue-500/10 backdrop-blur-md rounded-full border border-blue-500/30 mb-6 sm:mb-8">
            <Zap size={16} className="text-blue-400 animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-blue-300 uppercase tracking-widest">Partners in Success</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Trusted Stores <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Handpicked</span> For You
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
            Discover the best specialized and reliable stores offering premium services and competitive prices
          </p>
        </motion.div>

        {/* ==================== MAIN CAROUSEL ====================*/}
        <motion.div 
          layout
          className={`relative rounded-2xl sm:rounded-3xl md:rounded-[3.5rem] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden shadow-2xl bg-gradient-to-br ${current.colors} transition-all duration-1000`}
        >
          
          {/* ==================== BUBBLE SYSTEM ==================== */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className="absolute rounded-full bg-white"
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  filter: `blur(${bubble.blurAmount}px)`,
                }}
                animate={{ 
                  x: [
                    bubble.x + '%',
                    (bubble.x + (Math.random() * 40 - 20)) + '%',
                    bubble.x + '%'
                  ],
                  y: [
                    bubble.y + '%',
                    (bubble.y - 40) + '%',
                    bubble.y + '%'
                  ],
                  scale: [1, 1.2, 1],
                  opacity: [bubble.opacity * 0.5, bubble.opacity, bubble.opacity * 0.5]
                }}
                transition={{ 
                  duration: bubble.duration, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: bubble.delay 
                }}
              />
            ))}
          </div>

          {/* ==================== CONTENT GRID ==================== */}
          <div className="relative z-10 w-full grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 p-4 sm:p-8 md:p-12 lg:p-24 items-center">
            
            {/* ==================== LEFT CONTENT ==================== */}
            <div className="text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 sm:space-y-8 md:space-y-10"
                >
                  {/* Store Badge */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 sm:gap-4"
                  >
                    <span className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase border border-white/30 whitespace-nowrap">
                      Featured Store
                    </span>
                    <div className="hidden sm:block h-[2px] w-8 sm:w-12 bg-gradient-to-r from-white/50 to-transparent" />
                  </motion.div>

                  {/* Store Name */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-2 sm:space-y-4"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 text-blue-200 text-xs sm:text-sm font-bold uppercase tracking-widest">
                      <Sparkles size={14} className="text-yellow-300 flex-shrink-0" />
                      <span className="truncate">{current.storeName}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight">
                      {current.title}
                    </h1>
                  </motion.div>

                  {/* Stats */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 sm:gap-4 flex-wrap"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-yellow-400 text-slate-900 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm flex-shrink-0">
                      <Star size={14} fill="currentColor" />
                      4.9/5
                    </div>
                    <div className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-bold border border-white/30">
                      ✓ {current.stats}
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 leading-relaxed"
                  >
                    {current.desc}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 sm:pt-6"
                  >
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 sm:gap-3 bg-white text-slate-900 px-6 sm:px-10 py-3 sm:py-5 rounded-lg sm:rounded-2xl font-black text-sm sm:text-lg shadow-2xl hover:shadow-3xl hover:bg-blue-50 transition-all w-full sm:w-auto justify-center sm:justify-start"
                    >
                      {current.cta}
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowUpRight size={18} className="sm:w-[22px] sm:h-[22px]" />
                      </motion.div>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ==================== RIGHT VISUAL ==================== */}
            <div className="flex justify-center items-center relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-full lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Main Icon */}
                  <motion.div
                    animate={{ 
                      y: [0, -40, 0],
                      rotate: [0, 8, -8, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[100px] sm:text-[150px] md:text-[200px] lg:text-[300px] filter drop-shadow-2xl flex-shrink-0"
                  >
                    {current.mainIcon}
                  </motion.div>

                  {/* Floating Accent Elements */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl sm:text-3xl md:text-4xl lg:text-6xl"
                      animate={{
                        y: [0, -80, 0],
                        x: [0, Math.cos(i * 2.09) * 120, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.4, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: "easeInOut"
                      }}
                      style={{
                        top: `${15 + i * 35}%`,
                        left: `${25 + i * 25}%`
                      }}
                    >
                      {['⭐', '💎', '🔥'][i]}
                    </motion.div>
                  ))}

                  {/* Glow Effects */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/30 rounded-full blur-[100px] -z-10"
                    style={{ width: '300px', height: '300px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ==================== CONTROLS ==================== */}
          <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 md:right-12 lg:translate-x-0 z-30 flex items-center gap-4 sm:gap-6 md:gap-8 bg-white/10 backdrop-blur-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 rounded-full border border-white/20">
            
            {/* Indicator Dots */}
            <div className="flex gap-2 sm:gap-3">
              {ads.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setActive(i); setAuto(false); }}
                  animate={{
                    width: i === active ? 24 : 8,
                    backgroundColor: i === active ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.35)'
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 sm:h-2.5 rounded-full hover:bg-white/60 transition-all cursor-pointer"
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-1 sm:gap-2 border-l border-white/20 pl-4 sm:pl-6 md:pl-8">
              <motion.button 
                whileHover={{ scale: 1.15, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)}
                className="p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all flex-shrink-0"
              >
                <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(1)}
                className="p-2 sm:p-3 rounded-full bg-white text-slate-900 hover:bg-blue-100 transition-all font-bold flex-shrink-0"
              >
                <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]" />
              </motion.button>
            </div>
          </div>

        </motion.div>
        
      </div>
    </section>
  );
};

export default Section3;