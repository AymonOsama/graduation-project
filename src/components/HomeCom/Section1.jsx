import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Assets
import photo from '../../assets/test 1.jpg';

/**
 * Section1 - Premium Dark Hero Section
 * 
 * Sophisticated dark theme with optimized visuals.
 * Focus on readability and elegant design.
 */
const Section1 = () => {
  
  // ==========================================
  // ANIMATION VARIANTS
  // ==========================================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      
      {/* ==================== BACKGROUND ==================== */}
      <div className="absolute inset-0 z-0">
        {/* Image with enhanced opacity */}
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 8, ease: "easeOut" }}
          src={photo} 
          alt="Hardware showcase" 
          className="w-full h-full object-cover" 
        />
        
        {/* Dark refined overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/60 via-slate-900/40 to-slate-600/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-slate-900/30 to-black/50" />

        {/* Animated glow accents */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent rounded-full blur-[80px] pointer-events-none"
        />
      </div>

      {/* ==================== CONTENT ==================== */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 z-20 relative w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >

          {/* ==================== BADGE ==================== */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3 mb-8 md:mb-10"
          >
            <div className="flex -space-x-2">
              {['💎', '⚡', '🎯'].map((emoji, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.2, y: -4 }}
                  className="w-10 h-10 rounded-full border-2 border-slate-800 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-base shadow-lg"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
            
            <div className="h-5 w-px bg-gradient-to-b from-slate-600 to-transparent" />
            
            <span className="text-slate-300 text-xs md:text-sm font-bold tracking-widest uppercase">
              Trusted Price Comparison Platform
            </span>
          </motion.div>

          {/* ==================== MAIN HEADLINE ==================== */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.15] tracking-tight">
              Compare Tech Prices
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent leading-[1.2] mt-2">
              In Seconds
            </h2>
          </motion.div>

          {/* ==================== DESCRIPTION ==================== */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 md:mb-12 leading-relaxed font-medium"
          >
            Find the best deals across 500+ verified retailers. Real-time price tracking, 
            detailed specs, and guaranteed lowest prices—all in one place.
          </motion.p>

          {/* ==================== FEATURE PILLS ==================== */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-3 md:gap-4 mb-12 md:mb-14"
          >
            {[
              { text: 'Real-time Tracking', icon: '📊' },
              { text: 'Verified Sources', icon: '✓' },
              { text: 'Best Prices', icon: '💰' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-200 text-xs md:text-sm font-semibold shadow-sm hover:shadow-lg hover:bg-slate-800/70 hover:border-blue-500/50 transition-all backdrop-blur-sm"
              >
                <span className="text-base">{feature.icon}</span>
                {feature.text}
              </motion.div>
            ))}
          </motion.div>

          {/* ==================== CTA BUTTONS ==================== */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-16 md:mb-20"
          >
            {/* Primary Button */}
            <Link to="/categories" className="flex-1 sm:flex-none">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 hover:from-blue-500 hover:via-blue-500 hover:to-cyan-500 text-white px-10 md:px-12 py-4 md:py-5 rounded-xl font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 border border-blue-400/20"
              >
                <Zap size={20} />
                Start Comparing
              </motion.button>
            </Link>

            {/* Secondary Button */}
            <Link to="/our-services" className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer px-10 md:px-12 py-4 md:py-5 rounded-xl border-2 border-slate-700 text-slate-200 font-bold text-base md:text-lg hover:border-blue-500 hover:text-blue-400 hover:bg-slate-800/30 transition-all flex items-center justify-center gap-3"
                >
                    
                        Learn More
                    
                  <ArrowRight size={20} />
                </motion.button>
            </Link>
          </motion.div>
          

          {/* ==================== STATISTICS ==================== */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl"
          >
            {[
              { number: '500+', label: 'Retailers' },
              { number: '10M+', label: 'Active Users' },
              { number: '24/7', label: 'Price Tracking' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </p>
                <p className="text-sm md:text-base text-slate-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
};

export default Section1;