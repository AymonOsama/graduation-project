import React from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaCheck, FaLightbulb, FaShieldAlt, FaRocket, FaChartLine } from 'react-icons/fa';

const DownloadAppPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Section 1: Immersive Hero */}
      <HeroSection />

      {/* Section 2: Why Download */}
      <WhyDownloadSection />

      {/* Section 3: Features Showcase */}
      <FeaturesShowcase />

      {/* Section 4: Pricing */}
      <PricingSection />

      {/* Section 5: Final CTA */}
      <FinalCTASection />
    </div>
  );
};

// ==================== HERO SECTION ====================
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50/50">
    {/* Background Pattern */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />
      <motion.div
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full"
      />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm"
        >
          <FaRocket size={14} />
          <span>The Future of Shopping is Here</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-7xl md:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight"
        >
          Compare <br />
          <span className="text-blue-600">Smarter.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium"
        >
          Save thousands on your hardware build. Real-time tracking across <span className="text-blue-600 font-bold">500+ premium stores</span> at your fingertips.
        </motion.p>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <DownloadCTA icon={FaApple} text="App Store" color="bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200" />
          <DownloadCTA icon={FaGooglePlay} text="Google Play" color="bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-100" />
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-12 pt-10 border-t border-slate-200"
        >
          {[
            { value: '10M+', label: 'Users' },
            { value: '4.9★', label: 'Rating' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right - Modern Phone Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative hidden lg:flex justify-center items-center"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 w-[300px] aspect-[9/19] bg-slate-900 rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[8px] border-slate-800"
        >
            {/* Inner Screen */}
            <div className="h-full w-full bg-white rounded-[2.2rem] overflow-hidden flex flex-col">
               <div className="h-1/2 bg-gradient-to-br from-blue-600 to-blue-400 p-8 flex flex-col justify-center items-center text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4 flex items-center justify-center text-3xl">🚀</div>
                  <h3 className="font-black text-xl">Comparo App</h3>
               </div>
               <div className="p-6 space-y-4">
                  <div className="h-4 w-full bg-slate-100 rounded-full" />
                  <div className="h-4 w-3/4 bg-slate-100 rounded-full" />
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="h-20 bg-blue-50 rounded-2xl border border-blue-100" />
                    <div className="h-20 bg-slate-50 rounded-2xl" />
                  </div>
               </div>
            </div>
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-800 rounded-b-2xl" />
        </motion.div>
        {/* Decorative Circles */}
        <div className="absolute w-[500px] h-[500px] border border-blue-100 rounded-full animate-[spin_20s_linear_infinite]" />
      </motion.div>
    </div>
  </section>
);

// ==================== WHY DOWNLOAD SECTION ====================
const WhyDownloadSection = () => (
  <section className="py-32 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Built for Hardware Enthusiasts</h2>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
          Stop overpaying for parts. Use the same tools the pros use to track deals.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <FaChartLine />, title: 'Price History', desc: 'See if that "deal" is actually the lowest price in the last 6 months.', color: 'text-blue-600 bg-blue-50' },
          { icon: <FaShieldAlt />, title: 'Verified Stores', desc: 'We only index trusted retailers with guaranteed warranty support.', color: 'text-emerald-600 bg-emerald-50' },
          { icon: <FaLightbulb />, title: 'Smart Alerts', desc: 'Instant push notifications when your target component hits your price.', color: 'text-amber-600 bg-amber-50' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -12 }}
            className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-8 ${item.color}`}>
              {item.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== FEATURES SHOWCASE ====================
const FeaturesShowcase = () => (
  <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="order-2 lg:order-1">
        <div className="relative p-2 bg-white rounded-[3rem] shadow-2xl border border-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1000" 
            className="rounded-[2.5rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            alt="App Interface"
          />
        </div>
      </div>

      <div className="space-y-10 order-1 lg:order-2">
        <h2 className="text-5xl font-black text-slate-900 leading-tight">Everything you need to <span className="text-blue-600">save more.</span></h2>
        
        <div className="grid gap-6">
          {[
            'Real-time inventory tracking from 500+ stores',
            'Advanced price history charts (up to 1 year)',
            'Multi-device wishlist synchronization',
            'Exclusive coupon codes and hidden discounts',
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-200">
                <FaCheck size={14} />
              </div>
              <span className="text-lg font-bold text-slate-700">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ==================== PRICING SECTION ====================
const PricingSection = () => (
  <section className="py-32 px-6 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-block px-6 py-2 rounded-full bg-emerald-50 text-emerald-600 font-black text-sm mb-6 uppercase tracking-widest">
        100% Free Forever
      </div>
      <h2 className="text-6xl font-black text-slate-900 mb-8 leading-tight">No Subscriptions. <br />No Hidden Costs.</h2>
      <p className="text-slate-500 text-xl mb-12 font-medium max-w-2xl mx-auto">
        We believe shopping smart shouldn't cost a penny. All premium features are unlocked for everyone.
      </p>
      
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
         {['Full History', 'Unlimited Alerts', 'No Ads', 'No Data Selling'].map((item, i) => (
           <div key={i} className="flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700 italic">
              <FaCheck className="text-blue-600" /> {item}
           </div>
         ))}
      </div>
    </div>
  </section>
);

// ==================== FINAL CTA SECTION ====================
const FinalCTASection = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="relative bg-blue-600 rounded-[4rem] p-16 lg:p-24 overflow-hidden text-center text-white shadow-[0_40px_100px_-20px_rgba(37,99,235,0.35)]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 space-y-10">
          <h2 className="text-6xl lg:text-7xl font-black tracking-tight leading-tight">Ready to build your <br /> dream PC for less?</h2>
          <p className="text-blue-100 text-2xl max-w-2xl mx-auto font-medium opacity-90">
            Join 10 million users who shop smarter every day. Available for free download.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <DownloadCTA icon={FaApple} text="App Store" color="bg-white text-blue-600 hover:bg-slate-50 text-xl shadow-2xl" />
            <DownloadCTA icon={FaGooglePlay} text="Google Play" color="bg-slate-900 text-white hover:bg-black text-xl shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ==================== REUSABLE COMPONENTS ====================
const DownloadCTA = ({ icon: Icon, text, color }) => (
  <motion.a
    href="#"
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`inline-flex items-center justify-center gap-4 px-10 py-5 rounded-[2rem] font-black transition-all cursor-pointer ${color}`}
  >
    <Icon size={24} />
    <div className="text-left leading-none">
       <span className="text-[10px] uppercase opacity-60 block mb-1">Download on</span>
       <span className="block">{text}</span>
    </div>
  </motion.a>
);

export default DownloadAppPage;