import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Laptop,
  Cpu,
  MousePointer2,
  Monitor
} from 'lucide-react';

// استيراد الـ Context الجديد
import { useCategories } from "../../context/CategoriesContext";

const MegaMenu = ({ isOpen, setIsOpen }) => {
  // سحب البيانات وحالة التحميل والخطأ مباشرة من الـ Context
  const { categories, loading, error } = useCategories();
  const closeTimeout = React.useRef(null);

  // =========================
  // Icons
  // =========================
  const icons = useMemo(() => ([
    <Cpu size={18} />,
    <Laptop size={18} />,
    <Monitor size={18} />,
    <MousePointer2 size={18} />,
    <Box size={18} />
  ]), []);

  // =========================
  // قطع أول 6 أقسام فقط كما كنت تفعل
  // =========================
  const displayedCategories = useMemo(() => {
    if (!categories) return [];
    return categories
      .filter((cat) => cat?.id && cat?.name)
      .slice(0, 6);
  }, [categories]);
  
  // =========================
  // Hover Handlers
  // =========================
  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 top-20 w-full bg-white border-b border-gray-100 shadow-2xl z-50 hidden lg:block"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-12 p-8 gap-8">

            {/* =========================
                Categories Section
            ========================= */}
            <div className="col-span-8 grid grid-cols-2 gap-8">

              {loading ? (
                <div className="col-span-2 text-center py-10 text-gray-400 font-medium">
                  Loading Tech Categories...
                </div>
              ) : error ? (
                <div className="col-span-2 text-center py-10 text-red-500 font-bold">
                  Failed to load categories
                </div>
              ) : (
                displayedCategories.map((category, idx) => {
                  const urlSlug = category.name
                    .toLowerCase()
                    .replace(/\s+/g, '-');

                  return (
                    <div
                      key={category.id}
                      className="space-y-4"
                    >
                      <h3 className="text-xs uppercase tracking-[0.2em] text-blue-600 font-black">
                        {category.name}
                      </h3>

                      <div className="grid gap-2">
                        <Link
                          to={`/categoriesPgPd/${urlSlug}`}
                          state={{
                            categoryId: category.id,
                            categoryName: category.name
                          }}
                          onClick={() => setIsOpen(false)}
                          className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all group/item"
                        >
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                            {icons[idx % icons.length]}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              Explore {category.name}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              View the latest collections in this category
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* =========================
                Featured Section
            ========================= */}
            <div className="col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="bg-white/20 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest">
                  Featured
                </span>

                <h4 className="text-2xl font-black mt-4 leading-tight">
                  Build Your <br />
                  Dream Rig
                </h4>

                <p className="text-blue-100 text-xs mt-2 font-medium">
                  Use our comparison tool to find the best hardware deals.
                </p>
              </div>

              <Link
                to="/categories"
                onClick={() => setIsOpen(false)}
                className="relative z-10 mt-6 bg-white text-blue-600 text-center py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                View All Categories
              </Link>

              <Box
                size={150}
                className="absolute -right-10 -bottom-10 text-white/10 rotate-12"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;