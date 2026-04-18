import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Search, CheckCircle } from 'lucide-react';

// Importing your specific asset
import photo from '../../assets/test 1.jpg';

const Section1 = () => {
    
    // Spring physics for that snappy, premium feel
    const springTransition = { type: "spring", stiffness: 100, damping: 20 };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: springTransition
        }
    };

    return (
        <section className="relative h-[650px] md:h-[850px] flex items-center overflow-hidden bg-[#111827]">
            
            {/* 1. BACKGROUND - Deep & Clear */}
            <div className="absolute inset-0 z-0">
                <motion.img 
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 15, ease: "easeOut" }}
                    src={photo} 
                    alt="Hero Hardware" 
                    className="w-full h-full object-cover opacity-60" 
                />
                {/* Gradient Masks */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
            </div>

            {/* 2. CONTENT LAYER */}
            <div className="container mx-auto px-6 md:px-12 z-20 relative">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl"
                >
                    {/* New Badge: Trust Indicator */}
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111827] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                    {i === 1 ? 'B' : i === 2 ? 'I' : 'S'}
                                </div>
                            ))}
                        </div>
                        <span className="text-slate-400 text-sm font-medium tracking-wide border-l border-slate-700 pl-3">
                            Smart Comparison Engine 2026
                        </span>
                    </motion.div>

                    {/* Main Heading from Image */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <h1 className="text-7xl md:text-[100px] font-black text-white italic tracking-tighter leading-none mb-4">
                            Compare
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-500 tracking-tight">
                            Electronics Prices <span className="text-white">Instantly.</span>
                        </h2>
                    </motion.div>

                    {/* Enhanced Description based on your text */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-slate-400 text-lg md:text-xl max-w-xl mt-6 mb-10 leading-relaxed italic"
                    >
                        Find the best deals in seconds. We analyze thousands of hardware 
                        specs to bring you the most value for your setup.
                    </motion.p>

                    {/* Dynamic Feature List (Added for "Simple & Professional" vibe) */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mb-12">
                        {['Real-time tracking', 'Verified specs', 'Best Price Guarantee'].map((text) => (
                            <div key={text} className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                                <CheckCircle size={16} className="text-blue-500" />
                                {text}
                            </div>
                        ))}
                    </motion.div>

                    {/* Action Buttons with snappy hover */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 cursor-pointer shadow-2xl shadow-blue-900/40 transition-all"
                        >
                            <Search size={20} /> START COMPARING
                        </motion.button>
                        
                        <motion.button 
                            whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
                            className="bg-white/5 border border-slate-700 text-white px-10 py-5 rounded-2xl font-bold transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
                        >
                            <Cpu size={20} className="text-blue-500" /> Browse Components
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Subtle Overlay Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
        </section>
    );
};

export default Section1;