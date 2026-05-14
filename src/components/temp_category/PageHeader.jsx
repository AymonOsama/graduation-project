import React from 'react';
import { ChevronRight, LayoutGrid, Filter, ArrowUpDown, ChevronDown, TrendingDown, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PageHeader = ({ urlSlug, formatTitle, totalProducts, setIsSidebarOpen, isSortOpen, setIsSortOpen, sortBy, setSortBy, getSortLabel }) => {
  
  // أنيميشن للحاوية الكبيرة (تنسيق ظهور الأبناء)
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1, ease: "easeOut" }
    }
  };

  // أنيميشن للعناصر الفردية
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-10"
    >
      {/* Breadcrumbs */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
        <span className="hover:text-blue-600 cursor-pointer transition-colors"><Link to="/">Home</Link></span>
        <ChevronRight size={12} />
        <span className="text-gray-900"><Link to="/categories">Collections</Link></span>
        <ChevronRight size={12} />
        <motion.span 
          layoutId="activeCategory"
          className="text-blue-600"
        >
          {formatTitle(urlSlug)}
        </motion.span>
      </motion.div>

      {/* Header Card */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div className="flex items-center gap-5">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 cursor-pointer"
          >
            <LayoutGrid size={28} />
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-[1000] text-slate-900 tracking-tight leading-tight uppercase italic"
            >
              {formatTitle(urlSlug)}
            </motion.h1>
            <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-tighter">
              {totalProducts} Premium Units Available
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Filter Toggle Mobile */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-slate-100 px-6 py-4 rounded-2xl font-black text-slate-700 hover:bg-slate-200 transition-all text-xs uppercase"
          >
            <Filter size={18} /> Filters
          </motion.button>

          {/* Sort Dropdown Container */}
          <div className="relative flex-1 md:flex-none">
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full md:w-64 bg-slate-900 text-white px-6 py-4 rounded-2xl flex items-center justify-between gap-3 hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: isSortOpen ? 180 : 0 }}
                >
                  <ArrowUpDown size={14} className="text-blue-400" />
                </motion.div>
                <span>{getSortLabel()}</span>
              </div>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* الأنيميشن الخاص بالقائمة المنسدلة */}
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] overflow-hidden p-2 origin-top"
                >
                  {['relevant', 'low-to-high', 'high-to-low'].map((option) => (
                    <motion.button 
                      key={option}
                      whileHover={{ x: 5, backgroundColor: "rgba(239, 246, 255, 1)" }}
                      onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                      className={`w-full text-left px-4 py-4 rounded-xl transition-all flex items-center justify-between group ${sortBy === option ? 'bg-blue-50' : ''}`}
                    >
                      <span className={`text-[10px] font-[900] uppercase tracking-wider ${sortBy === option ? 'text-blue-600' : 'text-slate-600'}`}>
                        {option.replace(/-/g, ' ')}
                      </span>
                      <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                        {option.includes('low') ? <TrendingDown size={14} /> : option.includes('high') ? <TrendingUp size={14} /> : null}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PageHeader;