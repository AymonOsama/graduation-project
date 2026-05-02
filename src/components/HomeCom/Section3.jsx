import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Award } from 'lucide-react';

// Accelerated animation variants for text
const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const Section3 = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  const offers = [
    { id: 0, cat: "HEADPHONES", brand: "STEELSERIES", disc: "30% OFF", desc: "Wireless noise-cancelling headset", img: "🎧", grad: "from-blue-600 to-indigo-900", badge: "bg-blue-500/40" },
    { id: 1, cat: "GRAPHICS", brand: "NVIDIA RTX 4090", disc: "25% OFF", desc: "Next-gen ray tracing performance", img: "🖥️", grad: "from-purple-600 to-pink-900", badge: "bg-purple-500/40" },
    { id: 2, cat: "SMARTPHONE", brand: "IPHONE 15 PRO", disc: "20% OFF", desc: "Titanium design with A17 chip", img: "📱", grad: "from-amber-600 to-orange-900", badge: "bg-amber-500/40" },
  ];

  const current = offers[active];

  // Faster Auto-slide interval
  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => setActive(prev => (prev + 1) % offers.length), 3500);
    return () => clearInterval(timer);
  }, [auto, offers.length]);

  const navigate = (dir) => { setAuto(false); setActive(prev => (prev + dir + offers.length) % offers.length); };

  return (
    <section className="container mx-auto px-4 md:px-12 mb-24 relative z-10">
      <motion.div className={`relative rounded-[3rem] bg-gradient-to-br ${current.grad} min-h-[500px] overflow-hidden flex items-center shadow-2xl transition-all duration-300`}>
        
        {/* Background Decorative Skew */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-20" />
        </div>

        <div className="relative z-10 w-full grid md:grid-cols-2 gap-8 p-8 md:p-16">
          {/* Left Side: Content */}
          <div className="flex flex-col justify-center text-white">
            <motion.div key={`ui-${active}`} {...fadeInUp} className={`flex items-center gap-2 w-fit px-4 py-2 ${current.badge} rounded-full mb-6 backdrop-blur-md`}>
              <Zap size={14} className="animate-pulse text-yellow-300" />
              <span className="text-[10px] font-bold tracking-widest uppercase italic">Flash Sale</span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
                <p className="text-white/60 font-black tracking-[0.2em] text-xs mb-2">{current.cat}</p>
                <h2 className="text-5xl lg:text-7xl font-black leading-none mb-4 tracking-tighter uppercase">{current.disc}<br/><span className="text-2xl text-white/80">{current.brand}</span></h2>
                <p className="text-white/70 text-lg mb-8 max-w-sm">{current.desc}</p>
              </motion.div>
            </AnimatePresence>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-black px-8 py-4 rounded-xl font-black flex items-center gap-3 w-fit shadow-xl uppercase text-sm group">
              Order Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right Side: Fast Icon Swap & Max Density Particles */}
          <div className="flex flex-col items-center justify-center relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={active} 
                className="relative flex items-center justify-center w-full h-full perspective"
                initial={{ scale: 1.5, opacity: 0, rotateY: 90 }} 
                animate={{ scale: 1, opacity: 1, rotateY: 0 }} 
                exit={{ scale: 0.5, opacity: 0, rotateY: -90 }} 
                transition={{ duration: 0.2, ease: "circOut" }} // Ultra fast graphical swap
              >
                {/* Product Icon (Emoji) */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[150px] md:text-[200px] drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                >
                  {current.img}
                </motion.div>

                {/* --- Max Density & Fast Particles --- */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-white/30 rounded-full blur-[1px] z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.9, 0], 
                      scale: [0.2, 1.2, 0.5],
                      // Spread over a much larger area
                      x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 450], 
                      y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 400] 
                    }}
                    transition={{ 
                      duration: 1 + Math.random() * 0.5, // Faster particle life
                      repeat: Infinity, 
                      delay: Math.random() * 0.3,
                      ease: "linear"
                    }}
                    style={{ 
                      width: `${3 + Math.random() * 7}px`, 
                      height: `${3 + Math.random() * 7}px`,
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 mt-12 z-30">
              <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 cursor-pointer">←</button>
              <div className="flex gap-2">
                {offers.map((_, i) => (
                  <div key={i} onClick={() => {setActive(i); setAuto(false);}} className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${i === active ? "bg-white w-8" : "bg-white/20 w-2"}`} />
                ))}
              </div>
              <button onClick={() => navigate(1)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 cursor-pointer">→</button>
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-8 right-8 flex items-center gap-2 bg-yellow-400/20 px-4 py-2 rounded-full border border-yellow-400/30 backdrop-blur-sm z-30"
        >
          <Award size={14} className="text-yellow-400" />
          <span className="text-yellow-100 font-bold text-[10px]">EXCLUSIVE ACCESS</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Section3;