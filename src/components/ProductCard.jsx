import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, TrendingDown } from 'lucide-react';

const ProductCard = () => {
    // أنيميشن ظهور العناصر داخل الكرت
    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            // حركة الظهور عند التحميل (Fade in + Slide up)
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
            }}
            // حركة الـ Hover للكرت بالكامل
            whileHover={{ y: -12, transition: { duration: 0.3, ease: "easeInOut" } }}
            className="group bg-white border border-slate-100 rounded-[2.5rem] p-5 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-shadow duration-500 flex flex-col h-[600px] relative"
        >
            {/* 1. IMAGE AREA */}
            <div className="relative h-[320px] bg-slate-50 rounded-[2rem] overflow-hidden mb-6">
                <motion.img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600" 
                    alt="Product"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                
                {/* Brand Badge with Hover Slide */}
                <motion.div 
                    whileHover={{ x: 5 }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/50 flex items-center gap-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sony</span>
                </motion.div>

                {/* Hot Deal Tag - New logic for price comparison */}
                <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <TrendingDown size={18} />
                </div>

                {/* Best Price Overlay (Animated) */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="absolute bottom-4 left-4 right-4 bg-blue-600/90 backdrop-blur-lg p-3 rounded-2xl flex justify-between items-center"
                >
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Ai Market Scan</span>
                    <ShieldCheck size={16} className="text-blue-200" />
                </motion.div>
            </div>

            {/* 2. PRODUCT INFO */}
            <div className="flex flex-col flex-grow px-2">
                <motion.h3 
                    variants={childVariants}
                    className="font-black text-2xl text-slate-900 leading-tight group-hover:text-blue-600 transition-colors mb-2"
                >
                    WH-1000XM5 <br/> Wireless Headphones
                </motion.h3>
                
                <motion.p 
                    variants={childVariants}
                    className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium italic"
                >
                    Industry-leading noise canceling with two processors and 8 microphones.
                </motion.p>

                {/* 3. PRICE SECTION */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <motion.div variants={childVariants}>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-green-500 rounded-full" /> Lowest Price
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">$349.00</span>
                            <span className="text-blue-600 font-black text-xs uppercase tracking-tighter">Live</span>
                        </div>
                    </motion.div>
                    
                    {/* Interactive Compare Button */}
                    <motion.button 
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-slate-900 text-white p-4 rounded-2xl transition-colors hover:bg-blue-600 cursor-pointer shadow-xl shadow-slate-200 hover:shadow-blue-200"
                    >
                        <ExternalLink size={20} />
                    </motion.button>
                </div>
            </div>

            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] -z-10" />
        </motion.div>
    );
};

export default ProductCard;