"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Heart, Star, TrendingDown, Zap } from "lucide-react";

const ProductCard = ({
  name = "Unknown Product", 
  price = 0, 
  originalPrice = 0, // <--- لازم تضيف ده هنا عشان الكود ميفصلش
  image = "", 
  category = "General", 
  isNew = false,
  discount = 0,
  rating = 4.5, 
  reviews = 120, 
  lowestStore = "Comparo Store",
  storesCount = 5,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // منطق حماية: لو السعر القديم مش مبعوت، بنخليه نفس السعر الحالي عشان الـ Logic يفضل سليم
  const displayOriginalPrice = originalPrice || price;

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 1. GLOW EFFECT */}
      <motion.div
        className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-0 blur-xl transition-all"
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* 2. MAIN CARD CONTAINER */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
        
        {/* IMAGE SECTION */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-8">
          
          {/* BADGES */}
          <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
            {isNew && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black text-white shadow-lg shadow-blue-600/30"
              >
                <Zap className="h-3 w-3" /> NEW
              </motion.span>
            )}
            {discount > 0 && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black text-white shadow-lg shadow-emerald-500/30"
              >
                -{discount}%
              </motion.span>
            )}
          </div>

          {/* WISHLIST BUTTON */}
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
          >
            <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
          </motion.button>

          {/* PRODUCT IMAGE */}
          <motion.div
            className="relative h-full w-full flex items-center justify-center"
            animate={{ y: isHovered ? -12 : 0, rotateY: isHovered ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <img
              src={image}
              alt={name}
              className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-700"
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image"; }} // حماية لو الصورة مكسورة
            />
          </motion.div>

          {/* COMPARE OVERLAY */}
          <motion.div
            className="absolute inset-x-5 bottom-5"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 40, opacity: isHovered ? 1 : 0 }}
          >
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 font-bold text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700">
              <ExternalLink className="h-4 w-4" /> Compare {storesCount} Stores
            </button>
          </motion.div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-6">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{category}</span>

          <h3 className="mt-2 text-xl font-black text-slate-900 group-hover:text-blue-600 leading-tight line-clamp-1">
            {name}
          </h3>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-900">{rating}</span>
            <span className="text-xs text-slate-400">({reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tighter">
              ${price?.toLocaleString()}
            </span>
            {displayOriginalPrice > price && (
              <span className="text-sm font-medium text-slate-400 line-through">
                ${displayOriginalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Footer Detail */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-50 pt-4">
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
    </motion.div>
  );
};

export default ProductCard;