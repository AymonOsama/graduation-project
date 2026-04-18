import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);

    /**
     * Custom Bezier Curve: "Turbo Ease"
     * Provides a slight overshoot (anticipation) for a high-end feel.
     */
    const turboEase = [0.34, 1.56, 0.64, 1];

    return (
        <div className="hidden md:flex flex-1 justify-center px-4 max-w-lg">
            <div className="relative w-full group">
                
                {/* 1. MAIN CONTAINER (The Vessel)
                  Features a complex multi-color gradient for a high-fidelity look.
                */}
                <motion.div 
                    className="relative z-10 w-full rounded-2xl overflow-hidden shadow-2xl"
                    animate={{
                        /** * DYNAMIC GRADIENT STRATEGY:
                         * Idle: Deep Slate -> Steel Gray -> Light Ash (Metallic Look)
                         * Focused: Pure White -> Soft Sky Blue -> Crystal White (Glowing Look)
                         */
                        background: isFocused 
                            ? "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e2e8f0 100%)" 
                            : "linear-gradient(135deg, #334155 0%, #475569 45%, #94a3b8 100%)",
                        
                        scale: isFocused ? 1.04 : 1,
                        boxShadow: isFocused 
                            ? "0 20px 40px -15px rgba(59, 130, 246, 0.3)" 
                            : "0 10px 20px -5px rgba(0, 0, 0, 0.2)",
                    }}
                    transition={{ duration: 0.5, ease: turboEase }}
                >
                    {/* INPUT FIELD */}
                    <motion.input 
                        type="text"
                        placeholder="Ignite your search..."
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent outline-none text-sm font-bold py-4 pl-14 pr-4 cursor-text placeholder:tracking-widest"
                        animate={{ 
                            color: isFocused ? "#1e293b" : "#f8fafc" 
                        }}
                    />

                    {/* 2. TURBO ICON (Animated Lens)
                      Includes spin, scale, and glow effects on focus.
                    */}
                    <motion.div 
                        className="absolute left-5 top-4"
                        animate={{ 
                            scale: isFocused ? 1.25 : 1,
                            rotate: isFocused ? 360 : 0,
                            color: isFocused ? "#3b82f6" : "#f8fafc",
                            filter: isFocused ? "drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))" : "none"
                        }}
                        transition={{ 
                            rotate: { duration: 0.7, ease: turboEase },
                            scale: { duration: 0.4 },
                            default: { type: "spring", stiffness: 260, damping: 20 }
                        }}
                    >
                        <Search size={21} strokeWidth={isFocused ? 3 : 2.5} />
                    </motion.div>

                    {/* 3. THE NITRO SWEEP (Reflective Light Layer)
                      A scanning light beam that passes through the bar periodically.
                    */}
                    <AnimatePresence>
                        {isFocused && (
                            <motion.div 
                                initial={{ x: '-150%' }}
                                animate={{ x: '150%' }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                    duration: 1.2, 
                                    ease: "linear", 
                                    repeat: Infinity, 
                                    repeatDelay: 0.5 
                                }}
                                className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* 4. THE UNDERGLOW (Reactive Lighting)
                  An aesthetic beam at the bottom that pulses with color.
                */}
                <motion.div 
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full blur-[3px] z-0"
                    animate={{ 
                        width: isFocused ? "85%" : "0%",
                        opacity: isFocused ? 1 : 0,
                        backgroundColor: ["#3b82f6", "#60a5fa", "#3b82f6"] // Color cycle pulse
                    }}
                    transition={{ 
                        width: { duration: 0.4 },
                        backgroundColor: { duration: 2, repeat: Infinity }
                    }}
                />
            </div>

            {/* INLINE STYLES FOR PLACEHOLDER TRANSITIONS */}
            <style jsx>{`
                input::placeholder {
                    color: ${isFocused ? "rgba(30, 41, 59, 0.4)" : "rgba(248, 250, 252, 0.6)"};
                    transition: all 0.4s ease;
                    text-transform: uppercase;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;