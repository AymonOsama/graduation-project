import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../ProductCard';
import { Link } from 'react-router-dom';

// =========================
// 🔹 Animation Variants
// =========================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Section2 = () => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
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

        const formattedData = data.map((item) => ({
          ...item,
          images: [
            item.images?.[0]?.replace(/[\[\]"]/g, '') || 'https://placehold.co/400x400?text=No+Image'
          ]
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error('❌ Error fetching products:', error);
      } finally {
        // تأخير بسيط جداً لإعطاء شعور بالاحترافية في الانتقال
        setTimeout(() => setLoading(false), 600);
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
    const scrollAmount = direction === 'left' ? -clientWidth / 1.2 : clientWidth / 1.2;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">

        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Sparkles size={18} fill="currentColor" className="opacity-80" />
              </div>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">
                Hardware Selection
              </span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase italic">
              Featured <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Deals
              </span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="hidden md:flex gap-3 mr-4">
              <button
                onClick={() => scroll('left')}
                className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center bg-white hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200/50 cursor-pointer active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center bg-white hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200/50 cursor-pointer active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <Link to="/categories" className="flex-1 md:flex-none text-center bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95">
              View All Offers
            </Link>
          </div>
        </div>

        {/* 2. Slider Section */}
        {loading ? (
          /* Skeleton Loader */
          <div className="flex gap-8 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[300px] md:min-w-[380px] h-[450px] bg-slate-50 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex overflow-x-auto gap-8 snap-x snap-mandatory no-scrollbar pb-16 -mx-6 px-6 lg:-mx-12 lg:px-12 scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {products.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[380px] snap-start"
              >
                <ProductCard product={item} />
              </motion.div>
            ))}
            
            {/* Last Empty Space for better scrolling end */}
            <div className="min-w-[20px] md:min-w-[100px] shrink-0" />
          </motion.div>
        )}
      </div>

      {/* Subtle Bottom Divider */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="h-px w-full bg-slate-100" />
      </div>
    </section>
  );
};

export default Section2;