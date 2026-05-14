import React from 'react';
import ProductCard from '../ProductCard';
import { SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGrid = ({ loading, products, resetFilters }) => {
  
  // أنيميشن الحاوية الأساسية لتنسيق ظهور الكروت واحد ورا التاني
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // كل كارت يتأخر عن اللي قبله بـ 0.1 ثانية
      }
    }
  };

  // أنيميشن الكارت الواحد
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white rounded-[2.5rem] h-[400px] animate-pulse border border-slate-100 shadow-sm" 
          />
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {products.length === 0 ? (
        <motion.div 
          key="empty"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-center py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-sm px-6"
        >
           <motion.div 
             initial={{ rotate: -10 }}
             animate={{ rotate: 10 }}
             transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}
             className="bg-slate-50 p-8 rounded-full mb-6"
           >
             <SearchX size={56} className="text-slate-300" />
           </motion.div>
           
           <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-2">Zero matches found</h3>
           <p className="text-slate-400 font-bold text-sm max-w-xs mx-auto">We couldn't find any products matching your current discovery settings.</p>
           
           <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetFilters}
            className="mt-10 text-white font-black text-[11px] uppercase tracking-[0.2em] px-12 py-5 bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-100"
           >
             Reset All Filters
           </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          key="grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants} layout>
              <ProductCard product={product} /> 
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductGrid;