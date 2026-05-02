import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaChartLine,
  FaBolt,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaDollarSign,
  FaMobileAlt,
  FaLaptop,
  FaHome
} from "react-icons/fa";

const OurServices = () => {
  const [activeService, setActiveService] = useState(0);

  // Main Services
  const mainServices = [
    {
      id: 0,
      title: 'Price Comparison',
      subtitle: 'Find the Lowest Price',
      description: 'We scan multiple online retailers to find you the best price for any product. Save time and money with our intelligent price tracking system.',
      benefits: [
        'Compare prices across 500+ retailers',
        'Real-time price updates',
        'Historical price tracking',
        'Price alerts for your wishlist'
      ],
      color: 'from-blue-500 to-cyan-500',
      example: 'Laptop: $1,299 → $899 (Save $400)',
      icon_emoji: '💰'
    },
    {
      id: 1,
      title: 'Specs Comparison',
      subtitle: 'Compare Features Side-by-Side',
      description: 'Detailed specifications comparison for electronics. See all features, performance metrics, and technical details in one place.',
      benefits: [
        'Side-by-side feature comparison',
        'Performance benchmarks',
        'Technical specifications',
        'User reviews aggregated'
      ],
      color: 'from-purple-500 to-pink-500',
      example: 'Compare RAM, Storage, Camera Quality instantly',
      icon_emoji: '📱'
    },
    {
      id: 2,
      title: 'Smart Deals',
      subtitle: 'Discover Best Offers',
      description: 'Get notified about the best deals and discounts from your favorite stores. Never miss a sale again.',
      benefits: [
        'Daily deal notifications',
        'Seasonal sale alerts',
        'Flash sale monitoring',
        'Exclusive discount codes'
      ],
      color: 'from-orange-500 to-red-500',
      example: 'Get alerts when prices drop by 20%+',
      icon_emoji: '🎉'
    }
  ];

  // How It Works
  const howItWorks = [
    {
      step: 1,
      title: 'Search Product',
      description: 'Enter the product name or brand you want to compare',
      icon: '🔍'
    },
    {
      step: 2,
      title: 'Compare Prices',
      description: 'See all available prices from different retailers instantly',
      icon: '⚖️'
    },
    {
      step: 3,
      title: 'Check Specs',
      description: 'View detailed specifications and features side by side',
      icon: '📊'
    },
    {
      step: 4,
      title: 'Buy Smart',
      description: 'Click to buy from the best price or read reviews first',
      icon: '✅'
    }
  ];

  // Features
  const features = [
    {
      icon: FaSearch,
      title: 'Universal Search',
      desc: 'Search any product and instantly see all prices and specifications from major retailers'
    },
    {
      icon: FaChartLine,
      title: 'Lowest Price Guarantee',
      desc: 'We guarantee you\'re getting the best deal available with our real-time price updates'
    },
    {
      icon: FaClock,
      title: '24/7 Monitoring',
      desc: 'Our system monitors prices 24/7 to catch the best deals before anyone else'
    },
    {
      icon: FaShieldAlt,
      title: '100% Free Service',
      desc: 'Completely free to use. We don\'t charge for price comparisons or specifications'
    },
    {
      icon: FaBolt,
      title: 'Instant Comparison',
      desc: 'Get results in seconds. No waiting, no complicated forms. Just search and compare'
    },
    {
      icon: FaUsers,
      title: 'Community Reviews',
      desc: 'Read aggregated reviews from thousands of users to make informed decisions'
    }
  ];

  // Premium Features
  const premiumFeatures = [
    {
      feature: 'Basic Price Comparison',
      free: true,
      premium: true
    },
    {
      feature: 'Detailed Specifications',
      free: true,
      premium: true
    },
    {
      feature: 'Price Alerts',
      free: false,
      premium: true
    },
    {
      feature: 'Advanced Filters',
      free: false,
      premium: true
    },
    {
      feature: 'Wishlist & Saved Items',
      free: false,
      premium: true
    },
    {
      feature: 'Historical Price Charts',
      free: false,
      premium: true
    },
    {
      feature: 'Ad-Free Experience',
      free: false,
      premium: true
    },
    {
      feature: 'Premium Support',
      free: false,
      premium: true
    }
  ];

  // Example Use Cases
  const useCases = [
    {
      product: 'Gaming Laptop',
      scenario: 'Finding the best gaming laptop within budget',
      saved: '$500+',
      process: 'Compare specs → Find lowest price → Check reviews → Buy'
    },
    {
      product: 'Smartphone',
      scenario: 'Comparing latest phone models and prices',
      saved: '$300+',
      process: 'Search model → See all retailers → Check features → Get deal alert'
    },
    {
      product: 'Headphones',
      scenario: 'Getting the best audio quality for your money',
      saved: '$150+',
      process: 'Filter by specs → Compare prices → Read reviews → Purchase'
    },
    {
      product: 'Smart Home Device',
      scenario: 'Building smart home setup at the best value',
      saved: '$200+',
      process: 'Browse category → Compare all options → Stack savings → Buy'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-6 md:px-12 text-center relative z-10"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div 
            className="h-[2px] w-12 bg-blue-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm">
            Our Services
          </span>
          <motion.div 
            className="h-[2px] w-12 bg-blue-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black mb-6 text-slate-900"
        >
          Smart Shopping, <span className="text-blue-600">Smart Savings</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto font-medium mb-12"
        >
          Compare prices, specifications, and reviews across 500+ retailers. Find the best deals and never overpay again.
        </motion.p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl"
        >
          💡
        </motion.div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-24 py-20">

        {/* MAIN SERVICES SHOWCASE */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-slate-900 text-center"
          >
            What We <span className="text-blue-600">Offer</span>
          </motion.h2>

          {/* Service Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {mainServices.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.02 }}
                onClick={() => setActiveService(idx)}
                className={`rounded-2xl p-8 cursor-pointer transition-all border-2 ${
                  activeService === idx
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-blue-600 shadow-2xl'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="text-6xl mb-4">{service.icon_emoji}</div>
                <h3 className="text-2xl font-black mb-2">{service.title}</h3>
                <p className={`text-sm font-bold mb-4 tracking-widest uppercase ${
                  activeService === idx ? 'text-blue-100' : 'text-blue-600'
                }`}>
                  {service.subtitle}
                </p>
                <p className={`leading-relaxed ${
                  activeService === idx ? 'text-blue-50' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Service Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 border-2 border-blue-200 shadow-xl"
            >
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                {mainServices[activeService].title} Benefits
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mainServices[activeService].benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-blue-50"
                  >
                    <FaCheckCircle size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                    <span className="font-bold text-slate-800">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-xl"
              >
                <p className="text-lg font-black text-blue-900">
                  💰 {mainServices[activeService].example}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* HOW IT WORKS */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-slate-900 text-center"
          >
            How It <span className="text-blue-600">Works</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-600 transition-all h-full text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="text-6xl mb-4"
                  >
                    {item.icon}
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl mx-auto mb-4"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {item.description}
                  </p>
                </div>
                {idx < 3 && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2"
                  >
                    <FaArrowRight size={32} className="text-blue-600" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* FEATURES SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-slate-900 text-center"
          >
            Powerful <span className="text-blue-600">Features</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-600 transition-all shadow-lg group"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow"
                  >
                    <Icon size={32} />
                  </motion.div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* PRICING PLANS */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-slate-900 text-center"
          >
            Pricing <span className="text-blue-600">Plans</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Free Plan */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg"
            >
              <h3 className="text-3xl font-black text-slate-900 mb-2">Free Plan</h3>
              <p className="text-slate-600 mb-6 font-bold">Perfect for casual shoppers</p>
              <div className="text-5xl font-black text-blue-600 mb-8">
                $0 <span className="text-lg text-slate-600 font-bold">/month</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 bg-slate-900 text-white rounded-xl font-black hover:bg-slate-800 transition-colors mb-8 cursor-pointer"
              >
                Get Started
              </motion.button>
              <div className="space-y-4">
                {premiumFeatures.map((item, idx) => (
                  item.free && (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <FaCheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span className="font-bold text-slate-800 text-sm">{item.feature}</span>
                    </motion.div>
                  )
                ))}
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 border-2 border-blue-700 shadow-2xl text-white relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-black text-sm">
                ⭐ POPULAR
              </div>
              <h3 className="text-3xl font-black mb-2">Premium Plan</h3>
              <p className="text-blue-100 mb-6 font-bold">All features + advanced tools</p>
              <div className="text-5xl font-black mb-8">
                $4.99 <span className="text-lg text-blue-100 font-bold">/month</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 bg-white text-blue-600 rounded-xl font-black hover:bg-blue-50 transition-colors mb-8 cursor-pointer"
              >
                Upgrade Now
              </motion.button>
              <div className="space-y-4">
                {premiumFeatures.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle size={20} className="text-blue-100 flex-shrink-0" />
                    <span className={`font-bold text-sm ${item.premium ? 'text-white' : 'text-blue-200'}`}>
                      {item.feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* USE CASES */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-slate-900 text-center"
          >
            Real-World <span className="text-blue-600">Examples</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-600 transition-all shadow-lg"
              >
                <div className="text-6xl mb-4">{['🎮', '📱', '🎧', '🏠'][idx]}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  {useCase.product}
                </h3>
                <p className="text-slate-600 mb-4 font-medium">
                  {useCase.scenario}
                </p>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-700 font-black">
                    💚 You Save: {useCase.saved}
                  </p>
                </div>
                <p className="text-slate-600 font-bold text-sm">
                  Process: {useCase.process}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white mb-4"
            >
              Start Saving Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/90 text-lg max-w-2xl mx-auto mb-8"
            >
              Join millions of smart shoppers who save money every day using Comparo.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-blue-600 rounded-xl font-black text-lg hover:bg-blue-50 transition-colors shadow-xl cursor-pointer"
            >
              Start Comparing Now
            </motion.button>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default OurServices;