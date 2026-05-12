import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center mt-20 gap-4"
    >
      {/* زر الصفحة السابقة */}
      <motion.button 
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="cursor-pointer w-14 h-14 rounded-2xl bg-white border border-slate-200 disabled:opacity-20 hover:bg-blue-50 transition-all shadow-sm flex items-center justify-center group"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </motion.button>

      {/* حاوية الأرقام */}
      <div className="flex gap-2 bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            
            // منطق اختصار الصفحات (Dots)
            if (totalPages > 5 && Math.abs(pageNum - currentPage) > 1 && pageNum !== 1 && pageNum !== totalPages) {
              if (pageNum === 2 || pageNum === totalPages - 1) {
                return (
                  <span key={`dots-${pageNum}`} className="px-2 self-center text-slate-300 font-black">
                    ...
                  </span>
                );
              }
              return null;
            }

            return (
              <motion.button
                key={pageNum}
                layout // يجعل الأرقام تتحرك بسلاسة عند تغير أماكنها
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(pageNum)}
                className={`cursor-pointer relative w-12 h-12 rounded-xl font-black transition-all text-xs z-10 ${
                  currentPage === pageNum 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {/* الخلفية المتحركة خلف الرقم النشط */}
                {currentPage === pageNum && (
                  <motion.div 
                    layoutId="activePageHighlight"
                    className="absolute inset-0 bg-slate-900 rounded-xl -z-10 shadow-xl"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                  />
                )}
                {pageNum < 10 ? `0${pageNum}` : pageNum}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* زر الصفحة التالية */}
      <motion.button 
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="cursor-pointer w-14 h-14 rounded-2xl bg-white border border-slate-200 disabled:opacity-20 hover:bg-blue-50 transition-all shadow-sm flex items-center justify-center group"
      >
        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
};

export default Pagination;