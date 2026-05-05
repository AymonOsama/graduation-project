import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartOff, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// استيراد الكرت الموحد الخاص بك
import ProductCard from '../components/ProductCard';

const FavoritePdPage = () => {
  const navigate = useNavigate();
  
  // بيانات تجريبية
  const [favorites, setFavorites] = React.useState([
    { id: 1, name: "RTX 5090 Ti OC", price: "95,000", image: "https://via.placeholder.com/300", category: "GPU" },
    { id: 2, name: "Ryzen 9 9950X", price: "32,000", image: "https://via.placeholder.com/300", category: "CPU" },
  ]);

  // دالة الحذف (يمكنك تمريرها للـ ProductCard إذا كان يدعم OnRemove)
  const removeItem = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-blue-600" size={24} />
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Personal Collection</span>
            </div>
            <motion.h1 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-black tracking-tight text-gray-900"
            >
              Wishlist
            </motion.h1>
            <p className="text-gray-500 mt-2 text-lg">Manage your favorite high-end hardware picks.</p>
          </div>
          
          <div className="bg-white shadow-sm border border-gray-200 px-6 py-3 rounded-2xl flex items-center gap-4">
            <span className="text-gray-400 font-medium">Total Items:</span>
            <span className="text-2xl font-black text-blue-600">{favorites.length}</span>
          </div>
        </div>

        <AnimatePresence mode='popLayout'>
          {favorites.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {favorites.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* استخدام الكرت الموحد الخاص بك */}
                  <ProductCard 
                    product={product} 
                    isFavoritePage={true} // يمكنك استخدام هذا الـ prop لإظهار زر الحذف داخل الكرت
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State - Light Mode */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 bg-white border border-gray-200 rounded-[3rem] shadow-sm"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="relative p-8 bg-gray-50 rounded-full text-gray-300 border border-gray-100">
                  <HeartOff size={80} strokeWidth={1.5} />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900">Your wishlist is empty</h2>
              <p className="text-gray-500 mt-3 mb-10 max-w-xs text-center text-lg">
                Start adding the best hardware to your list and build your dream PC.
              </p>
              
              <button 
                onClick={() => navigate('/home')}
                className="group flex items-center gap-3 bg-gray-900 text-white font-bold px-10 py-5 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95"
              >
                Explore Shop 
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FavoritePdPage;