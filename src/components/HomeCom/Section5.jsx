import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';

const Section5 = ({ 
  premiumPartners: propsPartners, 
  SponserAdvert: propsSponser 
}) => {
  
  // 1. إعداد الحالة (State) للبيانات
  const [data, setData] = useState({
    partners: propsPartners || [],
    spotlight: propsSponser ? propsSponser[0] : null
  });

  // 2. سحب البيانات من الـ LocalStorage إذا لم توجد Props (مثل حالة صفحة Home)
  useEffect(() => {
    if (!propsPartners) {
      const saved = localStorage.getItem('site_partners_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({
          partners: parsed.partners || [],
          spotlight: parsed.spotlight || null
        });
      } else {
        // بيانات افتراضية أولية في حال لم يتم ضبط الإعدادات بعد
        setData({
          partners: [
            { id: 1, name: 'NVIDIA', category: 'Ray-Tracing Pioneers', icon: '🎮', tier: 'Strategic Partner', offer: 'Founders Edition Stock Only Here' },
            { id: 2, name: 'ASUS ROG', category: 'Extreme Performance', icon: '⚡', tier: 'Elite Partner', offer: 'Exclusive ROG Member Pricing' },
            { id: 3, name: 'INTEL', category: 'Architecture Innovation', icon: '💻', tier: 'Global Partner', offer: 'Priority Gen-14 Access' },
          ],
          spotlight: {
            name: 'Samsung Odyssey G9',
            role: 'Official Display Partner',
            headline: 'Redefine Your Visual',
            lastWordofHeadline: 'Horizon.',
            desc: "Experience the world's first dual UHD gaming monitor. Get a $200 Instant Rebate.",
            initials: 'S',
            badgeText: 'Limited Stock',
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000'
          }
        });
      }
    } else {
      // تحديث البيانات فوراً إذا تغيرت في الـ Editor
      setData({
        partners: propsPartners,
        spotlight: propsSponser ? propsSponser[0] : null
      });
    }
  }, [propsPartners, propsSponser]);

  const finalPartners = data.partners;
  const finalSpotlight = data.spotlight;

  // --- 3. حالة عدم وجود بيانات (Empty State) ---
  if (!finalPartners || finalPartners.length === 0) {
    return (
      <section className="py-24 bg-[#001220] text-center border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-20 rounded-[40px] border border-dashed border-white/10"
        >
          <div className="text-6xl mb-6 opacity-20">🔗</div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">No Partnership Data Available</h2>
          <p className="text-slate-500 max-w-md mx-auto font-light">
            We are currently updating our authorized brand network. Please check back later for exclusive hardware deals.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 bg-[#001220] overflow-hidden font-sans select-none text-left" dir="ltr">
      
      {/* --- عناصر الديكور الخلفية --- */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-white/[0.02] -skew-x-12 translate-x-20 z-0 hidden lg:block" />
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-[80px] md:blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- رأس القسم (Section Header) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8 border-b border-white/5 pb-10 md:pb-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-[1px] w-8 bg-blue-500" />
              <span className="text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.3em]">Official Brand Network</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Premium <span className="text-blue-500">Hardware</span> <br className="hidden md:block"/>Partnerships
            </h2>
          </div>
          <div className="w-full md:w-1/3 text-left md:text-right">
            <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">
              Direct access to authorized global manufacturers for guaranteed authenticity and performance.
            </p>
          </div>
        </div>

        {/* --- أولاً: شبكة بطاقات الشركات (Brands Grid) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {finalPartners.map((brand) => (
            <motion.div
              key={brand.id}
              whileHover={{ y: -8 }}
              className="group relative bg-[#001f35] rounded-[24px] md:rounded-[32px] border border-white/5 p-6 md:p-8 transition-all duration-500 hover:bg-[#002a4a] hover:shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase tracking-widest">{brand.tier}</span>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill={i < 4 ? "#3b82f6" : "none"} stroke="#3b82f6" />
                    ))}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-blue-500/20 transition-colors cursor-pointer">
                  <CheckCircle2 size={16} className="text-slate-500 group-hover:text-blue-400" />
                </div>
              </div>

              <div className="text-center mb-8 md:mb-10">
                <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">{brand.icon}</div>
                <h3 className="text-2xl md:text-3xl font-black text-white">{brand.name}</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">{brand.category}</p>
              </div>

              <div className="bg-black/20 rounded-xl md:rounded-2xl p-3 md:p-4 mb-6">
                <p className="text-blue-100 text-xs md:text-sm font-bold text-center italic">{brand.offer}</p>
              </div>

              <button className="w-full py-3 md:py-4 bg-white text-[#001220] rounded-xl md:rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                Shop Brand <ArrowUpRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* --- ثانياً: قسم الإعلان المميز (Sponsored Spotlight) --- */}
        {finalSpotlight && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[32px] md:rounded-[40px] overflow-hidden bg-blue-600 p-[1px] shadow-2xl"
          >
            <div className="bg-[#001f35] rounded-[31px] md:rounded-[39px] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              
              <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2">
                <div className="px-2 md:px-3 py-1 rounded-full bg-blue-500 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest cursor-default">
                  Featured Deal
                </div>
                <span className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">Sponsored Spotlight</span>
              </div>

              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-xl md:text-2xl font-bold text-white border border-white/10">
                    {finalSpotlight.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg md:text-xl">{finalSpotlight.name}</h4>
                    <p className="text-blue-400 text-[10px] md:text-xs font-bold">{finalSpotlight.role}</p>
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6">
                  {finalSpotlight.headline} <span className="text-blue-500 italic">{finalSpotlight.lastWordofHeadline}</span>
                </h3>
                <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
                  {finalSpotlight.desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a target='_blank' rel="noreferrer" href={finalSpotlight.link || "#"} className="px-8 py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 cursor-pointer text-center">
                    Claim Offer Now <ShoppingBag size={18} />
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2 w-full aspect-video rounded-2xl md:rounded-3xl bg-black/40 border border-white/5 relative overflow-hidden group">
                 <img 
                   src={finalSpotlight.image} 
                   alt={finalSpotlight.name} 
                   className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#001220] via-transparent to-transparent pointer-events-none" />
                 <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-blue-600 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl shadow-xl">
                    <p className="text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest">{finalSpotlight.badgeText}</p>
                 </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- ثالثاً: شعارات الشركاء السريعة --- */}
        <div className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-16 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          {['CORSAIR', 'MSI', 'GIGABYTE', 'RAZER', 'LOGITECH', 'KINGSTON'].map((logo) => (
            <span key={logo} className="text-base md:text-xl font-black text-white tracking-tighter cursor-pointer transition-colors hover:text-blue-500">
              {logo}
            </span>
          ))}
        </div>

        {/* --- تذييل القسم --- */}
        <div className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-slate-500 text-xs md:text-sm font-medium">
            Want to showcase your hardware to 250k+ monthly enthusiasts?
          </p>
          <a href="/contact" className="group flex items-center gap-2 text-white font-black text-[10px] md:text-xs uppercase tracking-widest hover:text-blue-400 transition-colors cursor-pointer">
            Become a Partner <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Section5;