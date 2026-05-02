import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const Section4 = () => {
  // ref للتحكم في السلايدر (scroll)
  const scrollRef = useRef(null);

  // state لتخزين المنتجات
  const [products, setProducts] = useState([]);

  // =========================
  // 🔹 Fetch Products
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          'https://api.escuelajs.co/api/v1/products?offset=0&limit=12'
        );

        // تنظيف الداتا قبل التخزين (best practice)
        const cleanedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image:
            item.images?.[0]?.replace(/[\[\]"]/g, '') ||
            'https://via.placeholder.com/400',
          category: item.category?.name || 'Unknown',
        }));

        setProducts(cleanedData);
      } catch (error) {
        console.error('❌ Error fetching products:', error);
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

    // تحديد الاتجاه (يمين / شمال)
    const offset = direction === 'left' ? -clientWidth : clientWidth;

    scrollRef.current.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* =========================
            🔹 Header Section
        ========================= */}
        <div className="flex justify-between items-end mb-16">
          
          {/* Title */}
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
          <div className="hidden md:flex gap-4">
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

        {/* =========================
            🔹 Slider Section
        ========================= */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 snap-x snap-mandatory no-scrollbar pb-12 -mx-6 px-6 lg:-mx-12 lg:px-12 scroll-smooth"
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] md:min-w-[380px] lg:min-w-[420px] snap-start"
            >
              <ProductCard
                name={item.title}
                price={item.price}
                image={item.image}
                category={item.category}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4;