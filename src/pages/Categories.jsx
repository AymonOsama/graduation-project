import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMicrochip, FaLaptop, FaMobileAlt, FaTv, FaCamera, FaGamepad, FaPlug, FaChevronDown, FaChevronUp, FaBoxes, FaArrowRight 
} from 'react-icons/fa';

// 🔹 بنادي على الـ Context الجديد للأقسام
import { useCategories } from "../context/CategoriesContext";

const CATEGORY_CONFIG = {
  electronics: { icon: FaLaptop, color: "from-blue-600 to-cyan-500", tag: "Tech" },
  clothes: { icon: FaMicrochip, color: "from-purple-600 to-pink-500", tag: "Fashion" },
  furniture: { icon: FaTv, color: "from-amber-500 to-orange-600", tag: "Home" },
  shoes: { icon: FaGamepad, color: "from-emerald-500 to-teal-600", tag: "Sport" },
  default: { icon: FaPlug, color: "from-slate-700 to-slate-900", tag: "Global" }
};

const Categories = () => {
  const { categories, loading, error } = useCategories();
  const [showAll, setShowAll] = useState(false);

  const getStyles = (name) => {
    if (!name) return CATEGORY_CONFIG.default;
    const lowerName = name.toLowerCase();
    const key = Object.keys(CATEGORY_CONFIG).find(k => lowerName.includes(k));
    return CATEGORY_CONFIG[key] || CATEGORY_CONFIG.default;
  };

  // تحديد كم عنصر هيتعرض (أول 5 أو الكل) من الأقسام القادمة من الـ API
  const displayedCategories = useMemo(() => {
    return showAll ? categories : categories.slice(0, 5);
  }, [categories, showAll]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  if (error) {
    return <div className="text-center py-24 text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] py-24 px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-purple-100/30 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">
              Market Ecosystem
            </span>
            <h1 className="text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tight leading-[0.9]">
              Explore <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-400">
                Categories
              </span>
            </h1>
          </motion.div>

          {/* زر التحكم في عرض باقي الأقسام */}
          {categories.length > 5 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-blue-600 text-slate-800 hover:text-blue-600 font-bold text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              {showAll ? (
                <>Show Less <FaChevronUp className="text-xs" /></>
              ) : (
                <>View All ({categories.length}) <FaChevronDown className="text-xs" /></>
              )}
            </motion.button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loader" exit={{ opacity: 0 }} className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </motion.div>
          ) : (
            <motion.div 
              key={showAll ? "all" : "limited"} 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              
              {/* 🔹 كارد ثابت في الأول تماماً للذهاب إلى كل المنتجات */}
              <motion.div 
                variants={itemVariants} 
                whileHover={{ scale: 1.02 }} 
                className="group"
              >
                <Link 
                  to="/categoriesPgPd" // تأكد أن هذا هو نفس مسار صفحة كل المنتجات عندك
                  className="block h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2rem] p-8 text-white shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden border border-transparent"
                >
                  {/* Icon Section */}
                  <div className="relative z-10 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FaBoxes size={22} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <span className="text-white/70 font-bold tracking-widest uppercase text-[9px] mb-2 block">
                      Full Catalog
                    </span>
                    <h3 className="text-2xl font-[900] tracking-tight mb-2">
                      View All Products
                    </h3>
                    <p className="text-white/80 text-xs font-medium leading-relaxed">
                      Explore our complete selection of products across all available sections.
                    </p>
                  </div>

                  {/* Footer Link */}
                  <div className="mt-6 flex items-center text-white/90 group-hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    Explore All <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>

              {/* 🔹 طباعة الأقسام الديناميكية التي تأتي من الـ API بعد الكارد الأول */}
              {displayedCategories.map((cat) => {
                const styles = getStyles(cat.name);
                const Icon = styles.icon;
                const urlSlug = (cat.name || "").toLowerCase().replace(/\s+/g, '-');

                return (
                  <motion.div key={cat.id} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group">
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

                      {/* Footer Link */}
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