"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 
import usersData from "../data/users.json";

/**
 * ProductCard Component
 * @param {Object} product - The product data object
 * @param {Function} onFavoriteToggle - Callback function to refresh parent state (mainly for Favorites Page)
 */
const ProductCard = ({ product, onFavoriteToggle }) => {
  const navigate = useNavigate();
  
  // Local UI States
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Destructuring product with fallback values to prevent crashes
  const {
    id,
    title: name = "Unknown Product",
    price = 0,
    images = [],
    category = { name: "General" },
  } = product || {};

  useEffect(() => {
    /**
     * Check if the logged-in user has Premium status from local storage and JSON data
     */
    const checkPremiumStatus = () => {
      const savedUser = localStorage.getItem("rememberedUser") || sessionStorage.getItem("rememberedUser");
      if (!savedUser) return;
    
      const userId = JSON.parse(savedUser).id;
      const usersArray = usersData.users; 
    
      if (usersArray && Array.isArray(usersArray)) {
        const currentUser = usersArray.find((u) => u.id === String(userId));
        if (currentUser?.isPremium) {
          setIsPremium(true);
        }
      }
    };

    /**
     * Initial check to see if this specific product is already in the wishlist
     */
    const favorites = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    setIsLiked(favorites.some((fav) => fav.id === id));

    checkPremiumStatus();
  }, [id]);

  /**
   * Handles the Heart icon click logic
   * Includes Premium validation, LocalStorage updates, and Cross-component communication
   */
  const handleLikeClick = (e) => {
    // Prevent the click from triggering the card's navigation
    e.stopPropagation();

    // Guard Clause: Only premium users can use the wishlist feature
    if (!isPremium) {
      toast.error("Exclusive for Premium members!");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    let updatedFavorites;

    if (isLiked) {
      // Logic to Remove from favorites
      updatedFavorites = favorites.filter((fav) => fav.id !== id);
      toast.success("Removed from favorites");
    } else {
      // Logic to Add to favorites
      updatedFavorites = [...favorites, product];
      toast.success("Added to favorites!");
    }

    // 1. Update Persistent Storage
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));
    
    // 2. Update Local UI state (Heart color)
    setIsLiked(!isLiked);

    /**
     * 3. THE MAGIC LINE: Dispatch a Custom Event
     * This notifies the NavBar component to update the wishlist count badge immediately
     * without needing a page refresh.
     */
    window.dispatchEvent(new CustomEvent("wishlistUpdated", { 
      detail: updatedFavorites.length 
    }));

    /**
     * 4. Parent Callback
     * If this card is rendered inside the Favorites Page, this function will
     * trigger a re-render or animation to remove the card from the grid.
     */
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  /**
   * Navigates to the Single Product Details page
   */
  const handleCardClick = () => {
    if (id) navigate(`/product/${id}`);
  };

  /**
   * Helper to clean API image URLs that might contain extra brackets or quotes
   */
  const cleanImageUrl = (url) => {
    if (!url) return "https://placehold.co/400x400?text=No+Image";
    return url.replace(/[\[\]"]/g, "");
  };

  const mainImage = cleanImageUrl(images[0]);

  return (
    <motion.div
      className="group relative cursor-pointer h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Dynamic Background Glow Effect on Hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 blur-xl transition-all"
        animate={{ opacity: isHovered ? 0.3 : 0 }}
      />

      {/* Main Card Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col">
        
        {/* Top Section: Image and Favorite Button */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex-shrink-0">
          
          <motion.button
            onClick={handleLikeClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`cursor-pointer absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-colors ${
              !isPremium ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white/90"
            }`}
          >
            <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
          </motion.button>

          {/* Product Image with Hover Animation */}
          <motion.div
            className="relative h-full w-full flex items-center justify-center"
            animate={{ y: isHovered ? -12 : 0 }}
          >
            <img 
              src={mainImage} 
              alt={name} 
              className="max-h-full max-w-full object-contain drop-shadow-xl group-hover:scale-110"
            />
          </motion.div>

          {/* Floating 'View Details' Button visible on hover */}
          <motion.div
            className="absolute inset-x-5 bottom-5"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 40, opacity: isHovered ? 1 : 0 }}
          >
            <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 font-bold text-white shadow-xl shadow-blue-600/20">
              <ExternalLink className="h-4 w-4" /> View Details
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Product Information */}
        <div className="p-6 flex flex-col flex-grow">
          
          <h3 className="mt-3 text-lg font-black text-slate-900 group-hover:text-blue-600 leading-tight line-clamp-2">
            {name}
          </h3>

          <div className="mt-auto pt-6 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">EGP {price?.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-slate-400">
               <ShoppingBag size={18} />
               <span className="text-[10px] font-bold uppercase">Stock Ready</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;