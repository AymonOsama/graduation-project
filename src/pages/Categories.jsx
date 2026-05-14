import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FaMicrochip, FaLaptop, FaMobileAlt, FaTv, FaCamera, FaGamepad, FaPlug 
} from 'react-icons/fa';

// 1. نقل التنسيقات خارج الكومبوننت لمنع إعادة تعريفها في كل Render
const CATEGORY_CONFIG = {
  electronics: { icon: FaLaptop, color: "from-blue-600 to-cyan-500", tag: "Tech" },
  clothes: { icon: FaMicrochip, color: "from-purple-600 to-pink-500", tag: "Fashion" },
  furniture: { icon: FaTv, color: "from-amber-500 to-orange-600", tag: "Home" },
  shoes: { icon: FaGamepad, color: "from-emerald-500 to-teal-600", tag: "Sport" },
  default: { icon: FaPlug, color: "from-slate-700 to-slate-900", tag: "Global" }
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. دالة محسنة لجلب التنسيقات
  const getStyles = (name) => {
    const lowerName = name.toLowerCase();
    const key = Object.keys(CATEGORY_CONFIG).find(k => lowerName.includes(k));
    return CATEGORY_CONFIG[key] || CATEGORY_CONFIG.default;
  };

  useEffect(() => {
    // استخدام AbortController لإلغاء الطلب لو المستخدم قفل الصفحة قبل ما يخلص
    const controller = new AbortController();
    
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://api.escuelajs.co/api/v1/categories', {
          signal: controller.signal
        });
        // Optimization: عرض الفئات الأساسية فقط
        setCategories(data.slice(0, 5)); 
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError("Failed to load categories. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort(); // التنظيف عند الخروج
  }, []);

  // 3. تحسين الأنيميشن
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  if (error) return <div className="text-center py-24 text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-[#fcfdfe] py-24 px-8 relative overflow-hidden">
      {/* Background Orbs - Optimized Opacity */}
      <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-purple-100/30 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">Market Ecosystem</span>
            <h1 className="text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tight leading-[0.9]">
              Explore <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-400">
                Categories
              </span>
            </h1>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
               <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories.map((cat) => {
                const styles = getStyles(cat.name);
                const Icon = styles.icon;
                const urlSlug = cat.name.toLowerCase().replace(/\s+/g, '-');

                return (
                  <motion.div 
                    key={cat.id} 
                    variants={itemVariants} 
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Link 
                      to={`/CategoriesPgPd/${urlSlug}`} 
                      state={{ categoryId: cat.id, categoryName: cat.name }}
                      className="block h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Icon Section */}
                      <div className="relative z-10 mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${styles.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                          <Icon size={24} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2">{cat.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                            {styles.tag}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center text-slate-400 group-hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest">
                        Browse Collection <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Categories;