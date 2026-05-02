"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef(null);

    /**
     * ENHANCED EASING CURVES
     */
    const turboEase = [0.34, 1.56, 0.64, 1];
    const glassEase = [0.25, 0.46, 0.45, 0.94];

    const handleClear = useCallback(() => {
        setSearchValue('');
        inputRef.current?.focus();
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('Search:', searchValue);
    }, [searchValue]);

    return (
        <div className="hidden md:flex flex-1 justify-center px-4 max-w-lg relative">
            <form onSubmit={handleSubmit} className="relative w-full group">
                
                {/* ✨ MAIN CONTAINER - Multi-Layer Enhancement */}
                <motion.div 
                    className="relative z-10 w-full rounded-2xl overflow-hidden"
                    animate={{
                        background: isFocused 
                            ? "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)" 
                            : "linear-gradient(135deg, #1e293b 0%, #334155 45%, #64748b 100%)",
                        
                        scale: isFocused ? 1.05 : 1,
                        boxShadow: isFocused 
                            ? "0 25px 50px -12px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.6)" 
                            : "0 15px 30px -8px rgba(0, 0, 0, 0.3)",
                    }}
                    transition={{ duration: 0.4, ease: turboEase }}
                >
                    {/* INPUT FIELD */}
                    <motion.input 
                        ref={inputRef}
                        type="text"
                        placeholder="Search high-end hardware..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent outline-none text-sm font-bold py-4 pl-14 pr-12 cursor-text placeholder:tracking-widest transition-colors"
                        animate={{ 
                            color: isFocused ? "#0f172a" : "#f1f5f9" 
                        }}
                    />

                    {/* 🔍 SEARCH ICON - Turbo Animation */}
                    <motion.div 
                        className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                        animate={{ 
                            scale: isFocused ? 1.35 : 1,
                            rotate: isFocused ? 360 : 0,
                            color: isFocused ? "#3b82f6" : "#cbd5e1",
                            filter: isFocused 
                                ? "drop-shadow(0 0 12px rgba(59, 130, 246, 0.7))" 
                                : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                        }}
                        transition={{ 
                            rotate: { duration: 0.8, ease: "easeInOut" },
                            scale: { duration: 0.35, ease: glassEase },
                            default: { type: "spring", stiffness: 300, damping: 25 }
                        }}
                    >
                        <Search size={20} strokeWidth={isFocused ? 3 : 2.5} />
                    </motion.div>

                    {/* ✖️ CLEAR BUTTON */}
                    <AnimatePresence>
                        {searchValue && (
                            <motion.button
                                type="button"
                                onClick={handleClear}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors p-1"
                            >
                                <X size={18} strokeWidth={3} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* 💫 NITRO SWEEP - Dynamic Light Beam */}
                    <AnimatePresence>
                        {isFocused && (
                            <motion.div 
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: '100%', opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                    duration: 1.5, 
                                    ease: "easeInOut", 
                                    repeat: Infinity, 
                                    repeatDelay: 0.8 
                                }}
                                className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm"
                            />
                        )}
                    </AnimatePresence>

                    {/* 🌊 WAVE RIPPLE BORDER */}
                    <AnimatePresence>
                        {isFocused && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-blue-400/0"
                                style={{
                                    boxShadow: "inset 0 0 0 2px rgba(59, 130, 246, 0.1)"
                                }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* 🔥 UNDERGLOW - Pulsing Base Glow */}
                <motion.div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 rounded-full blur-lg z-0"
                    animate={{ 
                        width: isFocused ? "90%" : "0%",
                        opacity: isFocused ? 1 : 0,
                        backgroundColor: ["#3b82f6", "#60a5fa", "#8b5cf6", "#3b82f6"]
                    }}
                    transition={{ 
                        width: { duration: 0.35 },
                        backgroundColor: { duration: 3, repeat: Infinity }
                    }}
                />

                {/* 🎆 TOP GLOW - Background Aura */}
                <motion.div 
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-blue-400 rounded-full blur-3xl z-0"
                    animate={{ 
                        opacity: isFocused ? 0.3 : 0,
                        scale: isFocused ? 1.2 : 0.8
                    }}
                    transition={{ duration: 0.5 }}
                />
            </form>

            <style jsx>{`
                input::placeholder {
                    color: ${isFocused ? "rgba(15, 23, 42, 0.4)" : "rgba(203, 213, 225, 0.5)"};
                    transition: color 0.4s ease;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;