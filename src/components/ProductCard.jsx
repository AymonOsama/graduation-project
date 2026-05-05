"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Heart, Star, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
  // بنشيك لو الـ id موجود فعلاً قبل ما ننقل الصفحة
  if (product?.id) {
    navigate(`/product/${product.id}`);
  } else {
    // بدل الأيرور، ممكن نطلع رسالة بسيطة أو مانعملش حاجة
    console.warn("This specific product has no ID in the API database.");
  }
};

  const {
    id,
    title: name = "Unknown Product",
    price = 0,
    images = [],
    category = { name: "General" },
  } = product || {};

  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 1. تنظيف الرابط واستبدال السيرفر العطلان بـ placehold.co
  const cleanImageUrl = (url) => {
    if (!url) return "https://placehold.co/400x400?text=No+Image";
    const cleaned = url.replace(/[\[\]"]/g, "");
    return cleaned;
  };

  const mainImage = cleanImageUrl(images[0]);
  
  const displayOriginalPrice = price + (price * 0.2); 
  const rating = 4.8;
  const reviews = 245;
  const storesCount = 3;
  const lowestStore = "Official Store";


  return (
    <motion.div
      className="group relative cursor-pointer h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* تأثير التوهج الخلفي */}
      <motion.div
        className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-0 blur-xl transition-all"
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col">
        
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex-shrink-0">
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); 
              setIsLiked(!isLiked);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
          >
            <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
          </motion.button>

          <motion.div
            className="relative h-full w-full flex items-center justify-center"
            animate={{ y: isHovered ? -12 : 0, rotateY: isHovered ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <img 
              src={mainImage} 
              alt={name} 
              className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-700"
              onError={(e) => { e.target.src = "https://placehold.co/400x400?text=Image+Error"; }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-x-5 bottom-5"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 40, opacity: isHovered ? 1 : 0 }}
          >
            <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 font-bold text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-colors">
              <ExternalLink className="h-4 w-4" /> View Details
            </div>
          </motion.div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{category?.name}</span>
          <h3 className="mt-2 text-xl font-black text-slate-900 group-hover:text-blue-600 leading-tight line-clamp-1">{name}</h3>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-900">{rating}</span>
            <span className="text-xs text-slate-400">({reviews.toLocaleString()})</span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tighter">EGP {price?.toLocaleString()}</span>
            {displayOriginalPrice > price && (
              <span className="text-sm font-medium text-slate-400 line-through">EGP {displayOriginalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="mt-auto pt-5">
             <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-emerald-500" />
                  <span className="text-[11px] font-bold text-slate-600">
                    Lowest at <span className="text-emerald-500 font-black">{lowestStore}</span>
                  </span>
                </div>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                  {storesCount} Sellers
                </span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;