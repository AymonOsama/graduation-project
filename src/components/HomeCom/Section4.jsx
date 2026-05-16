import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import ProductCard from '../ProductCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useProducts } from "../../context/ProductsContext";

const Section4 = () => {
  const scrollRef = useRef(null);
  const { products, loading, error } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  // ==========================================
  // 🔹 فرز وجلب أكثر 12 منتج محبوباً (Community Favorites)
  // ==========================================
  const mostLikedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    return [...products]
      .sort((a, b) => {
        // الترتيب بناءً على عدد الإعجابات أو التقييم المتوفر في الـ API عندك
        const likesA = Number(a.likesCount || a.rating || a.likes || 0);
        const likesB = Number(b.likesCount || b.rating || b.likes || 0);
        return likesB - likesA; // من الأعلى تقييماً/إعجاباً للأقل
      })
      .slice(0, 12); // استخراج أول 12 منتج فقط
  }, [products]);

  // Get dynamic card width including current gap
  const getCardWidth = useCallback(() => {
    if (!scrollRef.current) return 0;
    const cardElement = scrollRef.current.querySelector('.snap-start');
    if (!cardElement) return 0;
    // Get actual gap from computed styles (supports responsive gap)
    const container = scrollRef.current;
    const gap = parseInt(getComputedStyle(container).gap) || 16;
    return cardElement.offsetWidth + gap;
  }, []);

  // Update active index based on scroll position
  const handleScrollUpdate = useCallback(() => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = getCardWidth();
    
    if (cardWidth === 0) return;
    
    // Calculate current visible index
    const index = Math.round(scrollLeft / cardWidth);
    const maxIndex = mostLikedProducts.length - 1;
    const validIndex = Math.min(Math.max(0, index), maxIndex);
    
    if (validIndex !== activeIndex) {
      setActiveIndex(validIndex);
    }
  }, [getCardWidth, activeIndex, mostLikedProducts.length]);

  // Smooth scroll to specific direction
  const handleScrollAction = useCallback((direction) => {
    if (!scrollRef.current) return;
    const cardWidth = getCardWidth();
    if (cardWidth === 0) return;
    
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  }, [getCardWidth]);

  // Recalculate on window resize for responsive accuracy
  useEffect(() => {
    const handleResize = () => {
      handleScrollUpdate();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleScrollUpdate]);

  // Initial scroll position sync
  useEffect(() => {
    const timer = setTimeout(handleScrollUpdate, 100);
    return () => clearTimeout(timer);
  }, [handleScrollUpdate, products]);

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
        
        {/* Header Section */}
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

          {/* Desktop Navigation Buttons */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => handleScrollAction('left')}
              className="cursor-pointer w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90"
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScrollAction('right')}
              className="cursor-pointer w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90"
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScrollUpdate}
            className="flex overflow-x-auto gap-4 md:gap-8 snap-x snap-mandatory scroll-smooth 
                       no-scrollbar pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
          >
            {mostLikedProducts.map((item) => (
              <div
                key={item.id}
                className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] xl:min-w-[25%] snap-start"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>

          {/* Mobile Dots Indicator */}
          <div className="flex sm:hidden justify-center items-center gap-1.5 mt-2">
            {mostLikedProducts.map((_, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === idx 
                  ? "w-6 h-1 bg-blue-600" 
                  : "w-1.5 h-1 bg-slate-200"
                }`}
                aria-label={`Go to product ${idx + 1}`}
                aria-current={activeIndex === idx ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
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