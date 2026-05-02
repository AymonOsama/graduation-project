import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../ProductCard';

// =========================
// 🔹 Animation Variants
// =========================

// container بيعمل stagger للـ items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // كل عنصر يظهر بعد التاني
      delayChildren: 0.1
    }
  }
};

// animation لكل كارت
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Section2 = () => {
  // ref للتحكم في السلايدر
  const scrollRef = useRef(null);

  // state للبيانات
  const [products, setProducts] = useState([]);

  // loading state
  const [loading, setLoading] = useState(true);

  // =========================
  // 🔹 Fetch Products
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          'https://api.escuelajs.co/api/v1/products?offset=0&limit=12'
        );

        // 🔥 تنظيف الداتا (important)
        const cleanedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image:
            item.images?.[0]?.replace(/[\[\]"]/g, '') ||
            'https://via.placeholder.com/400',
          category: item.category?.name || 'Unknown'
        }));

        setProducts(cleanedData);

      } catch (error) {
        console.error('❌ Error fetching products:', error);
      } finally {
        setLoading(false); // يقفل loading سواء نجح أو فشل
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // 🔹 Scroll Function
  // =========================
  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const { clientWidth } = scrollRef.current;

    // نحرك جزء من العرض (UX أحسن من full width)
    const scrollAmount =
      direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  // =========================
  // 🔹 Loading State UI
  // =========================
  if (loading) {
    return (
      <div className="py-24 text-center font-bold text-blue-600">
        Loading Products...
      </div>
    );
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">

        {/* =========================
            🔹 Header Section
        ========================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">

          {/* Title + Icon */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Sparkles size={16} />
              </div>

              <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em]">
                Hardware Selection
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none uppercase italic mt-4">
              Featured <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Deals
              </span>
            </h2>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-4">

            {/* arrows */}
            <div className="hidden md:flex gap-2 mr-4">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* CTA Button */}
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors">
              View All
            </button>
          </div>
        </div>

        {/* =========================
            🔹 Slider Section
        ========================= */}
        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex overflow-x-auto gap-8 snap-x snap-mandatory no-scrollbar pb-12 -mx-6 px-6 lg:-mx-12 lg:px-12 scroll-smooth min-h-[400px]"
        >
          {products.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="min-w-[300px] md:min-w-[350px] snap-start"
            >
              <ProductCard
                name={item.title}
                price={item.price}
                image={item.image}
                category={item.category}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Section2;