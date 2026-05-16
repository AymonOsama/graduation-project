import React from 'react';
import { motion } from 'framer-motion';
// ضفت أيقونة CheckCircle2 عشان نستخدمها لما تكون بريميوم
import { TrendingUp, ShieldCheck, Zap, FileText, Crown, CheckCircle2, Star } from 'lucide-react';

const PremiumBanner = ({ isPremium, onUpgradeClick }) => {
  
  // 1. تحديد الداتا بناءً على حالة المستخدم
  const features = isPremium ? [
    { icon: <CheckCircle2 className="text-green-400" />, text: "All Tools Unlocked" },
    { icon: <Star className="text-yellow-400" fill="currentColor" />, text: "Priority AI Support" },
    { icon: <Zap className="text-blue-400" />, text: "Fastest Stock Alerts" },
    { icon: <ShieldCheck className="text-blue-400" />, text: "Exclusive Insider Deals" }
  ] : [
    { icon: <TrendingUp className="text-blue-400" />, text: "Real-time Price History" },
    { icon: <ShieldCheck className="text-blue-400" />, text: "Verified Store Scans" },
    { icon: <Zap className="text-blue-400" />, text: "Instant Flash Deals" },
    { icon: <FileText className="text-blue-400" />, text: "Detailed PDF Reports" }
  ];

  return (
    <section className="bg-slate-900 rounded-[4rem] p-8 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative border-2 border-white/5">
      
      {/* Background Glow - لإضافة لمسة فخامة لما تكون بريميوم */}
      {isPremium && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-0" />
      )}

      <div className="flex-1 space-y-10 relative z-10">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-black leading-none"
          >
            {isPremium ? (
              <span className="flex items-center gap-4">
                Premium Active <Crown className="text-yellow-400" fill="currentColor" />
              </span>
            ) : "Upgrade to Premium"}
          </motion.h2>
          <p className="text-slate-400 text-lg font-medium max-w-lg">
            {isPremium 
              ? "Welcome to the elite club! You're currently using the most powerful version of our AI shopping assistant."
              : "Gain access to advanced AI-powered comparison tools, unlimited trackers, and real-time GPU stock alerts."}
          </p>
        </div>

        {/* الـ Grid اللي هيتغير شكله */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                isPremium ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/5 border-white/5'
              }`}
            >
              {item.icon}
              <span className={`font-bold text-sm ${isPremium ? 'text-blue-100' : 'text-slate-300'}`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* الزرار يختفي لو بريميوم ويظهر مكانه رسالة شكر أو Badge */}
        {!isPremium ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onUpgradeClick}
            className="px-12 py-6 bg-blue-600 hover:bg-blue-500 rounded-3xl font-black text-xl flex items-center gap-4 shadow-2xl transition-all cursor-pointer"
          >
            Unlock Everything <Crown className="text-yellow-300" fill="currentColor" />
          </motion.button>
        ) : (
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full font-bold text-sm">
            <CheckCircle2 size={18} /> Verified Premium Account
          </div>
        )}
      </div>

      <div className="flex-1 relative w-full lg:w-auto">
         <motion.div 
           animate={isPremium ? { 
             rotate: [0, 5, -5, 0],
             scale: [1, 1.05, 1] 
           } : {}}
           transition={{ repeat: Infinity, duration: 4 }}
           className={`bg-gradient-to-tr p-12 rounded-[3rem] shadow-2xl relative z-10 border border-white/10 ${
             isPremium ? 'from-yellow-500 to-amber-600' : 'from-blue-600 to-indigo-600'
           }`}
         >
            <Crown size={64} className={`mx-auto ${isPremium ? 'text-white drop-shadow-lg' : 'text-blue-300 opacity-50'}`} fill={isPremium ? "currentColor" : "none"} />
            <p className="text-center mt-6 font-black text-lg tracking-widest">
              {isPremium ? 'V.I.P' : 'FREE TIER'}
            </p>
         </motion.div>
      </div>
    </section>
  );
};

export default PremiumBanner;