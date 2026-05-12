import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Search, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Assets
import photo from '../../assets/test 1.jpg';

const Section1 = () => {
    
    // --- Animation Configs ---
    const springTransition = { type: "spring", stiffness: 100, damping: 20 };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.3 } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: springTransition 
        }
    };

    return (
        <section className="relative min-h-[700px] md:h-[850px] w-full flex items-center overflow-hidden bg-[#111827]">
            
            {/* 1. BACKGROUND LAYER (Optimized Performance) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    src={photo} 
                    alt="Hardware background" 
                    className="w-full h-full object-cover opacity-50" 
                />
                {/* Advanced Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                {/* Micro-pattern for texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            {/* 2. CONTENT LAYER */}
            <div className="container mx-auto px-6 lg:px-16 z-20 relative">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl"
                >
                    {/* Badge: Trust Indicator */}
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 md:mb-10">
                        <div className="flex -space-x-2">
                            {['B', 'I', 'S'].map((char, i) => (
                                <div key={i} className="w-9 h-9 rounded-full border-2 border-[#111827] bg-blue-600 flex items-center justify-center text-[11px] font-black text-white shadow-lg">
                                    {char}
                                </div>
                            ))}
                        </div>
                        <div className="h-4 w-[1px] bg-slate-700 mx-1" />
                        <span className="text-slate-400 text-xs md:text-sm font-bold tracking-[0.1em] uppercase">
                            Smart Comparison Engine 2026
                        </span>
                    </motion.div>

                    {/* Main Headings (Fluid Typography) */}
                    <motion.div variants={itemVariants} className="space-y-1 md:space-y-4">
                        <h1 className="text-6xl sm:text-7xl md:text-[110px] font-black text-white italic tracking-tighter leading-[0.9] mb-2">
                            Compare
                        </h1>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-blue-500 tracking-tight leading-tight">
                            Electronics Prices <span className="text-white inline-block">Instantly.</span>
                        </h2>
                    </motion.div>

                    {/* Description */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-slate-400 text-base md:text-xl max-w-xl mt-6 mb-8 md:mb-12 leading-relaxed font-medium italic opacity-90"
                    >
                        Find the best deals in seconds. We analyze thousands of hardware 
                        specs to bring you the most value for your setup.
                    </motion.p>

                    {/* Dynamic Feature List */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 md:gap-8 mb-10 md:mb-14">
                        {['Real-time tracking', 'Verified specs', 'Best Price'].map((text) => (
                            <div key={text} className="flex items-center gap-2 text-slate-200 text-xs md:text-sm font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <CheckCircle size={14} className="text-blue-500" />
                                {text}
                            </div>
                        ))}
                    </motion.div>

                    {/* Action Buttons (Responsive Layout) */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                        {/* Primary Button */}
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black flex items-center justify-center gap-3 cursor-pointer shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all"
                        >
                            <Search size={18} strokeWidth={3} /> START COMPARING
                        </motion.button>
                        
                        {/* Secondary Button (Link) */}
                        <Link to="/categories" className="w-full sm:w-auto">
                            <motion.button 
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#3b82f6" }}
                                whileTap={{ scale: 0.98 }}
                                className="cursor-pointer w-full sm:w-auto bg-white/5 border border-slate-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 backdrop-blur-md"
                            >
                                <Cpu size={20} className="text-blue-500" /> 
                                Browse Categories
                            </motion.button>
                        </Link>
                    </motion.div>

                </motion.div>
            </div>

        </section>
    );
};

export default Section1;