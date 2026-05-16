import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// 1. استيراد الـ Hook السحري بتاعنا
import { useAuth } from '../context/AuthContext'; 

// استيراد البيانات والمكونات
import servicesData from "../data/servicesData.json";
import ServiceCard from '../components/OurServicesCom/ServiceCard';
import UpgradeModal from '../components/UpgradeModal';
import PremiumBanner from '../components/OurServicesCom/PremiumBanner';

const OurServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  // 2. سحب البيانات من الـ Context (دلوقتي isPremium هتبقى True لـ Ayman)
  const { currentUser, isPremium, loading } = useAuth();

  // 3. حالة التحميل
  if (loading) return null;

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100">
      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest"
        >
          <Star size={14} fill="currentColor" /> 
          {/* الترحيب باسم اليوزر الحقيقي من الـ JSON */}
          {isPremium 
            ? `Welcome Back, ${currentUser?.firstName || 'Partner'}` 
            : "Premium Shopping Assistant"}
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
          Smart Tools for <br/>
          <span className="text-blue-600 italic underline decoration-blue-100">Serious Shoppers</span>
        </h1>
        
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Everything you need to find the best deals, compare high-end hardware, and save hundreds of dollars with AI power.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-24 pb-32">
        
        {/* شبكة الخدمات - 6 خدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {servicesData.map((_, index) => (
            <ServiceCard 
              key={index} 
              idx={index} 
              activeService={activeService} 
              setActiveService={setActiveService} 
            />
          ))}
        </div>

        {/* البانر دلوقتي هيظهر بشكل الـ VIP لأن isPremium بـ true */}
        <PremiumBanner 
          isPremium={isPremium} 
          onUpgradeClick={() => setIsUpgradeOpen(true)} 
        />

        {/* القسم ده هيختفي تماماً عند أيمن وأي حد بريميوم */}
        {!isPremium && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 border-t border-slate-100"
          >
            <h3 className="text-3xl font-black text-slate-900 mb-8">Ready to shop smarter?</h3>
            <button 
              onClick={() => setIsUpgradeOpen(true)} 
              className="group text-blue-600 font-black text-lg hover:gap-4 flex items-center justify-center mx-auto transition-all cursor-pointer"
            >
              View all premium benefits 
              <span className="ml-2 group-hover:translate-x-2 transition-transform">&rarr;</span>
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default OurServices;