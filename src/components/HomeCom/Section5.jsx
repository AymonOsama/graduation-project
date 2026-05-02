import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Zap } from 'lucide-react';

const Section5 = () => {
  const [hoveredBrand, setHoveredBrand] = useState(null);

  // Brand Partners Data
  const brandPartners = [
    {
      id: 1,
      name: 'NVIDIA',
      category: 'Graphics',
      color: 'from-green-500 to-emerald-600',
      icon: '🎮',
      rating: 4.9,
      products: '500+',
    },
    {
      id: 2,
      name: 'ASUS',
      category: 'Hardware',
      color: 'from-red-500 to-rose-600',
      icon: '⚡',
      rating: 4.8,
      products: '450+',
    },
    {
      id: 3,
      name: 'RAZER',
      category: 'Peripherals',
      color: 'from-green-600 to-lime-500',
      icon: '🖱️',
      rating: 4.7,
      products: '380+',
    },
    {
      id: 4,
      name: 'MSI',
      category: 'Components',
      color: 'from-red-600 to-orange-500',
      icon: '🔧',
      rating: 4.8,
      products: '420+',
    },
    {
      id: 5,
      name: 'INTEL',
      category: 'Processors',
      color: 'from-blue-600 to-cyan-500',
      icon: '💻',
      rating: 4.9,
      products: '300+',
    },
  ];

  // Store Partners Data
  const storePartners = [
    {
      id: 1,
      name: 'Amazon',
      logo: '🛒',
      color: 'from-orange-400 to-yellow-500',
      verified: true,
      badge: 'Prime Seller',
    },
    {
      id: 2,
      name: 'eBay',
      logo: '🏪',
      color: 'from-red-500 to-pink-600',
      verified: true,
      badge: 'Top Rated',
    },
    {
      id: 3,
      name: 'Newegg',
      logo: '📦',
      color: 'from-yellow-500 to-orange-600',
      verified: true,
      badge: 'Official',
    },
    {
      id: 4,
      name: 'Best Buy',
      logo: '🎯',
      color: 'from-blue-600 to-blue-700',
      verified: true,
      badge: 'Authorized',
    },
    {
      id: 5,
      name: 'Overclockers',
      logo: '⚙️',
      color: 'from-purple-600 to-indigo-700',
      verified: true,
      badge: 'Partner',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div className="flex items-center justify-center gap-2 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Zap size={24} className="text-blue-600" />
            </motion.div>
            <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs sm:text-[10px]">
              Trusted by Industry Leaders
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Star size={24} className="text-yellow-500" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight"
          >
            Official Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Partners</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto font-semibold"
          >
            We partner with the world's leading tech brands to bring you the best quality and performance
          </motion.p>
        </motion.div>

        {/* Brand Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20"
        >
          {brandPartners.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredBrand(brand.id)}
              onMouseLeave={() => setHoveredBrand(null)}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative cursor-pointer"
            >
              {/* Card Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
              />

              {/* Card Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-slate-200 group-hover:border-blue-300 transition-colors"
                animate={{
                  boxShadow:
                    hoveredBrand === brand.id
                      ? `0 0 30px ${brand.color.split(' ')[1]}`
                      : 'none',
                }}
              />

              {/* Card Content */}
              <div className="relative p-6 h-full flex flex-col items-center text-center z-10">
                {/* Icon */}
                <motion.div
                  animate={{
                    y: hoveredBrand === brand.id ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl mb-4"
                >
                  {brand.icon}
                </motion.div>

                {/* Brand Name */}
                <h3 className="text-2xl md:text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </h3>

                {/* Category */}
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  {brand.category}
                </p>

                {/* Divider */}
                <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4 group-hover:w-full transition-all duration-300" />

                {/* Stats */}
                <div className="space-y-2 w-full mb-4">
                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredBrand === brand.id ? 1 : 0.6,
                    }}
                    className="flex items-center justify-center gap-1"
                  >
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-slate-700">
                      {brand.rating}
                    </span>
                  </motion.div>

                  {/* Products Count */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredBrand === brand.id ? 1 : 0.6,
                    }}
                    className="text-xs font-semibold text-slate-600"
                  >
                    {brand.products} Products
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider"
                >
                  Shop Now
                </motion.button>
              </div>

              {/* Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${brand.color} opacity-0 blur-xl pointer-events-none`}
                animate={{
                  opacity: hoveredBrand === brand.id ? 0.3 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-20 origin-center"
        />

        {/* Store Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp size={20} className="text-green-600" />
            <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs sm:text-[10px]">
              Available On
            </span>
            <TrendingUp size={20} className="text-green-600" />
          </motion.div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            Shop on Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Favorite Stores</span>
          </h3>
        </motion.div>

        {/* Store Partners Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {storePartners.map((store) => (
            <motion.div
              key={store.id}
              variants={itemVariants}
              whileHover={{
                y: -15,
                scale: 1.08,
              }}
              className="group relative cursor-pointer"
            >
              {/* Verified Badge */}
              {store.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: store.id * 0.1 + 0.5 }}
                  className="absolute -top-3 -right-3 z-20"
                >
                  <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase">
                    ✓ {store.badge}
                  </div>
                </motion.div>
              )}

              {/* Card */}
              <div
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${store.color} text-white overflow-hidden h-full flex flex-col items-center justify-center transform transition-all duration-300`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Store Logo/Icon */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-6xl mb-4"
                  >
                    {store.logo}
                  </motion.div>

                  {/* Store Name */}
                  <h4 className="text-2xl font-black mb-2 group-hover:scale-110 transition-transform">
                    {store.name}
                  </h4>

                  {/* Underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: store.id * 0.1 + 0.3, duration: 0.5 }}
                    className="h-1 bg-white/40 rounded-full mx-auto mb-4"
                  />

                  {/* Visit Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-bold text-sm hover:bg-white/30 transition-all uppercase tracking-wider"
                  >
                    Visit Store
                  </motion.button>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { label: 'Brand Partners', value: '500+' },
            { label: 'Active Stores', value: '50+' },
            { label: 'Products Listed', value: '50K+' },
            { label: 'Customer Reviews', value: '100K+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.6, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-blue-300 transition-colors group"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wider group-hover:text-slate-900 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Section5;