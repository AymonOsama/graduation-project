import React, { useEffect, useRef, useState, useCallback } from 'react';
import ProductCard from '../ProductCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const Section4 = () => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ==========================================
  // 🔹 Fetch Data
  // ==========================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=10');
        const formattedData = data.map((item) => ({
          ...item,
          images: [item.images?.[0]?.replace(/[\[\]"]/g, '') || 'https://via.placeholder.com/400']
        }));
        setProducts(formattedData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ==========================================
  // 🔹 التعديل الجوهري: حساب الإسكرول بدقة متناهية
  // ==========================================
  const handleScrollUpdate = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    
    // نجلب عرض أول كارت موجود فعلياً في الصفحة
    const cardElement = container.querySelector('.snap-start');
    if (!cardElement) return;

    const cardWidth = cardElement.offsetWidth + 16; // العرض + الـ Gap
    
    // الحساب يعتمد على "نقطة المنتصف" لضمان السلاسة
    const index = Math.round(scrollLeft / cardWidth);
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleScrollAction = useCallback((direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardElement = container.querySelector('.snap-start');
    if (!cardElement) return;

    const cardWidth = cardElement.offsetWidth + 16;
    
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  }, [activeIndex]);

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
      <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Loading Collection</span>
    </div>
  );

  if (error) return null;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* --- Header Section --- */}
        <div className="flex justify-between items-end mb-10 md:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-blue-600"></span>
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">Most Liked</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-light text-slate-900 tracking-tight">
              Community <span className="font-bold italic">Favorites.</span>
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => handleScrollAction('left')}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScrollAction('right')}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- Slider Container --- */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScrollUpdate}
            className="flex overflow-x-auto gap-4 md:gap-8 snap-x snap-mandatory scroll-smooth 
                       no-scrollbar pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
          >
            {products.map((item) => (
              <div
                key={item.id}
                className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] xl:min-w-[25%] snap-start"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>

          {/* --- الإصلاح النهائي: نقاط سفلية ذكية ومبسطة جداً --- */}
          {/* تختفي تماماً إذا كان عدد الكروت قليل أو في الديسكتوب */}
          <div className="flex sm:hidden justify-center items-center gap-1.5 mt-2">
            {products.map((_, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === idx 
                  ? "w-6 h-1 bg-blue-600" 
                  : "w-1.5 h-1 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Section4;