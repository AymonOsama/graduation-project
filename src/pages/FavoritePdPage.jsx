"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartOff, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import usersData from "../data/users.json";

/**
 * FavoritePdPage Component
 * Displays the user's wishlisted products with real-time updates and animations.
 */
const FavoritePdPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Loads favorites from localStorage and syncs the Global Wishlist Count
   */
  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    setFavorites(savedFavorites);
    
    // Sync the Navbar count immediately upon page load
    window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: savedFavorites.length }));
  };

  useEffect(() => {
    /**
     * Authenticates user and checks for Premium subscription status
     */
    const checkUser = () => {
      const savedUser = localStorage.getItem("rememberedUser") || sessionStorage.getItem("rememberedUser");
      if (savedUser) {
        const userId = JSON.parse(savedUser).id;
        const currentUser = usersData.users.find((u) => u.id === String(userId));
        
        // Wishlist access is restricted to Premium members
        if (currentUser?.isPremium) {
          setIsPremium(true);
          loadFavorites();
        }
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  /**
   * Handles removing an item from the wishlist
   * @param {string|number} productId - The ID of the product to remove
   */
  const handleRemoveFavorite = (productId) => {
    // 1. Update local state for immediate UI feedback (triggers Framer Motion exit animation)
    const updatedFavorites = favorites.filter(item => item.id !== productId);
    setFavorites(updatedFavorites);
    
    // 2. Persist changes to localStorage
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));

    /**
     * 3. GLOBAL SYNC: Notify NavBar component
     */
    window.dispatchEvent(new CustomEvent("wishlistUpdated", { 
      detail: updatedFavorites.length 
    }));
  };

  // Prevent flicker during authentication check
  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-200 pb-8">
          <div>
            {/* Added 'select-none' to prevent copying these text elements */}
            <div className="flex items-center gap-2 mb-2 select-none">
              <Sparkles className="text-blue-600" size={24} />
              <span className="text-blue-600 font-bold uppercase text-sm tracking-widest">Personal Collection</span>
            </div>
            <motion.h1 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-black text-gray-900 select-none"
            >
              Wishlist
            </motion.h1>
          </div>
          
          {/* Summary Stat Card */}
          {isPremium && favorites.length > 0 && (
            <motion.div className="bg-white shadow-sm border border-gray-200 px-6 py-3 rounded-2xl flex items-center gap-4 select-none">
              <span className="text-gray-400 font-medium">Total Items:</span>
              <span className="text-2xl font-black text-blue-600">{favorites.length}</span>
            </motion.div>
          )}
        </div>

        {/* Wishlist Grid with Layout Animations */}
        <AnimatePresence mode='popLayout'>
          {isPremium && favorites.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((product) => (
                <motion.div
                  key={product.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                >
                  <ProductCard 
                    product={product} 
                    isFavoritePage={true} 
                    onFavoriteToggle={() => handleRemoveFavorite(product.id)} 
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State / Non-Premium Message */
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 bg-white border border-gray-200 rounded-[3rem] select-none"
            >
              <HeartOff size={80} className="text-gray-300 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900">
                {!isPremium ? "Premium Feature" : "Your wishlist is empty"}
              </h2>
              <button 
                onClick={() => navigate('/home')}
                className="mt-8 group flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl transition-all hover:bg-blue-600 cursor-pointer"
              >
                Go Shopping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FavoritePdPage;