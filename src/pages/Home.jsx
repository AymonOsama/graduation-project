import React from 'react';

// ----------------------------------------------------------------------
// SECTIONS COMPONENTS
// شيلنا ProductCard من هنا لأنه خلاص مستخدم جوه Section2
import Section1 from '../components/HomeCom/Section1';
import Section2 from '../components/HomeCom/Section2';
// لو عندك موشن عايز تضيفه للسكاشن من بره استدعي motion
import { motion } from 'framer-motion'; 

// ----------------------------------------------------------------------
const Home = () => {
    return (
        <div className="flex flex-col bg-white">
            
            {/* --- SECTION 1: HERO (Dark & Dynamic) --- */}
            <Section1 />

            {/* --- SECTION 2: FEATURED PRODUCTS --- */}
            {/* تأكد إن Section2 جواه الـ Import بتاع ProductCard */}
            <Section2 />

            {/* --- SECTION 3: PROMO BANNER --- */}
            <section className="container mx-auto px-6 md:px-12 mb-24">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                    className="relative rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-900 h-[450px] overflow-hidden flex items-center shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20" />
                    
                    <div className="px-8 md:px-20 z-10 text-center md:text-left w-full md:w-2/3">
                        <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold mb-6 uppercase tracking-widest">
                            Limited Time Offer
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                            UP TO 30% OFF <br/>
                            <span className="text-blue-300">STEELSERIES</span>
                        </h2>
                        <p className="text-blue-100/80 text-lg md:text-xl mb-10 max-w-md">
                            Upgrade your gaming arsenal with world-class peripherals.
                        </p>
                        <button className="bg-white text-blue-700 px-12 py-5 rounded-2xl font-black hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-2xl cursor-pointer uppercase tracking-tighter">
                            Claim Offer Now
                        </button>
                    </div>
                    
                    <div className="hidden lg:block absolute right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
                </motion.div>
            </section>

            {/* --- SECTION 4: BRANDS --- */}
            <section className="bg-slate-50 py-24 border-y border-slate-100">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mb-16">
                        OFFICIAL PARTNERS & BRANDS
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-50 hover:grayscale-0 transition-all duration-700">
                        {['NVIDIA', 'ASUS', 'RAZER', 'MSI', 'INTEL'].map((brand) => (
                            <div key={brand} className="text-3xl md:text-4xl font-black text-slate-400 hover:text-blue-600 transition-colors cursor-default select-none uppercase italic tracking-tighter">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
        
        

    );
};

export default Home;