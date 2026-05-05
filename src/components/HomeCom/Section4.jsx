import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const Section4 = () => {
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

        // الحفاظ على هيكل البيانات كما يتوقعه الـ ProductCard الجديد
        const formattedData = data.map((item) => ({
          ...item,
          images: [
            item.images?.[0]?.replace(/[\[\]"]/g, '') || 'https://via.placeholder.com/400'
          ]
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error('❌ Error fetching products:', error);
      } finally {
        setLoading(false);
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
    const offset = direction === 'left' ? -clientWidth : clientWidth;

    scrollRef.current.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Favorites...</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-blue-600"></span>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">
                Most Liked
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-none">
              Community <span className="font-bold italic">Favorites.</span>
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider Section */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 snap-x snap-mandatory no-scrollbar pb-12 -mx-6 px-6 lg:-mx-12 lg:px-12 scroll-smooth"
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] md:min-w-[380px] lg:min-w-[420px] snap-start"
            >
              {/* التمرير كـ Object كامل ليتوافق مع الـ Component المصحح */}
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4;